import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewBrokers.css";

const ViewBrokers = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/all-brokers");
      setBrokers(res.data.brokers);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteBroker = async (id) => {
    if (!window.confirm("Delete this broker?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/delete-broker/${id}`);
      fetchBrokers();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="broker-wrapper">
      <h2 className="page-title">Brokers List</h2>

      <div className="broker-grid">
        {brokers.map((broker) => (
          <div className="broker-card" key={broker._id}>
            <img
              src={
                broker.brokerImage
                  ? `http://localhost:5000/uploads/users/${broker.brokerImage}`
                  : "/default.png"
              }
              alt="broker"
              className="broker-img"
            />

            <div className="broker-body">
              <h3>{broker.name}</h3>

              <p className="agency">{broker.agency}</p>

              <p>{broker.email}</p>
              <p>{broker.phone}</p>

              <div className="broker-info">
                <p>
                  <b>RERA:</b> {broker.rera}
                </p>

                <p>
                  <b>Experience:</b> {broker.experienceYears} Years
                </p>
                <p>
                  <b>Location:</b> {broker.officeLocation}
                </p>
                <p>
                  <b>Languages:</b> {broker.languages?.join(", ")}
                </p>
              </div>

              <p className="summary">
                {broker.professionalSummary
                  ? broker.professionalSummary.substring(0, 100) + "..."
                  : ""}
              </p>

              <p className="quote">"{broker.quotes}"</p>

              <div className="broker-info">
                <p>
                  <b>Business Hours:</b>
                </p>
                <p>Mon-Fri: {broker.businessHours?.mondayFriday}</p>
                <p>Sat: {broker.businessHours?.saturday}</p>
                <p>Sun: {broker.businessHours?.sunday}</p>
              </div>

              <div className="action-buttons">
                <button className="view-btn">View</button>

                <button
                  className="delete-btn"
                  onClick={() => deleteBroker(broker._id)}
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

export default ViewBrokers;
