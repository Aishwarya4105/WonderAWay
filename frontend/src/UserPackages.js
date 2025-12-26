import { useNavigate } from "react-router-dom";
import './App.css'


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaHeart, FaRegHeart } from "react-icons/fa";


import { useLocation } from "react-router-dom";


const UserPackages = ({ pkg }) => {
    const location = useLocation();

    const [packages, setPackages] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]);

    const [searchTerm, setSearchTerm] = useState(
        location.state?.searchTerm || ""
    );




    const navigate = useNavigate();

    const handleBookNow = (pkg) => {
        if (!pkg || !pkg._id) {
            console.error("invalid package data");
            return;
        }
        navigate("/booking", {
            state: {
                packageData: {
                    _id: pkg._id,
                    title: pkg.title,
                    price: pkg.price,
                    days: pkg.days,
                    description: pkg.description
                }
            }
        });

    };
    useEffect(() => {
        fetchPackages();
        fetchUserWishlist();
    }, []);

    const fetchPackages = async () => {
        const res = await fetch("https://wonderaway-1.onrender.com/packages");
        const data = await res.json();
        setPackages(data);
    };

    const fetchUserWishlist = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await fetch("https://wonderaway-1.onrender.com/wishlist", {
                headers: { "token": token }

            });
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setWishlistIds(data.map(item => item.package_id));
            } else {
                setWishlistIds([]);
            }
        } catch (err) {
            console.error("Wishlist fetch error:", err);
            setWishlistIds([]);
        }
    };


    //for search bar
    const filteredPackages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const toggleWishlist = async (pkg) => {
        const token = localStorage.getItem('token');
        console.log("Checking token:", token);
        if (!token) return toast.error("Please login first");

        try {
            const res = await fetch("https://wonderaway-1.onrender.com/wishlist/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json", "token": token },
                body: JSON.stringify({
                    packageId: pkg._id,
                    title: pkg.title,
                    price: pkg.price,
                    image: pkg.image,
                    days: pkg.days,
                    description: pkg.description

                })
            });
            const data = await res.json();
            if (res.ok) {
                if (data.status === "added") {
                    setWishlistIds(prev => [...prev, pkg._id]);
                    toast.success("Added to Wishlist");
                } else {
                    setWishlistIds(prev => prev.filter(id => id !== pkg._id));
                    toast.info("Removed from Wishlist");
                }
            }
        } catch (err) {
            toast.error("Action failed");
        }
    };

    return (
        <div className='user-pkg-container'>
            <div className="user-pkg-header">

                
                <div className="hero-search">
                    <input
                        type="text"
                        placeholder="Find your next unforgettable journey"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>
                <h1 >Explore the latest packages</h1>
            </div>

            <div className="user-pkg">
                {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => {
                        const isLiked = wishlistIds.includes(pkg._id);
                        return (
                            <div key={pkg._id} className="user-pkg-card">
                                {/* existing card UI */}
                                <div style={{ position: 'relative', height: '220px' }}>
                                    <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button onClick={() => toggleWishlist(pkg)} className='heartbtn'>

                                        {isLiked ? (
                                            <FaHeart color="#e74c3c" size={22} />
                                        ) : (
                                            <FaRegHeart color="#555" size={22} />
                                        )}


                                    </button>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3>{pkg.title}</h3>
                                    <p>₹{pkg.price}</p>
                                    <p>{pkg.days}/days</p>
                                    <p>{pkg.description}</p>
                                    <button className='booknowbtn' onClick={() => handleBookNow(pkg)}>Book Now</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p style={{ textAlign: "center", width: "100%" }}>
                        No packages found
                    </p>
                )}
            </div>




        </div>
    );
};



export default UserPackages;
