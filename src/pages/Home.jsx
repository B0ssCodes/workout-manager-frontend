import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from '../api'; // Import the axios instance

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
   const {workouts, dispatch} = useWorkoutsContext()
   const [modalOpen, setModalOpen] = useState(false)

   const close = () => setModalOpen(false);
   const open = () => setModalOpen(true);

   const {user} = useAuthContext()

    useEffect( () => { 
        const fetchWorkouts = async () => {
            try {
                const response = await api.get('/api/workouts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                dispatch({ type: 'SET_WORKOUTS', payload: response.data })
            } catch (error) {
                console.error(error);
            }
        }
        if(user){
        fetchWorkouts()
        }
     }, [dispatch, user] )



    return (
        <div className="home">
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-workout-button"
            onClick={() => (modalOpen ? close() : open())}>
                Add Workout
            </motion.button>
            <AnimatePresence 
            initial={false}
            mode='wait'
            onExitComplete={() => null}>
            {modalOpen && <WorkoutForm modalOpen={modalOpen} handleClose={close} />}
            </AnimatePresence>
            <div className="workouts">
            {workouts && workouts.map( (workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    )
}
export default Home