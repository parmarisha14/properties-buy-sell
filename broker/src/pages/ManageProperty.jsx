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
  FaTrash,
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
      const res = await axios.get("http://localhost:5000/api/property/broker", {
        withCredentials: true,
      });
      setProperties(res.data.properties || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete property?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/property/delete/${id}`, {
        withCredentials: true,
      });
      fetchProperties();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <div className="page-header">
          <h2>Manage Properties</h2>
        </div>

        <div className="property-grid">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            properties.map((p) => (
              <div className="property-card" key={p._id}>
                <div className="image-wrapper">
                  <img
                    src={
                      p.image
                        ? `http://localhost:5000/uploads/properties/${p.image}`
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={p.name}
                    className="property-img"
                  />
                  <span className={`status-badge ${getStatusClass(p.status)}`}>
                    {p.status || "pending"}
                  </span>
                </div>

                <div className="property-body">
                  <h5 className="property-title">{p.name}</h5>

                  <p className="property-price">₹ {p.price || 0}</p>

                  <p className="property-location">
                    {p.location}, {p.city}, {p.state}
                  </p>

                  <div className="property-info">
                    <span>
                      <FaBed /> {p.bedroom ?? 0}
                    </span>
                    <span>
                      <FaBath /> {p.bathroom ?? 0}
                    </span>
                    <span>
                      <FaRulerCombined /> {p.area ?? 0} sq.ft
                    </span>
                  </div>

                  <div className="property-info">
                    <span>
                      <FaCalendarAlt /> {p.year || "N/A"}
                    </span>
                    <span>
                      <FaTags /> {p.type || "N/A"}
                    </span>
                  </div>

                  {p.description && (
                    <p className="property-description">{p.description}</p>
                  )}

                  {p.features?.length > 0 && (
                    <div className="property-features">
                      {p.features.map((f, i) => (
                        <span key={i} className="feature-badge">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="property-broker">
                    Broker: {p?.brokerId?.name || "N/A"}
                  </p>

                  <div className="property-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-property/${p._id}`)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProperty(p._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;
