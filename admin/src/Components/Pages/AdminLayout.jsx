import React, { useState } from "react";
import Header from "../Pages/Header";
import Sidebar from "../Pages/SlideBar";
import "../../assets/css/Sidebar.css";

const AdminLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Sidebar
        isOpen={isOpen}
        closeSidebar={closeSidebar}
        handleLogout={handleLogout}
      />

      <div className="main-content">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;