import ChestData from "./Chest/ChestData"
import { useState } from "react"
import './workoutAdder.css'
import api from '../../api'; // Import the axios instance
import { useAuthContext } from "../../hooks/useAuthContext";
import WorkoutTitle from "./WorkoutTitle";
import { useNavigate } from 'react-router-dom';
import ChestExercises from './Chest/ChestExercises'
import BackExercises from './Back/BackExercises'
import ShouldersExercises from './Shoulders/ShouldersExercises'
import BicepsExercises from './Biceps/BicepsExercises'
import TricepsExercises from './Triceps/TricepsExercises'
import LegsExercises from './Legs/LegsExercises'

import { Toast } from 'bootstrap';



const WorkoutAdder = () => {

    const navigate = useNavigate();

    const [chosenSections, setChosenSections] = useState("chest");
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [titleFormOpen, setTitleFormOpen] = useState(true);

    const [numSets, setNumSets] = useState(2);
    const [formData, setFormData] = useState({});
    const { user } = useAuthContext();




    const handleExerciseClick = (key) => {
        setSelectedExercise(key);
    }

    const handleAddSet = () => {
        setNumSets(numSets + 1);
    }

    const handleRemoveSet = () => {
        if (numSets > 1) {
            setNumSets(numSets - 1);
        }
    }

    const closeBackdrop = () => {
        setTitleFormOpen(false);
    }

    const handleExerciseSubmit = (event, exerciseTitle, sets) => {
        event.preventDefault();
        const setsArray = Object.keys(sets).map(setKey => sets[setKey]);
        setExercises([...exercises, { title: exerciseTitle, sets: setsArray }]);
    }

    



    const handleWorkoutSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/api/workouts', { title: workoutTitle, exercises }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(response.data);
            navigate('/workout-manager');
        } catch (error) {
            console.error(error);
        }
    }

    const handleSetChange = (exerciseKey, setNumber, field, value) => {
        setFormData({
            ...formData,
            [exerciseKey]: {
                ...formData[exerciseKey],
                [setNumber]: {
                    ...formData[exerciseKey]?.[setNumber],
                    [field]: Number(value)
                }
            }
        });
    }
    
    return (
         <>


        {titleFormOpen && <WorkoutTitle title={workoutTitle} setTitle={setWorkoutTitle} closeBackdrop={closeBackdrop} />}
         <h1 className="display-1 text-center mb-4 border-bottom">Workout Adder</h1>
         <div className="d-flex flex-column vh-100 justify-content-between mx-auto" style={{ maxWidth: '1200px' }}>


            <h2 className="display-6 text-center bg-altDark mb-5">Which exercises did you do?</h2>
            
            
            <ChestExercises handleExerciseClick={handleExerciseClick}
                            selectedExercise={selectedExercise}
                            handleSetChange={handleSetChange}
                            handleAddSet={handleAddSet}
                            handleRemoveSet={handleRemoveSet}
                            numSets={numSets}
                            formData={formData}
                            handleExerciseSubmit={handleExerciseSubmit}/>

            <BackExercises handleExerciseClick={handleExerciseClick}
                            selectedExercise={selectedExercise}
                            handleSetChange={handleSetChange}
                            handleAddSet={handleAddSet}
                            handleRemoveSet={handleRemoveSet}
                            numSets={numSets}
                            formData={formData}
                            handleExerciseSubmit={handleExerciseSubmit}/>

            

            <ShouldersExercises handleExerciseClick={handleExerciseClick}
                            selectedExercise={selectedExercise}
                            handleSetChange={handleSetChange}
                            handleAddSet={handleAddSet}
                            handleRemoveSet={handleRemoveSet}
                            numSets={numSets}
                            formData={formData}
                            handleExerciseSubmit={handleExerciseSubmit}/>

            <BicepsExercises handleExerciseClick={handleExerciseClick}
                            selectedExercise={selectedExercise}
                            handleSetChange={handleSetChange}
                            handleAddSet={handleAddSet}
                            handleRemoveSet={handleRemoveSet}
                            numSets={numSets}
                            formData={formData}
                            handleExerciseSubmit={handleExerciseSubmit}/>   


            <TricepsExercises handleExerciseClick={handleExerciseClick}
                            selectedExercise={selectedExercise}
                            handleSetChange={handleSetChange}
                            handleAddSet={handleAddSet}
                            handleRemoveSet={handleRemoveSet}
                            numSets={numSets}
                            formData={formData}
                            handleExerciseSubmit={handleExerciseSubmit}/> 

            <LegsExercises handleExerciseClick={handleExerciseClick}
                            selectedExercise={selectedExercise}
                            handleSetChange={handleSetChange}
                            handleAddSet={handleAddSet}
                            handleRemoveSet={handleRemoveSet}
                            numSets={numSets}
                            formData={formData}
                            handleExerciseSubmit={handleExerciseSubmit}/> 



    
<div className="position-fixed bottom-0 w-100 d-flex justify-content-center">
    <div className="d-grid gap-2" style={{ maxWidth: '1200px' }}>
        <div onClick={handleWorkoutSubmit} className="btn btn-primary mb-3 p-2" style={{ cursor: 'pointer', minWidth: "400px" }}><p className="lead mb-0">Submit Workout</p></div>
    </div>
</div>
</div>
         </>
    )
}

export default WorkoutAdder;