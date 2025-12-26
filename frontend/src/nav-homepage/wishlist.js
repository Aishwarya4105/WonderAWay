



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaHeart } from "react-icons/fa";


const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchWishlist = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch("https://wonderaway-1.onrender.com/wishlist", {
                headers: { token }
            });
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            toast.error("Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (packageId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch("https://wonderaway-1.onrender.com/wishlist/toggle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token
                },
                body: JSON.stringify({ packageId })
            });

            if (res.ok) {
                setItems(prev => prev.filter(i => i.package_id !== packageId));
                toast.info("Removed from Wishlist");
            }
        } catch {
            toast.error("Failed to remove item");
        }
    };

    const handleBookNow = (pkg) => {
        navigate("/booking", {
            state: {
                packageData: {
                    _id: pkg.package_id,
                    title: pkg.title,
                    price: pkg.price,
                    days: pkg.days,
                    description: pkg.description
                }
            }
        });
    };

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div className="user-pkg-container">
            <div className="user-pkg-header">
                <h1>My Saved Packages</h1>
                <Link to="/packages" className="wish-link">← Back to Explore</Link>
            </div>

            <div className="user-pkg">
                {items.length === 0 ? (
                    <p style={{ textAlign: "center", width: "100%" }}>
                        Your wishlist is empty
                    </p>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className="user-pkg-card">
                            {/* Image + heart */}
                            <div style={{ position: 'relative', height: '220px' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />

                                <button
                                    onClick={() => removeFromWishlist(item.package_id)}
                                    className="heartbtn"
                                >

                                    <FaHeart color="#e74c3c" size={22} />
                                </button>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '20px' }}>
                                <h3>{item.title}</h3>
                                <p>₹{item.price}</p>
                                <p>{item.days}/days</p>
                                <p>{item.description}</p>

                                <button
                                    className="booknowbtn"
                                    onClick={() => handleBookNow(item)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;
