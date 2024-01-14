import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { motion, AnimatePresence } from "framer-motion";
import api from '../api'; // Import the axios instance
import EditForm from "./EditForm";
import { useState, Fragment } from "react";
import { BiPencil, BiTrash } from 'react-icons/bi';


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
        
       
        <div className="card my-5 bg-altDark">
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{workout.title}</h5>
        </div>
        {workout?.exercises?.map((exercise, exerciseIndex) => (
            <Fragment key={exerciseIndex}>
                <div className="card-body">
                    <h6>Exercise {exerciseIndex + 1}: {exercise.title}</h6>
                    <ul className="list-group list-group-flush">
                        {exercise.sets?.map((set, setIndex) => (
                            <li key={setIndex} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>Set {setIndex + 1}:</div>
                                <div>Load (kg): {set.load}</div>
                                <div>Reps: {set.reps}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <motion.span 
                        className= "material-symbols-outlined edit" 
                        onClick={() => (editOpen ? closeEdit() : openEdit())}
                        whileHover={{scale: 1.1 }}
                    >
                        <BiPencil size={25}/>
                    </motion.span>
                    <AnimatePresence 
                        initial={false}
                        mode='wait'
                        onExitComplete={() => null}
                    >
                        {editOpen && <EditForm editOpen={editOpen} handleClose={closeEdit} workout={workout}/>}
                    </AnimatePresence>
                    <motion.span 
                        className= "material-symbols-outlined delete" 
                        onClick={handleDeleteClick}
                        whileHover={{scale: 1.1 }}
                    >
                        <BiTrash size={25}/>
                    </motion.span>
                </div>
            </Fragment>
        ))}
        <div className="card-footer text-body-secondary">
            {formatDistanceToNow(new Date(workout?.createdAt), { addSuffix: true })}
        </div>       
    </div>
</div>
        )
        
    
}

export default WorkoutDetails