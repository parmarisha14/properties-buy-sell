import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Pages/SideBar";

import Dashboard from "./Pages/Dashboard";
import ViewUsers from "./Pages/ViewUsers";
import ViewBrokers from "./Pages/ViewBrokers";
import ViewProperties from "./Pages/ViewProperties";
import AdminChangePassword from "./Pages/AdminChangePassword";
import ViewMessage from "./Pages/ViewMessage";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="d-flex">
      <Sidebar
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
        handleLogout={handleLogout}
      />

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/admin-dashboard" element={<Dashboard />} />

          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/view-brokers" element={<ViewBrokers />} />
          <Route path="/view-properties" element={<ViewProperties />} />

          <Route path="/change-password" element={<AdminChangePassword />} />
          <Route path="/contact-messages" element={<ViewMessage />} />
          <Route path="/" element={<ViewProperties />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
