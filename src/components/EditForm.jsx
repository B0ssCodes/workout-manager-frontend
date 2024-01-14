import { useState, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";
import Backdrop from './Backdrop';
import './components.css'

import api from '../api'; // Import the axios instance

const EditForm = ({ editOpen, handleClose, exercise }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [exerciseTitle, setExerciseTitle] = useState(exercise ? exercise.title : '')
    const [sets, setSets] = useState(exercise ? exercise.sets : [])
    const [error, setError] = useState('')

    useEffect(() => {
        if (exercise) {
            setExerciseTitle(exercise.title)
            setSets(exercise.sets)
        }
    }, [exercise])

    const handleSetChange = (setIndex, field, value) => {
        const newSets = [...sets]
        newSets[setIndex][field] = value
        setSets(newSets)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in to edit an exercise")
            return
        }

        const exerciseToUpdate = { _id: exercise._id, title: exerciseTitle, sets }    

        try {
            const response = await api.patch(`/api/exercises/${exerciseToUpdate._id}`, exerciseToUpdate, {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${user.token}`
                }
              })

            setError(null)
            console.log("Exercise Edited!")
            dispatch({ type: 'UPDATE_EXERCISE', payload: response.data })
            handleClose()

        } catch (error) {
            if (error.response) {
                setError(error.response.data.error)
            } else {
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
        <Backdrop onClick={handleClose} >
            <motion.div 
            onClick={(e) => e.stopPropagation()}
            className="workout-form-motion"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            >
            <form className="create-form" onSubmit={handleSubmit}>
                <h2 className="display-4">Edit an Exercise</h2>
                <label className="form-label">Exercise Title:</label>
                <motion.input 
                type="text"
                onChange={(e) => setExerciseTitle(e.target.value)}
                value={exerciseTitle}
                className="form-control"  
                required />

                {sets.map((set, setIndex) => (
                    <div key={setIndex}>
                        <label className="form-label">Load (in kg):</label>
                        <input 
                        type="number"
                        onChange={(e) => handleSetChange(setIndex, 'load', e.target.value)}
                        value={set.load}
                        className="form-control"    
                        required/>

                        <label className="form-label">Reps:</label>
                        <input 
                        type="number"
                        onChange={(e) => handleSetChange(setIndex, 'reps', e.target.value)}
                        value={set.reps}
                        className="form-control"
                        required/>
                    </div>
                ))}

                <motion.button
                whileHover={{ scale: 1.05, transition: {duration: 0.3} }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-primary mt-2"
                style={{ transform: 'scale(1)' }}
                >Edit Exercise</motion.button>
                {error && <div className="error">{error}</div>}
            </form>
            </motion.div>
        </Backdrop>
    )
}

export default EditForm