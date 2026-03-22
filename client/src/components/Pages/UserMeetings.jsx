import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
 
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaTrash,
} from "react-icons/fa";

import "../../assets/css/Meeting.css";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/meeting/user",
        { withCredentials: true }
      );
      setMeetings(res.data.meetings || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/meeting/status/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchMeetings();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete meeting?")) return;

    await axios.delete(
      `http://localhost:5000/api/meeting/${id}`,
      { withCredentials: true }
    );

    fetchMeetings();
  };

  const getStatus = (status) => {
    if (status === "confirmed") {
      return (
        <span className="status confirmed">
          <FaCheckCircle /> Confirmed
        </span>
      );
    }
    if (status === "cancelled") {
      return (
        <span className="status cancelled">
          <FaTimesCircle /> Cancelled
        </span>
      );
    }
    return (
      <span className="status pending">
        <FaHourglassHalf /> Pending
      </span>
    );
  };

  return (
    <div className="meeting-container">
      <h2 className="title">My Meetings</h2>

      {meetings.length === 0 ? (
        <h3>No Meetings Found</h3>
      ) : (
        <div className="meeting-grid">
          {meetings.map((m) => (
            <div key={m._id} className="meeting-card">

              {/* IMAGE */}
              <div className="property-img">
                <img
                  src={
                    m.propertyId?.image
                      ? `http://localhost:5000/uploads/properties/${m.propertyId.image}`
                      : "/default-property.jpg"
                  }
                  alt=""
                />
              </div>

              {/* HEADER */}
              <div className="card-header">
                <h3>
                  <FaHome /> {m.propertyId?.name}
                </h3>
                {getStatus(m.status)}
              </div>

              {/* DETAILS */}
              <div className="card-body">
                <h5><FaMapMarkerAlt /> {m.propertyId?.location}</h5>
                <h5 className="mt-2"><strong>₹ {m.propertyId?.price}</strong></h5>
                <h5 className="mt-2">Date: {m.date}</h5>
                <h5 className="mt-2">Time:{m.time}</h5>
                <h5 className="message">Message:  {m.message}</h5>
              </div>

              {/* BROKER */}
              <div className="broker-box">
                <img
                  src={
                    m.brokerId?.brokerImage
                      ? `http://localhost:5000/uploads/users/${m.brokerId.brokerImage}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                />
                <div>
                  <h4>{m.brokerId?.name}</h4>
                  <p><FaPhone /> {m.brokerId?.phone}</p>
                  <p>{m.brokerId?.email}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              {m.status === "pending" && (
                <div className="action-buttons">
                  <button
                    className="confirm-btn"
                    onClick={() => updateStatus(m._id, "confirmed")}
                  >
                    Confirm
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => updateStatus(m._id, "cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* DELETE */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(m._id)}
              >
                <FaTrash /> Delete
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMeetings;