import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


function ResetPassword() {
 
    const [password, setPassword] = useState("");
    const {token}= useParams()
  
  const navigate= useNavigate();
  Axios.defaults.withCredentials =true;
  const handleSubmit=(e)=>{
    e.preventDefault();
 
    Axios.post("http://localhost:3000/auth/reset-Password/"+token, {
      
      password,
    })
    .then(res=>{
      if(res.data.status){
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
        <h1>New Password</h1>
       

       
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="**************"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>

      </form>
    </div>
    </div>
  )
}

export default ResetPassword
