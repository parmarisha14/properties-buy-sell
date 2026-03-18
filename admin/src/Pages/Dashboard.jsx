import React from "react";
import "../assets/css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <h3 className="dashboard-title">Admin Dashboard</h3>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="dashboard-card users-card">
            <h5>Total Users</h5>
            <h2>120</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card brokers-card">
            <h5>Total Brokers</h5>
            <h2>35</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card properties-card">
            <h5>Total Properties</h5>
            <h2>210</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card pending-card">
            <h5>Pending Properties</h5>
            <h2>18</h2>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;