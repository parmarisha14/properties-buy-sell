import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../assets/css/BrokerMeetings.css";

const BrokerMeetings = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/meeting/broker",
      { withCredentials: true }
    );
    setData(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/meeting/status/${id}`,
      { status },
      { withCredentials: true }
    );
    fetchData();
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <h2 className="page-title">📅 My Meetings</h2>

        <div className="meeting-grid">

          {data.length === 0 ? (
            <p className="empty">No Meetings Found</p>
          ) : (

            data.map((m) => (

              <div className="meeting-card" key={m._id}>

                <div className="card-header">
                  <h3>{m.propertyId?.name}</h3>
                  <span className={`status ${m.status}`}>
                    {m.status}
                  </span>
                </div>

                <div className="card-body">
                  <p><strong>Date:</strong> {m.date}</p>
                  <p><strong>Time:</strong> {m.time}</p>
                  <p><strong>User:</strong> {m.userId?.fullName}</p>
                  <p><strong>Phone:</strong> {m.phone}</p>
                </div>

                <div className="card-actions">

                  <button
                    className="confirm"
                    onClick={() => updateStatus(m._id, "confirmed")}
                  >
                    Confirm
                  </button>

                  <button
                    className="cancel"
                    onClick={() => updateStatus(m._id, "cancelled")}
                  >
                    Cancel
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