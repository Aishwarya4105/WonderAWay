// src/pages/Packages.js
import { useState, useEffect } from "react";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/packages");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div>
      <h1>All Packages</h1>
      {packages.map(p => (
        <div key={p._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Packages;