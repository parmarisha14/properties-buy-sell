import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../assets/css/BrokerMeetings.css";

const BrokerMeetings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meeting/broker", {
        withCredentials: true,
      });
      setData(res.data.meetings || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMeeting = async (id) => {
    if (!window.confirm("Are you sure to delete this meeting?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/meeting/${id}`, {
        withCredentials: true,
      });
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN");

  const formatTime = (t) =>
    new Date(`1970-01-01T${t}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getPropertyImage = (property) => {
    if (!property?.image) return "/default-property.jpg";
    if (property.image.startsWith("http")) return property.image;
    return `http://localhost:5000/uploads/properties/${property.image}`;
  };

  const normalizeStatus = (status) => status?.toLowerCase() || "pending";

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <h2 className="meeting-title">My Meetings</h2>

        <div className="meeting-grid">
          {data.length === 0 ? (
            <div className="empty-box">No Meetings Found</div>
          ) : (
            data.map((m) => (
              <div className="broker-meeting-card" key={m._id}>
                <div className="image-wrapper">
                  <img
                    src={getPropertyImage(m.propertyId)}
                    className="meeting-property-img"
                    alt="property"
                  />

                  <span className={`status-badge ${normalizeStatus(m.status)}`}>
                    {m.status || "pending"}
                  </span>
                </div>

                <div className="meeting-body">
                  <div className="meeting-header">
                    <h3>{m.propertyId?.name}</h3>
                    <span className="price">₹ {m.propertyId?.price}</span>
                  </div>

                  <p className="location">{m.propertyId?.location}</p>

                  <div className="user-card">
                    <div className="user-avatar">
                      {m.userId?.fullName?.charAt(0)}
                    </div>

                    <div>
                      <p className="user-name">{m.userId?.fullName}</p>
                      <p className="user-phone">{m.userId?.phone}</p>
                    </div>
                  </div>

                  <div className="info-section">
                    <div className="info-row">
                      <span className="label">Date: </span>
                      <span className="value">{formatDate(m.date)}</span>
                    </div>

                    <div className="info-row">
                      <span className="label">Time: </span>
                      <span className="value">{formatTime(m.time)}</span>
                    </div>

                    <div className="info-row message">
                      <span className="label">Message: </span>
                      <span className="value">{m.message || "No message"}</span>
                    </div>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteMeeting(m._id)}
                  >
                    Delete Meeting
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerMeetings;
