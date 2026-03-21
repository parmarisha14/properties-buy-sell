import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Dashboard.css";

const Dashboard = () => {

  const [data, setData] = useState({
    totalUsers: 0,
    totalBrokers: 0,
    totalProperties: 0,
    pendingProperties: 0,
    approvedProperties: 0,
    rejectedProperties: 0,
    totalInquiries: 0,
    approvedInquiries: 0,
    rejectedInquiries: 0,
    pendingInquiries: 0,
    totalMeetings: 0,
    confirmedMeetings: 0,
    cancelledMeetings: 0,
    pendingMeetings: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        { withCredentials: true }
      );
      setData(res.data);
    } catch (err) {
      console.log("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard-container">

      <h3 className="dashboard-title">Admin Dashboard</h3>

      <div className="row g-4">

        {/* USERS */}
        <div className="col-md-3">
          <div className="dashboard-card users-card">
            <h5>Total Users</h5>
            <h2>{data.totalUsers}</h2>
          </div>
        </div>

        {/* BROKERS */}
        <div className="col-md-3">
          <div className="dashboard-card brokers-card">
            <h5>Total Brokers</h5>
            <h2>{data.totalBrokers}</h2>
          </div>
        </div>

        {/* PROPERTIES */}
        <div className="col-md-3">
          <div className="dashboard-card properties-card">
            <h5>Total Properties</h5>
            <h2>{data.totalProperties}</h2>
          </div>
        </div>

        {/* PENDING PROPERTY */}
        <div className="col-md-3">
          <div className="dashboard-card pending-card">
            <h5>Pending Properties</h5>
            <h2>{data.pendingProperties}</h2>
          </div>
        </div>

        {/* APPROVED PROPERTY */}
        <div className="col-md-3">
          <div className="dashboard-card approved-card">
            <h5>Approved Properties</h5>
            <h2>{data.approvedProperties}</h2>
          </div>
        </div>

        {/* REJECTED PROPERTY */}
        <div className="col-md-3">
          <div className="dashboard-card rejected-card">
            <h5>Rejected Properties</h5>
            <h2>{data.rejectedProperties}</h2>
          </div>
        </div>

        {/* INQUIRIES */}
        <div className="col-md-3">
          <div className="dashboard-card inquiry-card">
            <h5>Total Inquiries</h5>
            <h2>{data.totalInquiries}</h2>
          </div>
        </div>

        {/* APPROVED INQUIRY */}
        <div className="col-md-3">
          <div className="dashboard-card approved-card">
            <h5>Approved Requests</h5>
            <h2>{data.approvedInquiries}</h2>
          </div>
        </div>

        {/* REJECTED INQUIRY */}
        <div className="col-md-3">
          <div className="dashboard-card rejected-card">
            <h5>Rejected Requests</h5>
            <h2>{data.rejectedInquiries}</h2>
          </div>
        </div>

        {/* MEETINGS */}
        <div className="col-md-3">
          <div className="dashboard-card meeting-card">
            <h5>Total Meetings</h5>
            <h2>{data.totalMeetings}</h2>
          </div>
        </div>

        {/* CONFIRMED */}
        <div className="col-md-3">
          <div className="dashboard-card confirm-card">
            <h5>Confirmed Meetings</h5>
            <h2>{data.confirmedMeetings}</h2>
          </div>
        </div>

        {/* CANCELLED */}
        <div className="col-md-3">
          <div className="dashboard-card cancel-card">
            <h5>Cancelled Meetings</h5>
            <h2>{data.cancelledMeetings}</h2>
          </div>
        </div>

        {/* PENDING MEETING */}
        <div className="col-md-3">
          <div className="dashboard-card pending-meeting">
            <h5>Pending Meetings</h5>
            <h2>{data.pendingMeetings}</h2>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;