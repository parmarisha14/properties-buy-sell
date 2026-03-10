import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  FaTachometerAlt, FaPlusCircle, FaHome,
  FaCalendarCheck, FaEnvelope, FaUser,
  FaUserEdit, FaKey, FaSignOutAlt
} from "react-icons/fa";
import "../assets/Css/Sidebar.css"


axios.defaults.withCredentials = true;

const Sidebar = () => {
  const [broker, setBroker] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchBroker = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      if (res.data && res.data.role === "broker") setBroker(res.data);
      else setBroker(null);
    } catch (err) {
      console.error("Fetch broker error:", err);
      setBroker(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBroker();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      setBroker(null);
      window.location.href = "http://localhost:5173/signin"; // back to public login
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) return <div className="sidebar">Loading...</div>;

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Broker Panel</h3>

      {/* Profile */}
      {broker && (
        <div className="sidebar-profile">
          
          <h4>{broker.name}</h4>
          <p>{broker.email}</p>
        </div>
      )}

      {/* Menu */}
      <ul className="sidebar-menu">
        {broker ? (
          <>
            <li><NavLink to="/dashboard"><FaTachometerAlt /> Dashboard</NavLink></li>
            <li><NavLink to="/add"><FaPlusCircle /> Add Property</NavLink></li>
            <li><NavLink to="/manage"><FaHome /> Manage Property</NavLink></li>
            <li><NavLink to="/booking"><FaCalendarCheck /> Bookings</NavLink></li>
            <li><NavLink to="/inquiry"><FaEnvelope /> Inquiries</NavLink></li>

            <li className="sidebar-divider">Account</li>
            <li><NavLink to="/profile"><FaUser /> Profile</NavLink></li>
            <li><NavLink to="/edit-profile"><FaUserEdit /> Edit Profile</NavLink></li>
            <li><NavLink to="/change-password"><FaKey /> Change Password</NavLink></li>
            <li><button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button></li>
          </>
        ) : (
          <>
            <li>Please login from public site</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;