import React from "react";
import "../STYLES/AdminTopbar.css";

const AdminTopbar = ({ setSidebarOpen }) => {
  return (
    <div className="admin-topbar">
      <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
        ☰
      </button>

      <div className="topbar-right">
        <span>V</span>FH
      </div>
    </div>
  );
};

export default AdminTopbar;