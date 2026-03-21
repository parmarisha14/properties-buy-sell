import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle,
  FaUserEdit,
  FaKey,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import "../../assets/Css/Header.css";
import logo from "../../assets/Images/logo.png";

axios.defaults.withCredentials = true;

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      if (res.data && res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Fetch user error:", error.response?.data || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setUser(null);
      window.location.href = "/signin";
    }
  };

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

            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/terms">
                Terms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/privacy">
                Privacy
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!user && !loading && (
              <NavLink to="/signin" className="get-started-btn">
                Get Started
              </NavLink>
            )}

            {user && (
              <>
                <NavLink to="/wishlist" className="wishlist-icon ms-2">
                  <FaHeart size={18} />
                </NavLink>

                <div className="dropdown d-flex align-items-center">
                  <button
                    className="profile-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <FaUserCircle size={32} />
                  </button>

                  <span className="fw-bold fs-6 text-dark ms-2">
                    Hi, {user?.fullName || user?.name || "User"}
                  </span>

                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                      <NavLink className="dropdown-item" to="/profile">
                        <FaUserEdit className="me-2" />
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="/change-password">
                        <FaKey className="me-2" />
                        Change Password
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="/wishlist">
                        <FaHeart className="me-2 text-danger" />
                        Wishlist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/my-requests">
                        <FaHeart className="me-2 text-dark" />
                        PropertyList 
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

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
