import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";
import api from '../api'; // Import the axios instance
import './workouts.css'


//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutManager = () => {
   const {workouts, dispatch, isLoading} = useWorkoutsContext()
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
                console.log(user.firstName)
            } catch (error) {
                console.error(error);
            }
        }
        if(user){
        fetchWorkouts()
        }
     }, [dispatch, user] )



    return (
        <>
        {isLoading && <Loading />}
        <div className="home gradient-background">
            
    
            <div className="container">
                <h1 className="display-1 text-center mb-5 border-bottom">Hello, {user.firstName}! </h1>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary "
            onClick={() => (modalOpen ? closeAdd() : openAdd())}>
                Add Workout
            </motion.button>
            <AnimatePresence 
            initial={false}
            mode='wait'
            onExitComplete={() => null}>
            {modalOpen && <WorkoutForm modalOpen={modalOpen} handleClose={closeAdd} />}
            </AnimatePresence>
            {workouts && workouts.map( (workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} modalOpen={modalOpen} close={close} open={open} />
                ))}
            </div>
        </div>
        </>
    )
}
export default WorkoutManager