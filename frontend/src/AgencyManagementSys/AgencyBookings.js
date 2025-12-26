/*import React, { useEffect, useState } from "react";

import AgencyNav from "./AgencyManagementSys/Nav-agencydashboard";

const AgencyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/agency/bookings", {
                    method: "GET",
                    headers: {
                        "token": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setBookings(data);
                } else {
                    console.error("Failed to fetch:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <> 
       


        <div style={{ padding: "20px" }}>
            <h2>Received Bookings</h2>
            {loading ? (
                <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
                <p>No bookings received yet.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th>Package Name</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Travel Date</th>
                            <th>Travelers</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id}>
                                <td>{b.packageName}</td>
                                <td>{b.userName}</td>
                                <td>{b.email}</td>
                                <td>{new Date(b.travelDate).toLocaleDateString()}</td>
                                <td>{b.numOfTravelers}</td>
                                <td>{b.notes || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default AgencyBookings;*/



/*import React, { useEffect, useState } from "react";

const AgencyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/agency/bookings", {
      headers: { token }
    })
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Bookings for Your Packages</h2>
      {bookings.map(b => (
        <div key={b._id}>
          <h3>Package: {b.package_id.title}</h3>
          <p>User: {b.userName} ({b.email})</p>
          <p>Travel Date: {new Date(b.travelDate).toLocaleDateString()}</p>
          <p>Travelers: {b.numOfTravelers}</p>
          <p>Notes: {b.notes}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default AgencyBookings;
*/



import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './agency.css';

const AgencyBookings = () => {
    const [bookings, setBookings] = useState([]);

    const fetchAgencyBookings = async () => {
       /* try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/agency/bookings", {
                headers: { token }
            });
            if (res.ok) {
                const data = await res.json();
                
console.log("Fetched bookings:", data)


                setBookings(data);
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
        }*/

            try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/agency/bookings", {
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
                   {/*} {bookings.map(b => (
                        <tr key={b._id}>
                            <td>{b.package_id.title}</td>
                            <td>{b.user_id.name}</td>
                            <td>{b.user_id.email}</td>
                            <td>{new Date(b.travelDate).toLocaleDateString()}</td>
                            <td>{b.numOfTravelers}</td>
                            <td>{b.status}</td>
                        </tr>
                    ))}*/}

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
