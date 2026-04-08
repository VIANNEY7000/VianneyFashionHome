// /PAGES/CustomerLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../COMPONENTS/Customersidebar";
import { FiMenu } from "react-icons/fi";
import "../STYLES/CustomerLayout.css";

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="customer-dashboard">
      <CustomerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="customer-main">
        <div className="customer-mobile-header">
          <button
            className="menu-toggle-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <h2>Customer Panel</h2>
        </div>

        <div className="customer-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;