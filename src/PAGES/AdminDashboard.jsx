import React from "react";
import AdminDashboardCards from "../COMPONENTS/AdminDashboardCards";

const AdminDashboard = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <p>Welcome back, Admin 👋</p>

      <AdminDashboardCards />

      <div className="admin-recent-section">
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <p>No recent orders yet.</p>
        </div>

        <div className="low-stock">
          <h2>Low Stock Products</h2>
          <p>No low stock alerts.</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;