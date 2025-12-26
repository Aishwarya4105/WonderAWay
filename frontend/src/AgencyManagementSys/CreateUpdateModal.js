import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CreateUpdateModal = ({ pkgToEdit, onClose, refreshPackages }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading,setLoading]=useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);

 
  useEffect(() => {
    if (pkgToEdit) {
      setTitle(pkgToEdit.title || "");
      setDescription(pkgToEdit.description || "");
      setDays(pkgToEdit.days || "");
      setPrice(pkgToEdit.price || "");
      setImage(pkgToEdit.image || "");
    }
  }, [pkgToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitted(true);

    if (!title || !description || !days || !price || !image) {
      return toast.error("All fields are required");
    }

    const method = pkgToEdit ? "PUT" : "POST";
    const url = pkgToEdit
      ? `https://wonderaway-1.onrender.com/packages/${pkgToEdit._id}`
      : "https://wonderaway-1.onrender.com/packages";

    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, days, price, image }),
      });
      setLoading(false);

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Something went wrong");
      }

      toast.success(pkgToEdit ? "Package updated!" : "Package created!");
      refreshPackages();
      onClose();        
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h2>{pkgToEdit ? "Update Package" : "Create Package"}</h2>

        <input
          type="text"
          placeholder="Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {isSubmitted && !title && <p className="error-msg">Title required</p>}

        <textarea
          placeholder="Description"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {isSubmitted && !description && (
          <p className="error-msg">Description required</p>
        )}

        <input
          type="number"
          placeholder="Days"
          className="input"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        {isSubmitted && !days && <p className="error-msg">Days required</p>}

        <input
          type="number"
          placeholder="Price"
          className="input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {isSubmitted && !price && <p className="error-msg">Price required</p>}

        <input
          type="text"
          placeholder="Image URL"
          className="input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {isSubmitted && !image && <p className="error-msg">Image required</p>}

        <div className="modal-actions">
          <button className="save-btn" type="submit" disabled={loading}>
            {pkgToEdit ? "Update" : "Create"}
          </button>
          <button
            className="cancel-btn"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateModal;
