import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiUser, HiOfficeBuilding } from "react-icons/hi";
import "../../assets/css/Login.css";

// Allow cookies for cross-origin requests
axios.defaults.withCredentials = true;

const SignIn = () => {
  const [role, setRole] = useState("user"); // user/admin or broker
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      // ✅ Login request with credentials for session cookie
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, role },
        { withCredentials: true } // MUST to save session
      );

      const user = res.data.user;

      if (!user) {
        setMsg("Invalid credentials");
        setLoading(false);
        return;
      }

      setMsg("Login successful");

      // SignIn.jsx
if (user.role === "broker") {
  // Broker dashboard runs on 5175
  window.location.href = "http://localhost:5175/dashboard";
} else if (user.role === "admin") {
  // Admin dashboard runs on 5173
  window.location.href = "http://localhost:5173/admin/dashboard";
} else {
  // Normal user stays in public app
  window.location.href = "http://localhost:5173/";
}

    } catch (err) {
      console.error("Login error:", err);
      setMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue</p>

        {msg && (
          <p
            style={{
              color: msg.includes("successful") ? "green" : "red",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {msg}
          </p>
        )}

        {/* Role toggle */}
        <div className="role-toggle">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
            disabled={loading}
          >
            <HiUser /> User/Admin
          </button>

          <button
            type="button"
            className={role === "broker" ? "active" : ""}
            onClick={() => setRole("broker")}
            disabled={loading}
          >
            <HiOfficeBuilding /> Broker
          </button>
        </div>

        {/* Login form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to={role === "user" ? "/signup-user" : "/signup-broker"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;