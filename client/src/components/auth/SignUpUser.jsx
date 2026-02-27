import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/Signup.css";

const Signup = () => {

  const navigate = useNavigate();

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const dob = e.target.dob.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      return setMsg("Passwords do not match ❌");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName,
          email,
          dob,
          phone,
          password
        }
      );

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (error) {
      setMsg("Registration Failed ❌");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="register-card w-50">
        <h3 className="signup-title">Create Your Account</h3>

        {msg && <p style={{ color: "red" }}>{msg}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-row">
            <input type="date" name="dob" required />

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            Sign Up
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