import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/ChangePassword.css";

axios.defaults.withCredentials = true;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword)
      return alert("Passwords do not match");
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
      );
      alert(res.data.message);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="change-password-wrapper">
      <div className="change-password-card">
        <h2 className="title">Change Password</h2>
        <p className="subtitle">Update your account password securely</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Current Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>New Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="change-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
