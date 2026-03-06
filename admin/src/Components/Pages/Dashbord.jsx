import React from "react";
import AdminLayout from "./AdminLayout";

const Dashboard = () => {

  return (
   

      <div className="container-fluid">

        <h3 className="mb-4 fw-bold">Admin Dashboard</h3>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Total Users</h5>
                <h2 className="text-primary">120</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Total Brokers</h5>
                <h2 className="text-success">35</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Total Properties</h5>
                <h2 className="text-warning">210</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Pending Properties</h5>
                <h2 className="text-danger">18</h2>
              </div>
            </div>
          </div>

        </div>

      </div>

   
  );
};

export default Dashboard;