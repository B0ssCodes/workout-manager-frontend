import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";




const Dashboard = () => {

    const {user} = useAuthContext()


    return (
        <div className="container">
        <h1 className="display-1 text-center mb-5 border-bottom">{user.firstName}'s Dashboard</h1>
        <Link to="/workout-manager" className="btn btn-primary ">Workout Manager</Link>
        <Link to="/bench-program" className="btn btn-primary">Bench Program</Link>
        <Link to="/pr-calculator" className="btn btn-primary">PR Calculator</Link>
        </div>
    )
}

export default Dashboard