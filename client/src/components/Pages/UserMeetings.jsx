import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import "../../assets/css/Meeting.css";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meeting/user", {
        withCredentials: true,
      });
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
        { withCredentials: true },
      );
      fetchMeetings();
    } catch (err) {
      console.log(err);
    }
  };

  const handleInterest = async (id, interested) => {
    const confirmMsg = interested
      ? "Are you sure you want to mark this as Interested?"
      : "Are you sure you are Not Interested?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.put(
        `http://localhost:5000/api/meeting/interest/${id}`,
        { interested },
        { withCredentials: true },
      );
      fetchMeetings();
    } catch (err) {
      console.log(err);
    }
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

              <div className="card-header">
                <h3>
                  <FaHome /> {m.propertyId?.name}
                </h3>
                {getStatus(m.status)}
              </div>

              <div className="card-body">
                <h5>
                  <FaMapMarkerAlt /> {m.propertyId?.location}
                </h5>
                <h5>
                  <strong>₹ {m.propertyId?.price}</strong>
                </h5>
                <h5>Date: {m.date}</h5>
                <h5>Time: {m.time}</h5>
                <h5 className="message">Message: {m.message}</h5>
              </div>

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
                  <p>
                    <FaPhone /> {m.brokerId?.phone}
                  </p>
                </div>
              </div>

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
              <div className="mt-2 p-2 fs-5">
                Are Your Confirm This Property is Fixed{" "}
              </div>

              {m.status === "confirmed" && (
                <div className="interest-box">
                  {m.interested === undefined && (
                    <>
                      <button
                        className="interest-btn yes"
                        onClick={() => handleInterest(m._id, true)}
                      >
                        <FaHeart /> Interested
                      </button>

                      <button
                        className="interest-btn no"
                        onClick={() => handleInterest(m._id, false)}
                      >
                        <FaRegHeart /> Not Interested
                      </button>
                    </>
                  )}

                  {m.interested === true && (
                    <button className="interest-btn yes active">
                      <FaHeart /> Interested
                    </button>
                  )}

                  {m.interested === false && (
                    <button className="interest-btn no active">
                      <FaRegHeart /> Not Interested
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMeetings;
