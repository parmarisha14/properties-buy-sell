import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import ManageProperty from "./pages/ManageProperty";
import EditProperty from "./pages/EditProperty";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

// ✅ NEW IMPORT (BROKER INQUIRIES)
import BrokerInquiries from "./pages/BrokerInquiries";

const App = () => {
  return (
    <>
      <Sidebar />

      <Routes>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-property/:id"
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* ✅ NEW ROUTE (BROKER INQUIRIES) */}
        <Route
          path="/dashboard/inquiries"
          element={
            <ProtectedRoute>
              <BrokerInquiries />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

      </Routes>

      <Footer />
    </>
  );
};

export default App;