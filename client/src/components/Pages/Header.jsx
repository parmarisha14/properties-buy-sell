import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUserEdit,
  FaKey,
  FaSignOutAlt
} from "react-icons/fa";

import "../../assets/Css/Header.css";
import logo from "../../assets/Images/logo.png";

const Header = () => {

  const navigate = useNavigate();

  // ✅ Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    window.location.reload(); // refresh navbar
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand brand-logo" to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarMenu"
        >

          {/* Center Nav Links */}
          <ul className="navbar-nav mb-2 mb-lg-0 nav-links mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/properties">Properties</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/services">Services</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/agents">Agents</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/blog">Blog</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/contact">Contact</NavLink>
            </li>

            {/* Legal Dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle custom-link"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Legal
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-white">
                <li>
                  <NavLink className="dropdown-item" to="/terms">
                    Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/privacy">
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">

            {/* ❌ Show only if NOT logged in */}
            {!user && (
              <NavLink to="/signin" className="get-started-btn">
                Get Started
              </NavLink>
            )}

            {/* ✅ Show only if logged in */}
            {user && (
              <>
               

                {/* Profile Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn profile-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <FaUserCircle size={28} />
                  </button>
                   {/* User Name */}
                <span className="fw-bold  fs-6 text-dark">
                  Hii, {user.fullName}
                </span>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                      <NavLink className="dropdown-item" to="/edit-profile">
                        <FaUserEdit className="me-2" />
                        Edit Profile
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="/change-password">
                        <FaKey className="me-2" />
                        Change Password
                      </NavLink>
                    </li>

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="me-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;