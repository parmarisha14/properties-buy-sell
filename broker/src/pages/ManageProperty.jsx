import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../assets/Css/ManageProperty.css";

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

      setProperties(res.data);

    } catch (err) {

      console.log("Fetch Error:", err);

    }

  };

  const deleteProperty = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/property/delete/${id}`,
        { withCredentials: true }
      );

      fetchProperties();

    } catch (err) {

      console.log("Delete Error:", err);

    }

  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <h2 className="mb-4">Manage Properties</h2>

        <div className="row">

          {properties.length === 0 && (
            <p>No properties found.</p>
          )}

          {properties.map((p) => (

            <div className="col-md-6 col-lg-4 mb-4" key={p._id}>

              <div className="property-card shadow-sm p-3">

                <img
                  src={
                    p.image
                      ? `http://localhost:5000/uploads/properties/${p.image}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={p.name}
                  className="property-img"
                />

                <h5 className="mt-2">{p.name}</h5>

                <p>₹ {p.price}</p>

                <p>
                  {p.location}, {p.city}, {p.state}
                </p>

                <p>
                  Bedrooms: {p.bedroom} | Bathrooms: {p.bathroom}
                </p>

                <p>
                  Area: {p.area} sq.ft | Year: {p.year}
                </p>

                <p>
                  Type: {p.type}
                </p>

                <p>
                  Features: {Array.isArray(p.features) ? p.features.join(", ") : ""}
                </p>

                <p>{p.description}</p>

                <p>
                  <b>Status:</b> {p.status}
                </p>

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/edit-property/${p._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProperty(p._id)}
                  >
                    Delete
                  </button>

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