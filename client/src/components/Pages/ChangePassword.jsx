import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/css/ChangePassword.css";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="change-password-wrapper">
      <div className="change-password-card">
        <h2 className="title">Change Password</h2>
        <p className="subtitle">Update your account password securely</p>

        <form>
          
          <div className="input-group">
            <label>Current Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
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
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
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
