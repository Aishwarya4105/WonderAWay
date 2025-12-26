


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './agency.css';

import { Link } from "react-router-dom";





const AgencyDashboard = () => {
    const [packages, setPackages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', days: '', price: '', image: '' });
    const [bookings, setBookings] = useState([]);
   
    const fetchPackages = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/agency/packages", {
            headers: {
                token: token
            }
        });

        if (res.ok) {
            const data = await res.json();
            setPackages(data);
        }
    } catch (err) {
        console.error(err);
    }
};
/*const fetchAgencyBookings = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch("http://localhost:5000/agency/bookings", {
            headers: { "token": token }
        });
        if (res.ok) {
            const data = await res.json();
            setBookings(data);
        }
    } catch (err) {
        console.error("Error fetching bookings:", err);
    }
};*/

const fetchAgencyBookings = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch("http://localhost:5000/agency/bookings", {
            headers: { "token": token }
        });
        if (res.ok) {
            const data = await res.json();
            setBookings(data.bookings); // note: bookings are inside `data.bookings`
        }
    } catch (err) {
        console.error("Error fetching bookings:", err);
    }
};


    useEffect(() => { fetchPackages();fetchAgencyBookings(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- DELETE FUNCTION ---
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/packages/${id}`, {
                method: "DELETE",
                headers: { "token": token } // Required by auth middleware
            });
            if (res.ok) {
                toast.success("Package deleted");
                fetchPackages();
            }
        } catch (err) { toast.error("Delete failed"); }
    };

    // --- EDIT & CREATE FUNCTION ---
    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = isEditing 
            ? `http://localhost:5000/packages/${currentId}` 
            : "http://localhost:5000/packages";
        
        try {
            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json", "token": token },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success(isEditing ? "Updated!" : "Created!");
                setShowModal(false);
                setIsEditing(false);
                fetchPackages();
            }
        } catch (err) { toast.error("Save failed"); }
    };

    const openEditModal = (pkg) => {
        setIsEditing(true);
        setCurrentId(pkg._id);
        setFormData({ title: pkg.title, description: pkg.description, days: pkg.days, price: pkg.price, image: pkg.image });
        setShowModal(true);
    };

    return (
        <>
         <header className="agency-navbar">
              <div className="agency-nav-right">
                <div className="agency-logo">
                  Agency<span>Management System</span>
                </div>
              </div>
        
              <div className="agency-header-nav">
                <Link to="/bookings" className="listing">
  <p>Booking Details</p>
</Link>

                     
               </div>
            </header>
        <div className=" container-agency">
            <h1 className="h-agency">Agency Dashboard</h1>
            <button onClick={() => { setIsEditing(false); setFormData({title:'',description:'',days:'',price:'',image:''}); setShowModal(true); }} 
              className='btn-agency'>
                + Create New Package
            </button>

            {showModal && (
                <div className='modalOverlay'>
                    <div className='modalContentStyle'>
                        <h2>{isEditing ? "Edit Package" : "Create Package"}</h2>
                        <form onSubmit={handleSave}>
                            <input name="title" value={formData.title} placeholder="Title" onChange={handleChange} className='inputStyle' required />
                            <input name="description" value={formData.description} placeholder="Description" onChange={handleChange} className='inputStyle' required />
                            <input name="days" value={formData.days} type="number" placeholder="Days" onChange={handleChange} className='inputStyle' required />
                            <input name="price" value={formData.price} type="number" placeholder="Price" onChange={handleChange}className='inputStyle' required />
                            <input name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} className='inputStyle' required />
                            <button type="submit" style={{ backgroundColor: '#0056b3', color: 'white', padding: '10px', marginRight: '10px', width:'45%' ,border:'none',borderRadius:'6px'}}>{isEditing ? "Update" : "Create"}</button>
                            <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px',width:'51%' ,border:'none',borderRadius:'6px',backgroundColor:'#c0c6cfff'}}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <div className='agency-card-container'>
                {packages.map((pkg) => (
                    <div key={pkg._id} className='agency-card'>
                        <img src={pkg.image} alt={pkg.title} />
                        <div style={{ padding:'5px' }}>
                            <h3>{pkg.title}</h3>
                            <p>{pkg.description}</p>
                            <p>₹{pkg.price}</p>
                            <p>{pkg.days} Days </p>
                            <button onClick={() => openEditModal(pkg)} className='editBtn'>Edit</button>
                            <button onClick={() => handleDelete(pkg._id)} className='deleteBtn'>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </>
    );
};



export default AgencyDashboard;