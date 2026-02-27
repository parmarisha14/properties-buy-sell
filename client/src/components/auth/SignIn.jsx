import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiUser, HiOfficeBuilding } from "react-icons/hi";
import "../../assets/css/Login.css";

const SignIn = () => {
  const [role, setRole] = useState("user");

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to continue to Sell & Buy Home
        </p>

        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            <HiUser /> User
          </button>

          <button
            type="button"
            className={role === "broker" ? "active" : ""}
            onClick={() => setRole("broker")}
          >
            <HiOfficeBuilding /> Broker
          </button>
        </div>

        {/* Form */}
        <form className="login-form">
          
          <div className="form-group">
            <label>Email </label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* Google Login Only for User */}
        {role === "user" && (
          <>
            <div className="divider text-center">OR</div>

            <button className="google-btn">
              <FcGoogle size={20} />
              Sign in with Google
            </button>
          </>
        )}

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