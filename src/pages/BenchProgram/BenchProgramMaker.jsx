import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { motion } from 'framer-motion';
import '../workouts.css'

const BenchProgramMaker = (props) => {

    var set1Rounded = 2.5 * Math.ceil(((props.set1)*props.input)/2.5)
    var set2Rounded = 2.5 * Math.ceil(((props.set2)*props.input)/2.5)
    var set3Rounded = 2.5 * Math.ceil(((props.set3)*props.input)/2.5)
    var set4Rounded = 2.5 * Math.ceil(((props.set4)*props.input)/2.5)
    var set5Rounded = 2.5 * Math.ceil(((props.set5)*props.input)/2.5)
    var set6Rounded = 2.5 * Math.ceil(((props.set6)*props.input)/2.5)
     
    var render6 = false
     

    if(set6Rounded === 0){
        render6 = false
    }
    else{
        render6 = props.shouldRender
    }
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <motion.div 
      animate={{ rotateY: isFlipped ? 90 : 0 }} 
      onClick={handleClick}
      style={{ backfaceVisibility: 'hidden' }}
    >
            <div className="my-1 bg-altDark mb-5 pt-3 bench-workout-box card d-flex" style={{width : "16rem"}}>
              <div className="card-header text-center">{props.title}</div>
              <ul>
                <li className="list-group-item pt-3 lead border-bottom">Set 1: {set1Rounded} x{props.reps1}</li>
                <li className="list-group-item pt-3 lead border-bottom">Set 2: {set2Rounded} x{props.reps2}</li>
                <li className="list-group-item pt-3 lead border-bottom">Set 3: {set3Rounded} x{props.reps3}</li>
                <li className="list-group-item pt-3 lead border-bottom">Set 4: {set4Rounded} x{props.reps4}</li>
                <li className="list-group-item pt-3 lead border-bottom">Set 5: {set5Rounded} x{props.reps5}</li>
                {render6 && <li className="list-group-item pt-3 pb-3 lead border-bottom">Set 6: {set6Rounded} x{props.reps6}</li>}
              </ul>
            </div>
          </motion.div>
      
          <motion.div 
      animate={{ rotateY: isFlipped ? 0 : 180 }} 
      onClick={handleClick}
      style={{ backfaceVisibility: 'hidden' }}
    >
            <div className="my-1 bg-altDark mb-5  bench-workout-box card d-flex" style={{width : "16rem"}}>
              <div className="card-header text-center">Tips</div>
              <div className="card-body">
                <p className="lead">{props.tips}</p>
              </div>
            </div>
          </motion.div>
        </ReactCardFlip>
      );

}
export default BenchProgramMaker
