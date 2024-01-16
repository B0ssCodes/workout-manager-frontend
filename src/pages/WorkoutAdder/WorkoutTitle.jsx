import Backdrop from '../../components/Backdrop';
import { motion } from 'framer-motion';
import '../workouts.css'

const WorkoutTitle = ({title, setTitle, closeBackdrop} ) => {
        const handleSubmit = (e) => {
            e.preventDefault()
            closeBackdrop()
        }

        const handleTitleChange = (event) => {
            setTitle(event.target.value);
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

        const variants = {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        };
        
        return (
            <>
                <Backdrop>
                    <motion.div 
                        onClick={(e) => e.stopPropagation()}
                        className="workout-form-motion"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                    >
                        <form className="create-form" onSubmit={handleSubmit}>
                            <h2 className="display-5">Add a New Workout</h2>
                            <label className="display-6 m-0 p-0">Workout Title:</label>
                            <motion.input 
                                type="text"
                                onChange={handleTitleChange}
                                value={title}
                                className="form-control"
                                required
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </motion.div>
                </Backdrop>
            </>
        )
}
    
export default WorkoutTitle