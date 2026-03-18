import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../assets/Css/ManageProperty.css";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaTags,
  FaEdit,
  FaTrash
} from "react-icons/fa";

axios.defaults.withCredentials = true;

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/property/broker",
        { withCredentials: true }
      );
      setProperties(res.data.properties);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/property/delete/${id}`, { withCredentials: true });
      fetchProperties();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "approved") return "badge-approved";
    if (status === "rejected") return "badge-rejected";
    return "badge-pending";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h2>Manage Properties</h2>
          <button className="add-btn" onClick={() => navigate("/add-property")}>+ Add Property</button>
        </div>

        <div className="property-grid">
          {properties.length === 0 && <p>No properties found.</p>}

          {properties.map((p) => (
            <div className="property-card" key={p._id}>
              <img
                src={p.image ? `http://localhost:5000/uploads/properties/${p.image}` : "https://via.placeholder.com/300x200"}
                alt={p.name}
                className="property-img"
              />

              <div className="property-body">
                <div className="property-header">
                  <h5>{p.name}</h5>
                  <span className={`status-badge ${getStatusBadge(p.status)}`}>{p.status}</span>
                </div>

                <p className="property-price">₹ {p.price}</p>
                <p className="property-location">{p.location}, {p.city}, {p.state}</p>

                <div className="property-info">
                  <span><FaBed /> {p.bedroom || 0}</span>
                  <span><FaBath /> {p.bathroom || 0}</span>
                  <span><FaRulerCombined /> {p.area || 0} sq.ft</span>
                  <span><FaCalendarAlt /> {p.year || "N/A"}</span>
                  <span><FaTags /> {p.type || "N/A"}</span>
                </div>

                {p.description && <p className="property-description">{p.description}</p>}

                {p.features && p.features.length > 0 && (
                  <div className="property-features">
                    {p.features.map((f, i) => <span key={i} className="feature-badge">{f}</span>)}
                  </div>
                )}

                {p.brokerId && <p className="property-broker">Broker: {p.brokerId.fullName || p.brokerId.name}</p>}

                <div className="property-buttons">
                  <button className="edit-btn" onClick={() => navigate(`/edit-property/${p._id}`)}><FaEdit /> Edit</button>
                  <button className="delete-btn" onClick={() => deleteProperty(p._id)}><FaTrash /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;