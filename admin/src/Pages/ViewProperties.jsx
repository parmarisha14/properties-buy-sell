import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewProperties.css";

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

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
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/property/delete/${id}`);
      fetchProperties();
      alert("Property deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const filteredProperties = properties.filter((p) => {
    const key = search.toLowerCase();

    return (
      p.name?.toLowerCase().includes(key) ||
      p.location?.toLowerCase().includes(key) ||
      p.city?.toLowerCase().includes(key) ||
      p.state?.toLowerCase().includes(key) ||
      p.type?.toLowerCase().includes(key) ||
      p.price?.toString().includes(key) ||
      p.bedroom?.toString().includes(key) ||
      p.bathroom?.toString().includes(key) ||
      p.area?.toString().includes(key) ||
      p.year?.toString().includes(key) ||
      p.description?.toLowerCase().includes(key) ||
      p.brokerId?.name?.toLowerCase().includes(key) ||
      p.brokerId?.phone?.toString().includes(key)
    );
  });

  return (
    <div className="property-wrapper">
      <h2 className="page-title">All Properties</h2>

      <input
        type="text"
        placeholder="Search properties..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="property-grid">
        {filteredProperties.length === 0 && <p>No properties found</p>}

        {filteredProperties.map((property) => (
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
                <b>Year:</b> {property.year}
              </p>
              <p>
                <b>Type:</b> {property.type}
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
