import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Login.css";
import logo from "../../assets/images/logo.jpg";

const SignIn = () => {
  const [role, setRole] = useState("user");

  return (
    <div className="login-page">
      <div className="login-card text-center">

        {/* Logo */}
        <div className="logo-circle">
          <img src={logo} alt="Logo" className="login-logo-img" />
        </div>

        {/* Title */}
        <h4 className="title">Welcome Back</h4>
        <p className="subtitle">
          Login to your account to continue
        </p>

        {/* Role Selection Buttons */}
        <div className="role-buttons">
          <button
            type="button"
            className={`role-btn ${role === "user" ? "active-role" : ""}`}
            onClick={() => setRole("user")}
          >
            User Login
          </button>

          <button
            type="button"
            className={`role-btn ${role === "broker" ? "active-role" : ""}`}
            onClick={() => setRole("broker")}
          >
            Broker Login
          </button>
        </div>

        {/* Login Form */}
        <form className="login-form">
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            required
          />

          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* Google Login Only for USER */}
        {role === "user" && (
          <>
            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="google-btn">
              <i className="fa-brands fa-google"></i>
              Sign in with Google
            </button>
          </>
        )}

        {/* Dynamic Signup Link */}
        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to={role === "user" ? "/signup-user" : "/signup-broker"}>
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignIn;