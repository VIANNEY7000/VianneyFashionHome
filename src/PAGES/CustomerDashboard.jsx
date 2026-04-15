import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiPackage, FiShoppingBag, FiUser } from "react-icons/fi";
import { CartContext } from "../CONTEXT/CartContext";
import "../STYLES/CustomerDashboard.css";

const API = import.meta.env.VITE_PRODUCT_API || "https://vfhome-backend2-3.onrender.com";

const CustomerDashboard = () => {
  const { cartCount } = useContext(CartContext);
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "Customer",
    email: localStorage.getItem("userEmail") || "",
    role: localStorage.getItem("role") || "customer",
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const savedName = localStorage.getItem("userName");
      const savedEmail = localStorage.getItem("userEmail");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [profileRes, ordersRes] = await Promise.allSettled([
          axios.get(`${API}/api/auth/protected`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API}/api/orders/my-orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (profileRes.status === "fulfilled") {
          const profileData =
            profileRes.value.data?.user ||
            profileRes.value.data?.data ||
            profileRes.value.data;

          setUser((prev) => ({
            ...prev,
            name: profileData?.name || savedName || prev.name,
            email: profileData?.email || savedEmail || prev.email,
            role: profileData?.role || prev.role,
          }));
        }

        if (ordersRes.status === "fulfilled") {
          setOrders(ordersRes.value.data?.orders || []);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [cartCount]);

  const recentOrders = orders.slice(0, 3);
  const lastOrder = orders[0];
  const pendingOrders = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "pending"
  ).length;

  const summaryCards = [
    {
      title: "My Orders",
      value: orders.length,
      note: "Track every purchase in one place",
      icon: <FiPackage />,
    },
    {
      title: "Cart Items",
      value: cartCount,
      note: "Ready for checkout whenever you are",
      icon: <FiShoppingBag />,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      note: "Orders currently being processed",
      icon: <FiArrowRight />,
    },
    {
      title: "Wishlist",
      value: 0,
      note: "Save your favorite pieces for later",
      icon: <FiHeart />,
      muted: true,
    },
  ];

  const quickLinks = [
    {
      title: "View Orders",
      text: "Check status, delivery progress, and past purchases.",
      to: "/customer/orders",
    },
    {
      title: "Edit Profile",
      text: "Review your account details and personal information.",
      to: "/customer/profile",
    },
    {
      title: "Go To Shop",
      text: "Browse new arrivals and continue shopping quickly.",
      to: "/customer/shop",
    },
  ];

  if (loading) {
    return <div className="customer-dashboard-page">Loading dashboard...</div>;
  }

  return (
    <div className="customer-dashboard-page">
      <section className="customer-hero">
        <div className="hero-copy">
          <span className="hero-badge">Customer Dashboard</span>
          <h1>Welcome back, {user.name || "Customer"}</h1>
          <p>
            Keep track of your orders, manage your profile, and jump back into
            shopping from one simple dashboard.
          </p>

          <div className="hero-meta">
            <div className="hero-meta-card">
              <span>Email</span>
              <strong>{user.email || "No email available"}</strong>
            </div>
            <div className="hero-meta-card">
              <span>Latest Order</span>
              <strong>{lastOrder ? lastOrder.orderStatus : "No orders yet"}</strong>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-top">
            <FiUser />
            <span>Account Snapshot</span>
          </div>
          <h3>{user.role}</h3>
          <p>
            Your account is ready. You can review orders, update your details,
            and continue shopping anytime.
          </p>
          <Link to="/customer/profile" className="hero-button">
            Manage Profile
          </Link>
        </div>
      </section>

      <section className="summary-grid">
        {summaryCards.map((card) => (
          <article
            className={`summary-card ${card.muted ? "muted-card" : ""}`}
            key={card.title}
          >
            <div className="summary-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <h2>{card.value}</h2>
            <p>{card.note}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-lower-grid">
        <div className="dashboard-panel">
          <div className="panel-head">
            <h2>Quick Actions</h2>
            <span>Everything important, one tap away</span>
          </div>

          <div className="quick-links">
            {quickLinks.map((item) => (
              <Link to={item.to} className="quick-link-card" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <FiArrowRight />
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-head">
            <h2>Recent Orders</h2>
            <span>Your latest shopping activity</span>
          </div>

          {recentOrders.length === 0 ? (
            <div className="empty-state">
              <p>No orders yet. Start shopping to see your order activity here.</p>
              <Link to="/customer/shop" className="inline-link">
                Explore the shop
              </Link>
            </div>
          ) : (
            <div className="recent-orders-list">
              {recentOrders.map((order) => (
                <div className="recent-order-card" key={order._id}>
                  <div className="recent-order-top">
                    <strong>Order #{order._id.slice(-6)}</strong>
                    <span className="order-pill">
                      {order.orderStatus || "Processing"}
                    </span>
                  </div>
                  <p>
                    Total: <b>₦{order.totalPrice?.toLocaleString?.() || order.totalPrice}</b>
                  </p>
                  <small>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Recently placed"}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
