import ChestData from "./Chest/ChestData"
import { useState } from "react"
import './workoutAdder.css'
import api from '../../api'; // Import the axios instance
import { useAuthContext } from "../../hooks/useAuthContext";
import WorkoutTitle from "./WorkoutTitle";




const WorkoutAdder = () => {

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

    const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
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
            window.location.href = '/dashboard';
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
    
    const chestExercises = ChestData.map((exercise) => {
        return (
            <>
            <div className="col-6 col-md-4 col-lg-3" key={exercise.key}>
                <div className="card mt-3 rounded-5 text-center clickable-card"  
                onClick={() => handleExerciseClick(exercise.key)}>
                    <div className="mx-auto">
                        <img src={exercise.image} className="img-fluid rounded-5" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{exercise.title}</h5>
                        {selectedExercise === exercise.key && (
                            <form onSubmit={(event) => handleExerciseSubmit(event, exercise.title, formData[exercise.key])}>
                                {[...Array(numSets)].map((_, i) => (
                                    <div key={i}>
                                        <h6 className="border-bottom">{`Set ${i + 1}`}</h6>
                                        <label className="form-label">
                                            {`Weight:`}
                                            <input required
    className="form-control"
    type="number" 
    name={`set${i + 1}Weight`} 
    onChange={(e) => handleSetChange(exercise.key, `set${i + 1}`, 'load', e.target.value)}
/>
                                        </label>
                                        <label  className="form-label">
    {`Reps:`}
    <input required
        className="form-control"
        type="number" 
        name={`set${i + 1}Reps`} 
        onChange={(e) => handleSetChange(exercise.key, `set${i + 1}`, 'reps', e.target.value)}
    />
</label>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-primary m-1" onClick={handleAddSet}>+</button>
                                <button type="button" className="btn btn-primary m-1" onClick={handleRemoveSet}>-</button>
                                <button type="submit" className="btn btn-primary" id="liveToastBtn">Submit Exercise</button>
                            </form>
                        )}
                    </div>
                </div>
                
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="..."/>
      <strong class="me-auto">Exercise Added!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {exercise.title} has been added to your workout!
    </div>
  </div>
</div>
            </>
            
        )
    })
    return (
         <>


        {titleFormOpen && <WorkoutTitle title={workoutTitle} setTitle={setWorkoutTitle} closeBackdrop={closeBackdrop} />}
         <h1 className="display-1 text-center mb-4 border-bottom">Workout Adder</h1>
         <div className="container">
            <h2 className="display-6 text-center bg-altDark mb-5">Which exercises did you do?</h2>
            
            
            <section id="chest">
                <h2 className="display-6 border-bottom mb-4">Chest</h2>
                <div className="container"> 
                <div className="row">
                    {chestExercises}
                    <button onClick={handleWorkoutSubmit}>Final Submit</button>
                    </div>
                
                
                </div>
            </section>

            <section id="back">
                <h2 className="display-6 border-bottom">Back</h2>
                <div className="container"> 


                </div>
            </section>

            <section id="shoulders">
                <h2 className="display-6 border-bottom">Shoulders</h2>
                <div className="container">


                </div>
            </section>

            <section id="biceps">
                <h2 className="display-6 border-bottom">Biceps</h2>
                <div className="container"> 


                </div>
            </section>

            <section id="triceps">
                <h2 className="display-6 border-bottom">Triceps</h2>
                <div className="container"> 


                </div>
            </section>

            <section id="legs">
                <h2 className="display-6 border-bottom">Legs</h2>
                <div className="container"> 


                </div>
            </section>


         </div>
         </>
    )
}

export default WorkoutAdder;