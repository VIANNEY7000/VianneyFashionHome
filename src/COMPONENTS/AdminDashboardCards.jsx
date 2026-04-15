import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../STYLES/AdminDashboard.css";

const API = "https://vfhome-backend2-3.onrender.com/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingStats(false);
    }
  };

  // FETCH REVENUE
  const fetchRevenue = async () => {
    try {
      const res = await axios.get(`${API}/orders/revenue-monthly`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRevenueData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRevenue(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRevenue();
  }, []);

  const cards = [
    {
      title: "Products",
      value: stats?.totalProducts ?? 0,
      icon: <FaBox />,
    },
    {
      title: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: <FaShoppingCart />,
    },
    {
      title: "Customers",
      value: stats?.totalCustomers ?? 0,
      icon: <FaUsers />,
    },
    {
      title: "Revenue",
      value: `₦${stats?.revenue?.toLocaleString() ?? 0}`,
      icon: <FaMoneyBillWave />,
      highlight: true,
    },
  ];

  return (
    <div className="admin-dashboard">

      <div className="dashboard-grid">

        {/* LEFT SIDE CARDS */}
        <div className="stats-section">
          {cards.map((card, index) => (
            <div
              className={`stat-card ${card.highlight ? "highlight" : ""}`}
              key={index}
            >
              <div className="icon">{card.icon}</div>
              <div className="info">
                <h4>{card.title}</h4>
                <h2>{card.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE CHART */}
        <div className="chart-section">
          <h3>Revenue Overview</h3>

          <div className="chart-box">
            {loadingRevenue ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;