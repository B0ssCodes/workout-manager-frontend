import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import './workouts.css'

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();


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
                // Get the reCAPTCHA token
                const recaptchaToken = await executeRecaptcha('signup');
                await signup(firstName, lastName, email, password, recaptchaToken);
            }
        };

          const togglePasswordVisibility = () => {
            setPasswordVisible(prevPasswordVisible => !prevPasswordVisible);
          };

    return (
      <>
      {isLoading && <Loading />}
            <useGoogleReCaptcha onVerify={token => console.log(token)} action='signup' />
  <div className="container-sm">
  
  <h1 className="display-1 text-center my-5">Sign Up</h1>

<div className="container-sm justify-content-center bg-altDark py-4 shadow-color rounded">
<div className="row justify-content-center">
  <div className="col-12 col-sm-10 col-md-8 col-lg-6">
<form  onSubmit={handleSubmit}>
<div className="mb-3">
<label htmlFor="firstName"
className="form-label">First Name:</label>

<input type="text" className="form-control" 
id="firstName"
aria-describedby="firstName" 
value={firstName}
onChange={(e) => setFirstName(e.target.value)}
required
/>
</div>

<div className="mb-3">
<label htmlFor="lastName"
className="form-label">Last Name:</label>

<input type="text" className="form-control" 
id="lastName"
aria-describedby="laastName" 
value={lastName}
onChange={(e) => setLastName(e.target.value)}
required
/>
<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>

<div className="mb-3">
<label htmlFor="email"
className="form-label">Email address:</label>

<input type="email" className="form-control" 
id="email"
aria-describedby="emailHelp" 
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">Password:</label>
<input type={passwordVisible ? "text" : "password"} 
className="form-control" 
id="password"
onChange={handlePasswordChange}
value={password} 
required/>

</div>
<div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters, numbers, capitals, symbols, and must not contain spaces, or emoji.
</div>


<div className="mb-3">
<label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
<input type={passwordVisible ? "text" : "password"} 
className="form-control" 
id="confirmPassword"
onChange={handlePasswordConfirmChange}
value={passwordConfirm} 
requred/>
</div>

<div className="mb-3 form-check d-flex">
<input type="checkbox" className="form-check-input" id="passwordCheck" onClick= {togglePasswordVisibility} />
<label className="form-check-label ms-2 mt-1" htmlFor="passwordCheck">Show Password</label>
</div>
<button type="submit" className="btn btn-primary" disabled={isLoading} >Sign Up</button>
{!passwordsMatch && <div className="bg-danger p-2 my-3 rounded">Passwords do not match!</div>}
<p className="mt-3">Already have an account?</p>
<Link to="/login" className="btn btn-primary">Log In</Link>
{error && <div className = "error">{error}</div>}

</form>
</div>
</div>
</div>
</div>
</>
    )
}
export default Signup