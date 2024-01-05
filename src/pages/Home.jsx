import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import api from '../api'; // Import the axios instance

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
   const {workouts, dispatch} = useWorkoutsContext()
   const {user} = useAuthContext()

    useEffect( () => { 
        const fetchWorkouts = async () => {
            try {
                const response = await api.get('/api/workouts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                dispatch({ type: 'SET_WORKOUTS', payload: response.data })
            } catch (error) {
                console.error(error);
            }
        }
        if(user){
        fetchWorkouts()
        }
     }, [dispatch, user] )

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map( (workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}
export default Home