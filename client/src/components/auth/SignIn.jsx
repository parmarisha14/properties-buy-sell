import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { HiUser, HiOfficeBuilding } from "react-icons/hi";
import "../../assets/css/Login.css";

const SignIn = () => {
  const [role, setRole] = useState("user"); 
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password } 
      );

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("Login Successful ");

      
      setTimeout(() => {
        if (res.data.role === "admin") {
            window.location.href = "http://localhost:5174/admin-dashboard";
        } 
        else if (res.data.role === "broker") {
           window.location.href = "http://localhost:5175/broker-dashboard";
        } 
        else {
          navigate("/");
        }
      }, 800);

    } catch (error) {
      setMsg(error.message || "Login Failed ");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to continue to Sell & Buy Home
        </p>

        {msg && (
          <p style={{ color: msg.includes("Successful") ? "green" : "red" }}>
            {msg}
          </p>
        )}

       
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

       
        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

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