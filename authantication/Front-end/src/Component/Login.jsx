import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  Axios.defaults.withCredentials =true;
  const handleSubmit=(e)=>{
    e.preventDefault();
   
 
    Axios.post('http://localhost:3000/auth/login', {
      
      email,
      password,
    })
    .then(res=>{
      if(res.data.status){
      navigate("/")
    }else{
    alert('user not found please signup first')}
  }).catch(err=>{
      console.log(err, "error found")
    })
  }
  return (
    <div>
       <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
       

        <label htmlFor="email">Email </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter you'r Email Adress"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="**************"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>Don't have account? <Link to='/Signup'> Signup </Link></p>
      </form>
    </div>
    </div>
  )
}
