
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";
import  Backdrop  from './Backdrop';

import api from '../api'; // Import the axios instance

const EditForm = ({ editOpen, handleClose, workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load)
    const [reps, setReps] = useState(workout.reps)
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(!user){
            setError("You must be logged in to edit a workout")
            return
        }
        const workoutToUpdate = { _id: workout._id, title, load, reps }    
        try {
            const response = await api.patch(`/api/workouts/${workoutToUpdate._id}`, workoutToUpdate, {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${user.token}`
                }
              })
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log("Workout Edited!")
            dispatch({ type: 'UPDATE_WORKOUT', payload: response.data })
            handleClose()

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.error)
                setEmptyFields(error.response.data.emptyFields)
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(error.message);
            }
        }
    }
    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: '-100vh',
            opacity: 0,
        }
    }
    return (
        <>
        <Backdrop onClick={handleClose} >
            <motion.div 
            onClick={(e) => e.stopPropagation()}
            className="workout-form-motion"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            
>
        <form className="create-form" onSubmit={handleSubmit}>
            <h2>Edit a Workout</h2>
            <label>Exercise Title:</label>
            <motion.input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            
            <label>Load (in kg):</label>
            <input 
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
            />

           
            <label>Reps:</label>
            <input 
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <motion.button
            whileHover={{ scale: 1.05, transition: {duration: 0.3} }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary"
            >Edit Workout</motion.button>
            {error && <div className="error">{error}</div>}
        </form>
        </motion.div>
        </Backdrop>
        </>
    )
}

export default EditForm