import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
 
    Axios.post('http://localhost:3000/auth/signup', {
      username,
      email,
      password,
    })
    .then(res=>{
      navigate("/login")
    }).catch(err=>{
      console.log(err, "error found")
    })
  }

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter you'r Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit">Signup</button>
        <p>Already have account? <Link to='/login'> Login </Link></p>
      </form>
    </div>
  );
}

export default Signup;
