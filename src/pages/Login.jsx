import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './workouts.css'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, error, isLoading} = useLogin()
    const [passwordVisible, setPasswordVisible] = useState(false)


    const togglePasswordVisibility = () => {
        setPasswordVisible(prevPasswordVisible => !prevPasswordVisible);
      };

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="loginBody">
        
        <h1 className="display-1 text-center my-5">Log In</h1>

<div className="container-sm justify-content-center bg-altDark py-4 shadow-color rounded">
    <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
<form className="" onSubmit={handleSubmit}>
<div className="mb-3">
  <label for="exampleInputEmail1" className="form-label">Email address:</label>
  <input type="email" className="form-control" 
  id="exampleInputEmail1"
   aria-describedby="emailHelp" 
   value={email}
   onChange={(e) => setEmail(e.target.value)}
   />
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
  <label for="exampleInputPassword1" className="form-label">Password:</label>
  <input type={passwordVisible ? "text" : "password"} 
  className="form-control" 
  id="exampleInputPassword1"
  onChange={(e) => setPassword(e.target.value)}
value={password} />
</div>


<div className="mb-3 form-check d-flex">
  <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick= {togglePasswordVisibility} />
  <label className="form-check-label ms-2 mt-1" for="exampleCheck1">Show Password</label>
</div>
<button type="submit" className="btn btn-primary" disabled={isLoading} >Log In</button>
{error && <div className = "error">{error}</div>}
<p className="mt-3">Don't have an account?</p>
<Link to="/signup" className="btn btn-primary"> Sign up</Link>
</form>
</div>
</div>
</div>
</div>
    )
}
export default Login;