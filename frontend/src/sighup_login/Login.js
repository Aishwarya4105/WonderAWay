



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const handlesubmit = async (e) => {
  e.preventDefault();
  setIsSubmitted(true);

  if (!email || !password) {
    toast.error("Email and password are required!");
    return;
  }

  try {
    const response = await fetch("https://wonderaway-1.onrender.com/login", {
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



