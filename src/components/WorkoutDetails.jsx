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
        <div className="card my-5 bg-altDark" >
            
           
            <div className="card" >
         
            <div className="card-body">
          <h5 className="card-title">{workout.title}</h5>
         
         </div>
            <ul className="list-group list-group-flush ">
            <li className="list-group-item">Load (kg): {workout.load}</li>
            <li className="list-group-item">Reps: {workout.reps}</li>
            
            </ul>
            <div className="card-body">
                <span className="card-link me-5">
            <motion.span 
            className= "material-symbols-outlined edit" 
            onClick={() => (editOpen ? closeEdit() : openEdit())}
            whileHover={{scale: 1.1 }}>
            edit</motion.span>
            </span>
            <AnimatePresence 
            initial={false}
            mode='wait'
            onExitComplete={() => null}>
            {editOpen && <EditForm editOpen={editOpen} handleClose={closeEdit} workout={workout}/>}
            </AnimatePresence>
            <span className="card-link ms-5">
            <motion.span 
            className= "material-symbols-outlined delete" 
            onClick={handleDeleteClick}
            whileHover={{scale: 1.1 }}>
            delete</motion.span>
            </span>
  </div>
</div>
<div className="card-footer text-body-secondary">
{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
  </div>
           
            
            
        </div>
    )
}

export default WorkoutDetails