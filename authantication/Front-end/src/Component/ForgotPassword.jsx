import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function ForgotPassword() {
 
  const [email, setEmail] = useState("");
  
  const navigate= useNavigate();
  Axios.defaults.withCredentials =true;
  const handleSubmit=(e)=>{
    e.preventDefault();
 
    Axios.post('http://localhost:3000/auth/forgot-Password', {
      
      email,
    })
    .then(res=>{
      if(res.data.status){
      alert("check you'r email for reset password link!")
        navigate('/login')
      }
      console.log(res.data)
    }).catch(err=>{
      console.log(err, "error found")
    })
  }
  return (
    <div>
       <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
       

        <label htmlFor="email">Email </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter you'r Email Adress"
          onChange={(e) => setEmail(e.target.value)}
        />


        <button type="submit">Send Mail</button>

      </form>
    </div>
    </div>
  )
}

export default ForgotPassword
