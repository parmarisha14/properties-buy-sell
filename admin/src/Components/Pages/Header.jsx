import React from "react";
import logo from "../../assets/images/logo.png";
import { FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <nav className="navbar bg-white border-bottom fixed-top">

      <div className="container d-flex justify-content-between">

        <div className="d-flex align-items-center gap-2">

          <button
            className="btn d-lg-none"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>

          <img
            src={logo}
            alt="Logo"
            style={{ height: "60px" }}
          />

          <h5 className="mb-0 fw-bold" style={{ color: "#294666" }}>
            Property Buy & Sell
          </h5>

        </div>

      </div>

    </nav>
  );
};

export default Header;