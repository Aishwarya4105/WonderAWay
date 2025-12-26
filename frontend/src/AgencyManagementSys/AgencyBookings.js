






import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './agency.css';

const AgencyBookings = () => {
    const [bookings, setBookings] = useState([]);

    const fetchAgencyBookings = async () => {
     

            try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://wonderaway-1.onrender.com/agency/bookings", {
            headers: { token }
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Fetched bookings:", data);
            setBookings(data.bookings || []);
        }
    } catch (err) {
        console.error("Error fetching bookings:", err);
    }

    };

    useEffect(() => {
        fetchAgencyBookings();
    }, []);

    return (

        <>
        <header className="agency-navbar">
              <div className="agency-nav-right">
                <div className="agency-logo">
                  Agency<span>Management System</span>
                </div>
              </div>
        
              <div className="agency-header-nav">
                <Link to="/agencydashboard" className="listing">
  <p>Agency Dashboard</p>
</Link>

                     
               </div>
            </header>
        <div className="container-agency">
            <h1>All Bookings</h1>
            <table className="bookings-table" >
                <thead>
                    <tr>
                        <th>Package</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Travel Date</th>
                        <th>Travelers</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                  

                    {Array.isArray(bookings) && bookings.length > 0 ? (
    bookings.map(b => (
        <tr key={b._id}>
            <td>{b.package_id?.title}</td>
            <td>{b.user_id?.name}</td>
            <td>{b.user_id?.email}</td>
            <td>{new Date(b.travelDate).toLocaleDateString()}</td>
            <td>{b.numOfTravelers}</td>
            <td>{b.status}</td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="6">No bookings available</td>
    </tr>
)}

                </tbody>
            </table>
        </div>
        </>
    );
};

export default AgencyBookings;
