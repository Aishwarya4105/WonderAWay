
import React from "react";
import { useState } from 'react';
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


const IndividualRegister = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setMessage] = useState(" ");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handlesubmit = async (e) => {
        e.preventDefault();  
        setIsSubmitted(true);
        try {
            const response = await fetch("https://wonderaway-1.onrender.com/register/user",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, role: "user" })
                });

            const data = await response.json();
            if (!response.ok) {
               return  console.error(data.message||"Registration Failed")
                
            }

            console.log(data);
            toast.success("Acount created sucessfully!")
            console.log("role in localstorage:",localStorage.getItem("role"))
       //direct to next page

    } catch (error) {
        setMessage("error:" + error.message);
    }

};

  return (
    <div className="overlay" onSubmit={handlesubmit}>
      <div className="modal">
        <span className="close" onClick={() => navigate("/")}>×</span>

        <h2 className="title">Individual User Registration</h2>

        <input type="text" placeholder="Full Name" className="input" value={name} onChange={(e) => setName(e.target.value)} required/>
        {isSubmitted && !name && <p className="error-msg">*full name is required</p>}
        <input type="email" placeholder="Email Address" className="input"  value={email} onChange={(e) => setEmail(e.target.value)} required />
        {isSubmitted && !email && <p className="error-msg">*email is required</p>}
        <input type="password" placeholder="Password" className="input"  value={password} onChange={(e) => setPassword(e.target.value)} required  />
        {isSubmitted && !password && <p className="error-msg">*password is required</p>}
        <button className="btn blue" type="submit" onClick={handlesubmit}>Submit Registration</button>

        <p className="link" onClick={() => navigate("/")}>
          ← Change Role
        </p>
      </div>
    </div>
  );
};

export default IndividualRegister;


