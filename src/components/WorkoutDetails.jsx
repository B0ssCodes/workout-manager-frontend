import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { motion, AnimatePresence } from "framer-motion";
import api from '../api'; // Import the axios instance
import EditForm from "./EditForm";
import { useState } from "react";

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [editOpen, setEditOpen] = useState(false)

    const closeEdit = () => setEditOpen(false);
   const openEdit = () => setEditOpen(true);

    const handleDeleteClick = async () => {
        if(!user){
            return
        }
        
        try {
            const response = await api.delete(`/api/workouts/${workout._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            // No need to check response.ok here
            dispatch({type: 'DELETE_WORKOUT', payload: response.data})
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <motion.span 
            className= "material-symbols-outlined edit" 
            onClick={() => (editOpen ? closeEdit() : openEdit())}
            whileHover={{scale: 1.1 }}>
            edit</motion.span>
            <AnimatePresence 
            initial={false}
            mode='wait'
            onExitComplete={() => null}>
            {editOpen && <EditForm editOpen={editOpen} handleClose={closeEdit} workout={workout}/>}
            </AnimatePresence>
            <motion.span 
            className= "material-symbols-outlined delete" 
            onClick={handleDeleteClick}
            whileHover={{scale: 1.1 }}>
            delete</motion.span>
            
        </div>
    )
}

export default WorkoutDetails