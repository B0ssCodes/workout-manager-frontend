import { Link } from "react-router-dom";
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
const handleClick = () => {
    logout()
}

    return (
        <header className="container-md">
            <nav className="navbar navbar-expand-lg bg-altDark rounded mb-3" data-bs-theme="dark">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" href="#">Boss Workouts</Link>
    {user &&(<div className="navbar-toggler btn btn-primary"
      onClick={handleClick}>
          Logout
        </div>)}
        {!user &&(<Link className=" btn btn-primary ms-auto me-3"
          to="/login">
          Login
        </Link>)}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/workout-manager" className="nav-link" >Workout Tracker</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success me-3" type="submit">Search</button>
      </form>
      
    </div>
    
  </div>
</nav>
        </header>
    )
}
export default Navbar;