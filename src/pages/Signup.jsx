import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './workouts.css'

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const {signup, error, isLoading} = useSignup()

   const handlePasswordChange = (e) => {
         setPassword(e.target.value)
         if(e.target.value !== passwordConfirm){
              setPasswordsMatch(false)
         } else {
              setPasswordsMatch(true)
         }
        }

        const handlePasswordConfirmChange = (e) => {
            setPasswordConfirm(e.target.value);
            if (password !== e.target.value) {
              setPasswordsMatch(false);
            } else {
              setPasswordsMatch(true);
            }
          };

          const handleSubmit = async (e) => {
            e.preventDefault();
            setSubmitAttempted(true);
            if (passwordsMatch) {
              await signup(email, password);
            }
          };

          const togglePasswordVisibility = () => {
            setPasswordVisible(prevPasswordVisible => !prevPasswordVisible);
          };

    return (
        <form className="signup" onSubmit={handleSubmit} >
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />

            <label>Password:</label>
            <div className="password-input">
            <input 
            type={passwordVisible ? "text" : "password"}
            onChange={handlePasswordChange}
            value={password}
            />
            <motion.span className="material-symbols-outlined"
            onClick= {togglePasswordVisibility}
            whileHover={{scale: 1.1}}>
            {passwordVisible ? "visibility" : "visibility_off"}
            </motion.span>
            </div>
            <label>Confirm Password:</label>
            <div className="password-input">
            <input 
            type={passwordVisible ? "text" : "password"}
            onChange={handlePasswordConfirmChange}
            value={passwordConfirm}
            />
            <motion.span className="material-symbols-outlined hidden"
            onClick= {togglePasswordVisibility}
            whileHover={{scale: 1.1}}>
            {passwordVisible ? "visibility" : "visibility_off"}
            </motion.span>
            </div>
            {!passwordsMatch && <div className="error">Passwords do not match!</div>}
        <button disabled={isLoading || !passwordsMatch}>Sign Up</button>
        <div id="signup-text">Already have an account?</div>
        <Link id="signup-button" to="/login">Log In</Link>
        {error && <div className = "error">{error}</div>}
        </form>
    )
}
export default Signup