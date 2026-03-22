import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiUser, HiOfficeBuilding } from "react-icons/hi";
import "../../assets/css/Login.css";

axios.defaults.withCredentials = true;

const SignIn = () => {
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setMsg("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      if (!res.data || !res.data.user) {
        setMsg("Invalid login response");
        setLoading(false);
        return;
      }

      const user = res.data.user;

      setMsg("Login successful");

      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "http://localhost:5174/admin-dashboard";
        } else if (user.role === "broker") {
          window.location.href = "http://localhost:5175/dashboard";
        } else {
          window.location.href = "/";
        }
      }, 500);
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        if (err.response.status === 400) {
          setMsg(err.response.data.message || "Invalid credentials");
        } else if (err.response.status === 500) {
          setMsg("Server error. Try again.");
        } else {
          setMsg("Something went wrong");
        }
      } else {
        setMsg("Backend not running or network error");
      }
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
              color: msg === "Login successful" ? "green" : "red",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {msg}
          </p>
        )}

        <div className="role-toggle">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
            disabled={loading}
          >
            <HiUser /> User
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

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              disabled={loading}
              placeholder="Enter The Your Email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              disabled={loading}
              placeholder="Enter The Your Password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

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
