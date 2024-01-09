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
        <form className="login" onSubmit={handleSubmit} >
            <h3>Log In</h3>

            <label>Email:</label>
            <div className="password-input">
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <motion.span className="material-symbols-outlined hidden"
            onClick= {togglePasswordVisibility}
            whileHover={{scale: 1.1}}>
            {passwordVisible ? "visibility" : "visibility_off"}
            </motion.span>
            </div>

            <label>Password:</label>
            <div className="password-input">
            <input 
            type={passwordVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <motion.span className="material-symbols-outlined"
            onClick= {togglePasswordVisibility}
            whileHover={{scale: 1.1}}>
            {passwordVisible ? "visibility" : "visibility_off"}
            </motion.span>
            </div>
        <button disabled={isLoading}>Log In</button>
        <div id="signup-text">Don't have an account?</div>
        <Link id="signup-button" to="/signup">Sign Up</Link>
        {error && <div className = "error">{error}</div>}
        </form>
    )
}
export default Login;