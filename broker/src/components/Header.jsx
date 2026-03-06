import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaUserEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import "../assets/Css/Header.css";

const BrokerHeader = () => {

  const navigate = useNavigate();
  const broker = JSON.parse(localStorage.getItem("broker"));

  const handleLogout = () => {
    localStorage.removeItem("broker");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg broker-navbar sticky-top">
      <div className="container">

        {/* Logo / Brand */}
        <NavLink className="navbar-brand broker-logo" to="/">
          TheProperty Broker
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarMenu">

          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto nav-menu">

            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="/">Dashboard</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="/add">Add Property</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="/manage">Manage Property</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="/booking">Bookings</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="/inquiry">Inquiries</NavLink>
            </li>

          </ul>

          {/* Broker Profile */}
          {broker && (
            <div className="d-flex align-items-center broker-profile">

              <FaUserCircle size={32} className="profile-icon" />

              <span className="broker-name">
                {broker.fullName}
              </span>

              <div className="dropdown">

                <button
                  className="btn dropdown-toggle profile-dropdown-btn"
                  data-bs-toggle="dropdown"
                >
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow">

                  <li>
                    <NavLink className="dropdown-item" to="/profile">
                      <FaUserEdit className="me-2"/> Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" to="/edit-profile">
                      <FaUserEdit className="me-2"/> Edit Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" to="/change-password">
                      <FaKey className="me-2"/> Change Password
                    </NavLink>
                  </li>

                  <li><hr className="dropdown-divider"/></li>

                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <FaSignOutAlt className="me-2"/> Logout
                    </button>
                  </li>

                </ul>

              </div>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default BrokerHeader;