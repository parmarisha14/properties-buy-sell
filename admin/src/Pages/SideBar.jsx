import React from "react";
import { NavLink } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import {
  FaUsers,
  FaUserTie,
  FaKey,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import "../assets/css/Sidebar.css";

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Admin Panel</h4>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin-dashboard" className="sidebar-link">
            <MdDashboard className="icon" /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/view-users" className="sidebar-link">
            <FaUsers className="icon" /> View Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/view-brokers" className="sidebar-link">
            <FaUserTie className="icon" /> View Brokers
          </NavLink>
        </li>

        <li>
          <NavLink to="/view-properties" className="sidebar-link">
            <FaHome className="icon" /> View Properties
          </NavLink>
        </li>
      <li>
          <NavLink to="/contact-messages" className="sidebar-link">
            <FaHome className="icon" /> View Messages
          </NavLink>
        </li>
         <li>
          <NavLink to="/admin/inquiries" className="sidebar-link">
            <FaHome className="icon" /> View Inquiries
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/meetings" className="sidebar-link">
            <FaHome className="icon" /> View Meetings
          </NavLink>
        </li>

        <li>
          <NavLink to="/change-password" className="sidebar-link">
            <FaKey className="icon" /> Change Password
          </NavLink>
        </li>

        <li className="logout-btn">
          <button onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
