import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaUserEdit,
  FaKey,
  FaSignOutAlt
} from "react-icons/fa";

import "../../assets/Css/Header.css";
import logo from "../../assets/Images/logo.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
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
              <NavLink className="nav-link custom-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/properties">
                Properties
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/services">
                Services
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/agents">
                Agents
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/blog">
                Blog
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/contact">
                Contact
              </NavLink>
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

          {/* Right Side (Same Get Started + Profile Icon Added) */}
          <div className="d-flex align-items-center gap-3">

            <NavLink to="/signin" className="get-started-btn">
              Get Started
            </NavLink>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn profile-btn"
                type="button"
                data-bs-toggle="dropdown"
              >
                <FaUserCircle size={28} />
              </button>

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
                  <button className="dropdown-item text-danger">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;