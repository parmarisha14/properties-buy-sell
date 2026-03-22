import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminMeeting.css";

const AdminMeetings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meeting/admin", {
        withCredentials: true,
      });
      setData(res.data.meetings || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-wrapper">
      <h2 className="page-title">All Meetings</h2>

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

              <div className="date-time d-flex flex-column ">
                <h5>Date: {m.date}</h5>
                <h5>Time: {m.time}</h5>
                <h5>Message: {m.message}</h5>
              </div>

              <hr />

              <div className="person-box">
                <img
                  src={
                    m.userId?.profileImage
                      ? `http://localhost:5000/uploads/users/${m.userId.profileImage}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                />
                <div>
                  <h4>{m.userId?.fullName}</h4>
                  <p>{m.userId?.phone}</p>
                  <p className="email">{m.userId?.email}</p>
                </div>
              </div>

              <div className="person-box">
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
                  <p>{m.brokerId?.phone}</p>
                  <p className="email">{m.brokerId?.email}</p>
                </div>
              </div>

              <div className={`status ${m.status}`}>{m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMeetings;
