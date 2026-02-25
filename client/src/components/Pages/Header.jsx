import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/Css/Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        <NavLink className="navbar-brand brand-logo" to="/">
          TheProperty
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
          className="collapse navbar-collapse justify-content-center"
          id="navbarMenu"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 nav-links">
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
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle custom-link"
                href="#"
                id="legalDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Legal
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-white" >
                <li>
                  <NavLink className="dropdown-item" to="/terms">
                    Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item bg-none" to="/privacy">
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          
          <div className="ms-lg-4 mt-3 mt-lg-0">
            <NavLink to="/register" className="get-started-btn">
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
