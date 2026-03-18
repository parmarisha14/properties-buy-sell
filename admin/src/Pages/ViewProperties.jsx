import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewProperties.css";

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/property/all");
      setProperties(res.data.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const approveProperty = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/property/approve/${id}`);
      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectProperty = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/property/reject/${id}`);
      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/property/delete/${id}`);
      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="property-wrapper">
      <h2 className="page-title">All Properties</h2>

      <div className="property-grid">
        {properties.length === 0 && <p>No properties found</p>}

        {properties.map((property) => (
          <div className="property-card" key={property._id}>
            <img
              src={
                property.image
                  ? `http://localhost:5000/uploads/properties/${property.image}`
                  : "https://via.placeholder.com/300x200"
              }
              alt="property"
              className="property-img"
            />

            <div className="property-body">
              <h3>{property.name}</h3>
              <p className="price">₹ {property.price}</p>
              <p>
                <b>Location:</b> {property.location}
              </p>
              <p>
                <b>City:</b> {property.city}
              </p>
              <p>
                <b>State:</b> {property.state}
              </p>
              <p>
                <b>Bedrooms:</b> {property.bedroom}
              </p>
              <p>
                <b>Bathrooms:</b> {property.bathroom}
              </p>
              <p>
                <b>Area:</b> {property.area} sq.ft
              </p>
              <p>
                <b>Year Built:</b> {property.year}
              </p>
              <p>
                <b>Property Type:</b> {property.type}
              </p>
              <p>
                <b>Description:</b> {property.description}
              </p>
              <p>
                <b>Features:</b>{" "}
                {Array.isArray(property.features)
                  ? property.features.join(", ")
                  : ""}
              </p>

              {/* ✅ Updated to match backend populate */}
              <p>
                <b>Broker:</b> {property.brokerId?.name || "N/A"} (
                {property.brokerId?.phone || "N/A"})
              </p>

              <p className={`status ${property.status}`}>{property.status}</p>

              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => approveProperty(property._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => rejectProperty(property._id)}
                >
                  Reject
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProperty(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProperties;
