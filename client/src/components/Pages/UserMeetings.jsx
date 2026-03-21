import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaUserTie,
  FaUser,
  FaTrash,
} from "react-icons/fa";

import "../../assets/css/Meeting.css";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  // GET ALL USER MEETINGS
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/meeting", {
        withCredentials: true,
      });
      setMeetings(res.data || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // DELETE MEETING
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this meeting?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/meeting/delete/${id}`, {
        withCredentials: true,
      });
      fetchMeetings();
    } catch (err) {
      console.log(err);
    }
  };

  // STATUS UI
  const getStatus = (status) => {
    if (status === "Confirmed") {
      return (
        <span className="status confirmed">
          <FaCheckCircle /> Confirmed
        </span>
      );
    }
    if (status === "Cancelled") {
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

      {loading ? (
        <h3>Loading...</h3>
      ) : meetings.length === 0 ? (
        <h3>No Meetings Found</h3>
      ) : (
        <div className="meeting-grid">
          {meetings.map((m) => (
            <div key={m._id} className="meeting-card">

              {/* PROPERTY IMAGE */}
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

              {/* PROPERTY INFO */}
              <div className="card-body">
                <p>
                  <FaMapMarkerAlt /> {m.propertyId?.location}
                </p>

                <p>
                  <strong>₹ {m.propertyId?.price}</strong>
                </p>

                <p>
                  <FaCalendarAlt /> {m.date}
                </p>

                <p>
                  <FaClock /> {m.time}
                </p>

                <p className="message">{m.message}</p>
              </div>

              {/* USER + BROKER SECTION */}
              <div className="people-box">

                {/* USER */}
                <div className="user-box">
                  <FaUser />
                  <div>
                    <h4>{m.userId?.name}</h4>
                    <p>{m.userId?.phone}</p>
                  </div>
                </div>

                {/* BROKER */}
                <div className="broker-box">
                  <FaUserTie />
                  <div>
                    <h4>{m.brokerId?.name}</h4>
                    <p>
                      <FaPhone /> {m.brokerId?.phone}
                    </p>
                  </div>
                </div>

              </div>

              {/* DELETE BUTTON */}
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