// PackageCard.jsx
import React from "react";

const PackageCard = ({ pkg, onEdit, onDelete }) => {
  return (
    <div className="package-card">
      <img src={pkg.image} alt={pkg.title} />

      <div className="package-body">
        <h3>{pkg.title}</h3>
        <p>{pkg.description}</p>
        <p>{pkg.days} Days</p>
        <p className="package-price">₹{pkg.price}</p>
      </div>

      <div className="card-actions">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn"onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PackageCard;