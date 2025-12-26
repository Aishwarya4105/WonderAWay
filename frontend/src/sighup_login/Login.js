
/*import './Auth.css';


import React from "react";
import { useState } from "react";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isSubmitted, setIsSubmitted] = useState(false);
  

/*  const handlesubmit = async (e) => {
        e.preventDefault();
          console.log("LOGIN BUTTON CLICKED"); 
        setIsSubmitted(true);
        try {
            const response = await fetch("http://localhost:5000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),

                });

            const data = await response.json();

            if (!response.ok) {
              
                return console.error(data.message || "Invalid credentials");

            }
            

            localStorage.setItem("token",data.token);
            localStorage.setItem("role",data.role);
             console.log(data);
           
            toast.success("Login sucessful!")

            if (data.role === "agency") {
      navigate("/agencydashboard");
    } else {
      navigate("/");
    }


        } catch (error) {
          toast.error("Server error");

        }
        console.log("Role in localstorage:",localStorage.getItem("role"))
    }
        
    
     return (
    <div className="overlay">
      <div className="modal">
        <h2 className="title">Login</h2>

        <input type="email" placeholder="Email Address" className="input" value={email} onChange={(e) => setEmail(e.target.value)}/>
       {isSubmitted && !email && <p className="error-msg">Email is required</p>}
        <input type="password" placeholder="Password" className="input"value={password} onChange={(e) => setPassword(e.target.value)} />
         {isSubmitted && !password && <p className="error-msg">Password is required</p>}
        <button className="btn blue"type="submit" onClick={handlesubmit}>Log In</button>

       <p onClick={() => navigate("/")}>← Back to Home</p>
        
      </div>
    </div>
  );
};

export default Login;

*/

/*const handlesubmit = async (e) => {
e.preventDefault();
 console.log("LOGIN BUTTON CLICKED"); 
setIsSubmitted(true);

try {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log("FULL LOGIN RESPONSE:", data);

  if (!response.ok) {
    toast.error(data.message || "Invalid credentials");
    return;
  }

  // ✅ SAVE HERE (already correct)
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  toast.success("Login successful!");

  // ✅ REDIRECT HERE
  if (data.role === "agency") {
    navigate("/agencydashboard");
  } else {
    navigate("/");
  }

} catch (error) {
  toast.error("Server error");
}
};
/*return (
<div className="overlay">
<div className="modal">
  <h2 className="title">Login</h2>

  <form onSubmit={handlesubmit}>
    <input
      type="email"
      placeholder="Email Address"
      className="input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    {isSubmitted && !email && <p className="error-msg">Email is required</p>}

    <input
      type="password"
      placeholder="Password"
      className="input"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    {isSubmitted && !password && <p className="error-msg">Password is required</p>}

    <button className="btn blue" type="submit">
      Log In
    </button>
  </form>

  <p onClick={() => navigate("/")}>← Back to Home</p>
</div>
</div>
);
};

export default Login;*/
/*return (
<div className="overlay">
  <div className="modal">
    <h2 className="title">Login</h2>

    <form onSubmit={handlesubmit}>
      <input
        type="email"
        placeholder="Email Address"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isSubmitted && !email && <p className="error-msg">Email is required</p>}

      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isSubmitted && !password && <p className="error-msg">Password is required</p>}

      <button className="btn blue" type="submit">
        Log In
      </button>
    </form>

    <p onClick={() => navigate("/")}>← Back to Home</p>
  </div>
</div>
 );
};

export default Login;
*/



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  /*const handlesubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();


      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email
        })
      );


      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // save token and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      toast.success("Login successful!");

      // redirect based on role
      if (data.user.role === "agency") {
        navigate("/agencydashboard"); // must match App.js route
      } else {
        navigate("/"); // user home page
      }
    } catch (error) {
      toast.error("Server error");
    }
  };*/
  const handlesubmit = async (e) => {
  e.preventDefault();
  setIsSubmitted(true);

  if (!email || !password) {
    toast.error("Email and password are required!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // ✅ FIRST check response
    if (!response.ok) {
      toast.error(data.message || "Login failed");
      return;
    }

    // ✅ NOW safe to access user
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.user.name,
        email: data.user.email,
      })
    );

    toast.success("Login successful!");

    if (data.user.role === "agency") {
      navigate("/agencydashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
};


  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="title">Login</h2>

        <form onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {isSubmitted && !email && <p className="error-msg">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {isSubmitted && !password && <p className="error-msg">Password is required</p>}

          <button className="btn blue" type="submit">
            Log In
          </button>
        </form>

        <p onClick={() => navigate("/")}>← Back to Home</p>
      </div>
    </div>
  );
};

export default Login;



