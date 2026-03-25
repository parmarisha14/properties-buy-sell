import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Pages/SideBar";

import Dashboard from "./Pages/Dashboard";
import ViewUsers from "./Pages/ViewUsers";
import ViewBrokers from "./Pages/ViewBrokers";
import ViewProperties from "./Pages/ViewProperties";
import AdminChangePassword from "./Pages/AdminChangePassword";
import ViewMessage from "./Pages/ViewMessage";
import AdminInquiries from "./Pages/AdminInquiries";
import AdminMeetings from "./Pages/AdminMeetings";

import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "http://localhost:5173/signin";
  };

  return (
    <div className="d-flex">
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
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
                  <Route
                    path="/change-password"
                    element={<AdminChangePassword />}
                  />
                  <Route path="/contact-messages" element={<ViewMessage />} />
                  <Route path="/admin/inquiries" element={<AdminInquiries />} />
                  <Route path="/admin/meetings" element={<AdminMeetings />} />
                  <Route
                    path="*"
                    element={<Navigate to="/admin-dashboard" />}
                  />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
