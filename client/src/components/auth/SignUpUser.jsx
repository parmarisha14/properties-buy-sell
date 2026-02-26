import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Signup.css";

const Signup = () => {
  return (
    <div className="signup-wrapper">
      <div className="register-card w-50">
        <h3 className="signup-title">Create Your Account</h3>

        <form>
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