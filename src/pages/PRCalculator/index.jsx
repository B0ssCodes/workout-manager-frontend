import { useState } from "react";
import { motion } from "framer-motion";
import InputForm from "./InputForm";
import PRMaker from "./PRMaker";

const PRCalculator = () => {

    const [render, setRender] = useState(false)
    const [PR, setPR] = useState("")
    const [reps, setReps] = useState("")
    const [PRtoMaker, setPRtoMaker] = useState(0)
    const [repsToMaker, setRepsToMaker] = useState(0)

    function changeRender(){
        setRender(true)
    }

    function sendPR(){
        setPRtoMaker(PR)
        setRepsToMaker(reps)
    }

    function handleChange(event) {
        setPR(event.target.value)
      }

      function handleRepsChange(event){
        setReps(event.target.value)
      }

    return (
        <>
        <h1 className="display-1 text-center mb-5 border-bottom">PR Calculator</h1>
    
        <InputForm changeRender={changeRender} handleChange={handleChange} PR={PR} sendPR={sendPR} reps={reps} handleRepsChange={handleRepsChange} />
        {render &&(<PRMaker PRtoMaker={PRtoMaker} render={render}
                repsToMaker={repsToMaker} />)}
        </>
    )
}
export default PRCalculator