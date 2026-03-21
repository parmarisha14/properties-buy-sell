import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminCard.css";

const AdminMeetings = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/meeting/admin", {
      withCredentials: true
    }).then(res => setData(res.data.meetings));
  }, []);

  return (
    <div className="broker-wrapper">

      <h2 className="page-title">All Meetings</h2>

      <div className="broker-grid">

        {data.map((m) => (

          <div className="broker-card" key={m._id}>

            <img
              className="broker-img"
              src={
                m.propertyId?.image
                  ? `http://localhost:5000/uploads/properties/${m.propertyId.image}`
                  : "/default-property.jpg"
              }
            />

            <div className="broker-body">

              <h3>{m.propertyId?.name}</h3>
              <p className="agency">₹ {m.propertyId?.price}</p>

              <p className="broker-info">📅 {m.date} | {m.time}</p>

              <hr />

              <p><strong>User:</strong> {m.userId?.fullName}</p>
              <p>{m.userId?.phone}</p>

              <p><strong>Broker:</strong> {m.brokerId?.name}</p>

              <p><strong>Status:</strong>
                <span className={`status ${m.status}`}>
                  {m.status}
                </span>
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default AdminMeetings;