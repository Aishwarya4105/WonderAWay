

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookingpage.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const packageData = location.state?.packageData;

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    travelDate: "",
    numOfTravelers: 1,
    notes: ""
  });

  // Redirect if no package data
  useEffect(() => {
     console.log("Package Data:", packageData);
    if (!packageData) {
      navigate("/");
      return;
    }

  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  


    const user = JSON.parse(storedUser);
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.name,
        email: user.email
      }));
    }
  }, [packageData, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


   const bookingPayload = {
  package_id: packageData._id,
  packageName: packageData.title,
  price: packageData.price,
  userName: formData.userName,
  email: formData.email,
  travelDate: formData.travelDate,
  numOfTravelers: formData.numOfTravelers,
  notes: formData.notes
};


    try {
      const response = await fetch("https://wonderaway-1.onrender.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token")
        },
        body: JSON.stringify(bookingPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

    
      navigate("/bookingsucess");

    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while booking.");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book Package</h2>

    Package Details (Auto Filled) 
      <div className="package-summary">
        <p><strong>Package:</strong> {packageData.title}</p>
        <p><strong>Duration:</strong> {packageData.days} Days</p>
        <p><strong>Price:</strong> ₹{packageData.price}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="userName"
            value={formData.userName}
            readOnly
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </label>

        <label>
          Travel Date
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Number of Travelers
          <input
            type="number"
            name="numOfTravelers"
            min="1"
            value={formData.numOfTravelers}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;



