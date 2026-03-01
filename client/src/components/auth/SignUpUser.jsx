import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Single handleChange for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (formData.password !== formData.confirmPassword) {
      return setMsg("Passwords do not match ❌");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        dob: formData.dob,
        phone: formData.phone,
        password: formData.password,
      });

      setMsg("Registration Successful ✅");

      setTimeout(() => {
        navigate("/signin");
      }, 1200);

    } catch (error) {
      setMsg(error.response?.data?.message || "Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="register-card w-50">
        <h3 className="signup-title">Create Your Account</h3>

        {msg && (
          <p style={{ color: msg.includes("Successful") ? "green" : "red" }}>
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;