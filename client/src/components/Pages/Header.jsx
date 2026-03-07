import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaUserEdit, FaKey, FaSignOutAlt, FaHeart } from "react-icons/fa";
import "../../assets/Css/Header.css";
import logo from "../../assets/Images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // ✅ Listen for storage changes (multi-tab login)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        try {
          setUser(JSON.parse(updatedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        <NavLink className="navbar-brand brand-logo" to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarMenu">
          <ul className="navbar-nav mb-2 mb-lg-0 nav-links mx-auto">
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/properties">Properties</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/services">Services</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/agents">Agents</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link custom-link" to="/contact">Contact</NavLink></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!user && (
              <NavLink to="/signin" className="get-started-btn">Get Started</NavLink>
            )}

            {user && (
              <>
                <NavLink to="/wishlist" className="wishlist-icon"><FaHeart size={18} /></NavLink>

                <div className="dropdown d-flex align-items-center">
                  <button className="btn profile-btn" type="button" data-bs-toggle="dropdown">
                    <FaUserCircle size={32} />
                  </button>

                  <span className="fw-bold fs-6 text-dark ms-2">
                    Hi, {user?.fullName || "User"}
                  </span>

                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li><NavLink className="dropdown-item" to="/profile"><FaUserEdit className="me-2" />Profile</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/edit-profile"><FaUserEdit className="me-2" />Edit Profile</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/wishlist"><FaHeart className="me-2 text-danger" />Wishlist</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/change-password"><FaKey className="me-2" />Change Password</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><FaSignOutAlt className="me-2" />Logout</button></li>
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