import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

const handleClick = async () => {
    if(!user){
        return
    }
    
    const response = await fetch("api/workouts/" + workout._id, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const json = await response.json()
        dispatch({type: 'DELETE_WORKOUT', payload: json})
    }

}


    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className= "material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails