import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaPlusCircle, FaHome, FaKey, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ handleLogout, isOpen, closeSidebar }) => {

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      <div className={`sidebar mt-5 text-white p-3 ${isOpen ? "show" : ""}`}>

        <ul className="nav flex-column gap-3 mt-5">

          <li className="nav-item">
            <NavLink
              className="nav-link sidebar-link d-flex align-items-center gap-2"
              to="/admin-dashboard"
              onClick={closeSidebar}
            >
              <MdDashboard size={22} />
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link sidebar-link d-flex align-items-center gap-2"
              to="/view-users"
              onClick={closeSidebar}
            >
              <FaPlusCircle size={20} />
              View Users
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link sidebar-link d-flex align-items-center gap-2"
              to="/my-properties"
              onClick={closeSidebar}
            >
              <FaHome size={20} />
              My Properties
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link sidebar-link d-flex align-items-center gap-2"
              to="/change-password"
              onClick={closeSidebar}
            >
              <FaKey size={20} />
              Change Password
            </NavLink>
          </li>

          <li className="nav-item mt-auto">
            <button
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>

        </ul>

      </div>
    </>
  );
};

export default Sidebar;