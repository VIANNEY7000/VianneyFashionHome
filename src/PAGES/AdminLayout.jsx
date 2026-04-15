import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../COMPONENTS/AdminSidebar";
import { FiMenu } from "react-icons/fi";
import "../STYLES/AdminDashboard.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="admin-main">
        <div className="admin-mobile-header">
          <button
            className="menu-toggle-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <h2>Admin Panel</h2>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;