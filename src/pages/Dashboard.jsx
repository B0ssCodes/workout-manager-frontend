import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";




const Dashboard = () => {

    const {user} = useAuthContext()


    return (
        <div className="container-xl">
    <h1 className="display-1 text-center mb-5 border-bottom">{user.firstName}'s Dashboard</h1>
    
    <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-xl-4 d-flex justify-content-center my-3 shadow-lg bg-altDark">
            <div className="card text-center rounded-5 bg-altDark" >
            <h5 className="card-header p-3 display-5 bg-altDark rounded-5">Workout Manager</h5>
                <img src="/workout-manager.jpg" className="img-card-top rounded-5 p-2" />
                <div className="card-body">
                    
                    <p className="card-text lead">Our Workout Manager features all gym workouts, with storing and tracking of previous workouts!</p>
                    <Link to="/workout-manager" className="btn btn-primary">Go to Workout Manager</Link>
                </div>
            </div>
        </div>
    
    
        <div className="col-12 col-md-8 col-xl-4 d-flex justify-content-center my-3 shadow-lg bg-altDark">
            <div className="card text-center rounded-5 bg-altDark" >
            <h5 className="card-header p-3 display-5 bg-altDark rounded-5">Bench Program</h5>
                <img src="/bench-program.jpg" className="img-card-top rounded-5 p-2" />
                <div className="card-body">
                    
                    <p className="card-text lead">Our Bench Program Maker uses your Bench PR to make a complete seven sessions bench program that will guarantee a new PR at the end.</p>
                    <Link to="/bench-program" className="btn btn-primary">Go to Bench Program Maker</Link>
                </div>
            </div>
        </div>

        <div className="col-12 col-md-8 col-xl-4 d-flex justify-content-center my-3 shadow">
            <div className="card text-center rounded-5 bg-altDark" >
            <h5 className="card-header p-3 display-5 bg-altDark rounded-5">PR Calculator</h5>
                <img src="/pr-calculator.jpg" className="img-card-top rounded-5 p-2" />
                <div className="card-body">
                    
                    <p className="card-text lead">Our PR Calculator uses an advanced algorithm to calculate your Bench PR!</p>
                    <Link to="/pr-calculator" className="btn btn-primary">Go to PR Calculator</Link>
                </div>
            </div>
        </div>
        </div>
    

    
    
</div>
    )
}

export default Dashboard