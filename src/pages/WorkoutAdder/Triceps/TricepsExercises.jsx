import TricepsData from "./TricepsData"
function TricepsExercises({ handleExerciseClick, selectedExercise, handleSetChange, handleAddSet, handleRemoveSet, numSets, formData, handleExerciseSubmit}) {

const tricepsExercises = TricepsData.map((exercise) => {
return(
    <>
            <div className="col-6 col-md-4 col-lg-3" key={exercise.key}>
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

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
             <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                     <strong class="me-auto">Exercise Added!</strong>
                         <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                                <div class="toast-body">
                                 {exercise.title} has been added to your workout!
                                    </div>
                                    </div>
                                     </div>
                                         </>

)})
                            
    return (
        <section id="triceps">
            <h2 className="display-6 border-bottom my-4">Triceps</h2>
                <div className="container"> 
                    <div className="row">
                         {tricepsExercises} 
                    </div>
                </div>
         </section>
        )
        }

export default TricepsExercises
