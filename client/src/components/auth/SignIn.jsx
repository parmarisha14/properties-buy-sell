import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiUser, HiOfficeBuilding } from "react-icons/hi";
import "../../assets/css/Login.css";

axios.defaults.withCredentials = true;

const SignIn = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
          role
        },
        { withCredentials: true }
      );

      const user = res.data.user;

      if (!user) {
        setMsg("Invalid credentials");
        setLoading(false);
        return;
      }

      setMsg("Login successful");

      if (user.role === "broker") {
        window.location.href = "http://localhost:5175/dashboard";
      } else if (user.role === "admin") {
        window.location.href = "http://localhost:5173/admin/dashboard";
      } else {
        window.location.href = "http://localhost:5173/";
      }

    } catch (err) {
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

        <form className="login-form" onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <span className="error">{errors.password}</span>
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