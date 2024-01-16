import ShouldersData from "./ShouldersData"
import { Toast } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { Fragment } from 'react';


function ShouldersExercises({ handleExerciseClick, selectedExercise, handleSetChange, handleAddSet, handleRemoveSet, numSets, formData, handleExerciseSubmit}) {

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    
    if (toastTrigger) {
      const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }

    
const shouldersExercises = ShouldersData.map((exercise) => {
return(
    <Fragment key={exercise.key}>
            <div className="col-6 col-md-4 col-lg-3 " key={exercise.key}>
                <div className="card mt-3 rounded-5 text-center clickable-card bg-altDark"  
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

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
             <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                     <strong className="me-auto">Exercise Added!</strong>
                         <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                                <div className="toast-body">
                                 {exercise.title} has been added to your workout!
                                    </div>
                                    </div>
                                     </div>
                                         </Fragment>

)})
                            
    return (
        <section id="shoulders">
            <h2 className="display-6 border-bottom my-4">Shoulders</h2>
                <div className="container"> 
                    <div className="row">
                         {shouldersExercises} 
                    </div>
                </div>
         </section>
        )
        }

export default ShouldersExercises
