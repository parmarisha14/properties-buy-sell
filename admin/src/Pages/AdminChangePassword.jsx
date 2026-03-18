import axios from "axios";
import React, { useState } from "react";
import "../assets/Css/ChangePassword.css";

axios.defaults.withCredentials = true;

const AdminChangePassword = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/change-password", // 🔹 admin route
        {
          currentPassword,
          newPassword
        },
        {
          withCredentials: true
        }
      );

      alert(res.data.message || "Admin password changed successfully");

      // 🔹 Clear fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Admin Change Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">
          Change Password
        </button>

      </form>
    </div>
  );
};

export default AdminChangePassword;