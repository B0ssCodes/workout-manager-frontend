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
            <nav className="navbar navbar-expand-lg bg-altDark rounded mb-3 p-4 d-flex justify-content-space-between" data-bs-theme="dark">
  <div className="container-fluid">
    <div>
    <Link to="/" className="navbar-brand" href="#">Boss Workouts</Link>
    </div>
    <div>
      {user &&( <div className="btn btn-primary ms-auto  "
      onClick={handleClick}>
          Logout
        </div>
        )}
        {!user &&(<Link className=" btn btn-primary ms-auto "
          to="/login">
          Login
        </Link>)}
        </div>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse mt-5 mt-lg-0" id="navbarSupportedContent">
    { user &&<p className="mb-lg-0 mb-3 ms-auto" >{user.email}</p>}
      <ul className="navbar-nav ms-auto  mb-lg-0 ">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link" >Dashboard</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown me-5">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Tools
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Program Maker</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">Bench Program</a></li>
            <li><a className="dropdown-item" href="#">PR Calculator</a></li>
          </ul>
        </li>
        
      </ul>
      
    </div>
    
  </div>
</nav>
        </header>
    )
}
export default Navbar;