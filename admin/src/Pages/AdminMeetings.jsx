import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminMeeting.css";

const AdminMeetings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/meeting/admin",
        {
          withCredentials: true,
        }
      );
      setData(res.data.meetings || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load meetings");
    }
    setLoading(false);
  };

  const deleteMeeting = async (id) => {
    const confirmDelete = window.confirm("Delete this meeting?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/meeting/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Unauthorized or server error"
      );
    }
  };

  return (
    <div className="admin-wrapper">
      <h2 className="page-title">All Meetings</h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : data.length === 0 ? (
        <h3>No Meetings Found</h3>
      ) : (
        <div className="admin-grid">
          {data.map((m) => (
            <div className="admin-card" key={m._id}>
              <img
                className="property-img"
                src={
                  m.propertyId?.image
                    ? `http://localhost:5000/uploads/properties/${m.propertyId.image}`
                    : "/default-property.jpg"
                }
                alt=""
              />

              <div className="card-body">
                <h3>{m.propertyId?.name}</h3>
                <p className="price">₹ {m.propertyId?.price}</p>
                <p className="location">{m.propertyId?.location}</p>

                <div className="date-time">
                  <p>Date: {m.date}</p>
                  <p>Time: {m.time}</p>
                  <p>Message: {m.message || "No message"}</p>
                </div>

                <div className="person-box">
                  <img
                    src={
                      m.userId?.profileImage
                        ? `http://localhost:5000/uploads/users/${m.userId.profileImage}`
                        : "/default-user.png"
                    }
                    alt=""
                  />
                  <div>
                    <h4>{m.userId?.fullName}</h4>
                    <p>{m.userId?.phone}</p>
                    <p>{m.userId?.email}</p>
                  </div>
                </div>

                <div className="person-box">
                  <img
                    src={
                      m.brokerId?.brokerImage
                        ? `http://localhost:5000/uploads/users/${m.brokerId.brokerImage}`
                        : "/default-user.png"
                    }
                    alt=""
                  />
                  <div>
                    <h4>{m.brokerId?.name}</h4>
                    <p>{m.brokerId?.phone}</p>
                    <p>{m.brokerId?.email}</p>
                  </div>
                </div>

                <div className={`status ${m.status}`}>
                  {m.status || "pending"}
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteMeeting(m._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMeetings;