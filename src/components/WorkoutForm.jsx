
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion} from "framer-motion";
import  Backdrop  from './Backdrop';

import api from '../api'; // Import the axios instance

const WorkoutForm = ({ handleClose }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(!user){
            setError("You must be logged in to add a workout")
            return
        }
        const workout = { title, load, reps }
    
        try {
            const response = await api.post('/api/workouts', workout, {
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
            console.log("New workout added!")
            dispatch({ type: 'CREATE_WORKOUT', payload: response.data })
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
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input 
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
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
        </motion.div>
        </Backdrop>
        </>
    )
}

export default WorkoutForm