

import React from "react";
import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import './Auth.css';

const TravelAgencyRegister = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [ licenseNumber, setLicenseNumber] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [ address, setAddress] = useState("");
    const [ phone, setPhone] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [, setMessage] = useState(" ");
     
    const handlesubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            const response = await fetch("http://localhost:5000/register/agency",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name, email, password, role: "agency", agencyprofile:{ companyname, licenseNumber, gstNumber, address, phone}
                    })
                });

                    const data = await response.json();
                    if(!response.ok) {
                        return  console.error(data.message || "Registration Failed")

        }

            console.log(data);
        toast.success("Acount created sucessfully!")
        //direct to next page

    } catch (error) {
        setMessage("error:" + error.message);
    }

};
  return (
    <div className="overlay" onSubmit={handlesubmit}>
      <div className="modal">
        <span className="close" onClick={() => navigate("/")}>×</span>

        <h2 className="title">Travel Agency Registration</h2>

        <input type="text" placeholder="AgencyName" className="input"  value={companyname} onChange={(e) => setCompanyname(e.target.value)} required  />
         {isSubmitted && !companyname && <p className="error-msg">*agency name is required</p>}
         <input type="text" placeholder="Contact Person Name" className="input"  value={name} onChange={(e) => setName(e.target.value)} required />
         {isSubmitted && !name && <p className="error-msg">*Contact Person name is required</p>}
        <input type="email" placeholder="Contact Email" className="input"value={email} onChange={(e) => setEmail(e.target.value)} required  />
         {isSubmitted && !email && <p className="error-msg">Email is required</p>}
        <input type="password" placeholder="Password" className="input"  value={password} onChange={(e) => setPassword(e.target.value)} required />
        {isSubmitted && !password && <p className="error-msg">*password is required</p>}
        <input type="text" placeholder="GST Number" className="input"value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} required />
        {isSubmitted && !gstNumber && <p className="error-msg">*GST Number is required</p>}
        <input type="text" placeholder="License Number" className="input"  value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />
        {isSubmitted && !licenseNumber && <p className="error-msg">*license Number is required</p>}
        <input type="text" placeholder="Address" className="input" value={address} onChange={(e) => setAddress(e.target.value)} required />
        {isSubmitted && !address && <p className="error-msg">*address is required</p>}
        <input type="text" placeholder="Phone Number" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
        {isSubmitted && !phone && <p className="error-msg">*phone number is required</p>}
        <button className="btn blue"  onClick={handlesubmit}>Submit Registration</button>

        <p className="link" onClick={() => navigate("/")}>
          ← Change Role
        </p>
      </div>
    </div>
  );
};

export default TravelAgencyRegister;



