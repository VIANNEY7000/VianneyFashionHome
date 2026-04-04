import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import "../STYLES/AdminSidbar.css";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show-overlay" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div className={`admin-sidebar ${sidebarOpen ? "show-sidebar" : ""}`}>
        <div className="sidebar-header">
          <h2>Vianney Admin</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ✖
          </button>
        </div>

        <ul className="sidebar-links">
          <li>
            <NavLink
              to="/admin/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiHome style={{ marginRight: "12px" }} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/products"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiBox style={{ marginRight: "12px" }} />
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/categories"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiGrid style={{ marginRight: "12px" }} />
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/orders"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiShoppingCart style={{ marginRight: "12px" }} />
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/customers"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiUsers style={{ marginRight: "12px" }} />
              Customers
            </NavLink>
          </li>

          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut style={{ marginRight: "12px" }} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;