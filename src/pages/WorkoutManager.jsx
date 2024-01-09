import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from '../api'; // Import the axios instance
import './workouts.css'


//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutManager = () => {
   const {workouts, dispatch} = useWorkoutsContext()
   const [modalOpen, setModalOpen] = useState(false)


   const closeAdd = () => setModalOpen(false);
   const openAdd = () => setModalOpen(true);

   

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
        <div className="home gradient-background">
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-workout-button"
            onClick={() => (modalOpen ? closeAdd() : openAdd())}>
                Add Workout
            </motion.button>
            <AnimatePresence 
            initial={false}
            mode='wait'
            onExitComplete={() => null}>
            {modalOpen && <WorkoutForm modalOpen={modalOpen} handleClose={closeAdd} />}
            </AnimatePresence>
    
            <div className="container">
            {workouts && workouts.map( (workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} modalOpen={modalOpen} close={close} open={open} />
                ))}
            </div>
        </div>
    )
}
export default WorkoutManager