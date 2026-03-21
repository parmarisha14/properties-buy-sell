import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../assets/css/AddMeeting.css";

const AddMeeting = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const inquiry = state?.inquiry;

  const [form, setForm] = useState({
    date: "",
    time: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/meeting/create",
      {
        propertyId: inquiry.propertyId._id,
        userId: inquiry.userId._id,
        name: inquiry.userId.fullName,
        phone: inquiry.userId.phone,
        date: form.date,
        time: form.time,
        message: form.message
      },
      { withCredentials: true }
    );

    alert("Meeting Created ✅");
    navigate("/broker/meetings");
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <div className="meeting-card">

          <h2 className="page-title">📅 Schedule Meeting</h2>

          <div className="info-box">
            <p><strong>User:</strong> {inquiry?.userId?.fullName}</p>
            <p><strong>Property:</strong> {inquiry?.propertyId?.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="meeting-form">

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                required
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                required
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Enter meeting details..."
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-btn">
              Create Meeting
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AddMeeting;