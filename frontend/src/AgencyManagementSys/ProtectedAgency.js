// ProtectedAgency.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAgency = ({ children }) => {
  const role = localStorage.getItem("role"); // get role from localStorage
  const token = localStorage.getItem("token"); // optionally check token too

  // if no token or role is not 'agency', redirect to login or home
  if (!token || role !== "agency") {
    return <Navigate to="/login" replace />;
  }

  // if role is agency, render the protected component
  return children;
};

export default ProtectedAgency;
