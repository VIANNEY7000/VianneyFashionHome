// /PAGES/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerDashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://vfhome-backend2-3.onrender.com/api/auth/protected",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-content">
      <h1>Welcome, {user.name} 👋</h1>
      <p>Email: {user.email}</p>

      <div className="dashboard-cards">
        <div className="card">
          <h2>My Orders</h2>
          <p>Check your order history and status.</p>
        </div>
        <div className="card">
          <h2>Wishlist</h2>
          <p>Items saved for later.</p>
        </div>
        <div className="card">
          <h2>Profile Info</h2>
          <p>Update your profile and password.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;