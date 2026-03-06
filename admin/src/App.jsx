import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Pages/Dashbord";
import AdminLayout from "./Components/Pages/AdminLayout";
import ViewUsers from "./Components/Pages/ViewUsers";

function App() {
  return (
    
      <AdminLayout>
        <Routes>

       
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/view-users" element={<ViewUsers />} />
      </Routes>
      </AdminLayout>
    
  );
}

export default App;