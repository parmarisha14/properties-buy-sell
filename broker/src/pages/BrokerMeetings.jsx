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
      const res = await axios.get(
        "http://localhost:5000/api/meeting/broker",
        { withCredentials: true }
      );
      setData(res.data.meetings || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMeeting = async (id) => {
    if (!window.confirm("Delete meeting?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/meeting/${id}`,
        { withCredentials: true }
      );
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN");

  const formatTime = (t) =>
    new Date(`1970-01-01T${t}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <h2 className="page-title"> My Meetings</h2>

        <div className="meeting-grid">

          {data.length === 0 ? (
            <p>No Meetings Found</p>
          ) : (

            data.map((m) => (

              <div className="meeting-card" key={m._id}>

                {/* IMAGE */}
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
                  <p>Location: {m.propertyId?.location}</p>

                  <hr />

                  <p>Date: {formatDate(m.date)}</p>
                  <p>Time: {formatTime(m.time)}</p>

                  <p className="message">Message: {m.message || "-"}</p>

                  <hr />

                  <div className="user-box">
                    <p><b>User:</b> {m.userId?.fullName}</p>
                    <p>{m.userId?.phone}</p>
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
                      <p>{m.brokerId?.name}</p>
                      <p>{m.brokerId?.phone}</p>
                    </div>
                  </div>

                  <span className={`status ${m.status}`}>
                    {m.status}
                  </span>

                  {/* ONLY DELETE */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteMeeting(m._id)}
                  >
                    Delete
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