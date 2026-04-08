import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingCart, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { CiShop } from "react-icons/ci";
import "../STYLES/CustomerSidebar.css";

const CustomerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
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

      <div className={`customer-sidebar ${sidebarOpen ? "show-sidebar" : ""}`}>
        <div className="sidebar-header">
          <h2>My Dashboard</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ✖
          </button>
        </div>

        <ul className="sidebar-links">
          <li>
            <NavLink
              to="/customer/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiHome style={{ marginRight: "12px" }} />
              Dashboard
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/shop"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <CiShop style={{ marginRight: "12px" }} />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer/orders"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiShoppingCart style={{ marginRight: "12px" }} />
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer/wishlist"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiHeart style={{ marginRight: "12px" }} />
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer/profile"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FiUser style={{ marginRight: "12px" }} />
              Profile
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

export default CustomerSidebar;