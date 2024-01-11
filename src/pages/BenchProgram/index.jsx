import Data from './BenchProgramData' 
import BenchProgramMaker from './BenchProgramMaker'
import InputForm from './InputForm'
import {useState} from 'react'
import '../workouts.css'
import { Link } from 'react-router-dom'

const BenchProgram = () => {
    
    const [render, setRender] = useState(false)
    const [benchInput, setBenchInput] = useState("")
    const [benchToMaker, setBenchToMaker] = useState(0)

    function setBench(){
        setBenchToMaker(benchInput)
    }

    function changeRender(){
        setRender(true)
    }

    function handleChange(event) {
        setBenchInput(event.target.value)
      }

      const workouts = Data.map(workout => {
        return(
            <div className="col-12 col-md-6 col-lg-4 justify-content-center d-flex" key={workout.id}>
            <BenchProgramMaker  
                      title={workout.title}
                      input={benchToMaker}
                      set1= {workout.set1}
                      set2= {workout.set2}
                      set3= {workout.set3}
                      set4= {workout.set4}
                      set5= {workout.set5}
                      set6= {workout.set6}
                      reps1= {workout.reps1}
                      reps2= {workout.reps2}
                      reps3= {workout.reps3}
                      reps4= {workout.reps4}
                      reps5= {workout.reps5}
                      reps6= {workout.reps6}
                      tips={workout.tips} 
                      shouldRender={render} 
                      />
                      </div>
        )
      })


    return (
        <>
        <h1 className="display-1 text-center mb-5 border-bottom">Bench Program Maker</h1>

        <InputForm changeRender={changeRender} 
       benchInput={benchInput} setBenchInput={setBenchInput} 
    handleChange={handleChange} setBench={setBench}  />

{render&&(<div><h1 className="display-3 text-center mt-5">Here is your program: </h1>
<h1 className="lead text-center my-4 border-bottom">Click the workout cards for some tips!</h1></div>)}
<div className="container-sm mt-5">
    <div className="row ">
      {render && workouts}
    </div>
  </div>
  {render && (<div className="card text-center bg-altGrey">
    <h1 className="display-5 card-title">Workout 7</h1>
    <p className="lead">PR!</p>
    <p className="lead">Check our <Link to="pr-calculator" className="btn btn-primary">PR Calculator</Link> to check what it is!</p>
    </div>)}
        </>
    )
}
export default BenchProgram