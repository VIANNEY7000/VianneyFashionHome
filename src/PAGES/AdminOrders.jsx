import React, { useEffect, useState } from "react";
import axios from "axios";
import "../STYLES/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const API_URL = "https://vfhome-backend2-3.onrender.com/api/orders";

  const token = localStorage.getItem("token");

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.orders || [];
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error(error?.response?.data || error.message);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // FILTER ORDERS
  // =========================
  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.orderStatus === statusFilter)
      );
    }
  }, [statusFilter, orders]);

  // =========================
  // UPDATE ORDER STATUS
  // =========================
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/update/${orderId}`,
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = orders.map((order) =>
        order._id === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      );

      setOrders(updated);
    } catch (error) {
      console.error(error?.response?.data || error.message);
      alert("Failed to update order status");
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="admin-orders">
        <h2>Loading orders...</h2>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>Orders Management</h1>

        <div className="orders-filter">
          <label>Filter Orders:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Ready for Pickup">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div className="order-card" key={order._id}>
              {/* ORDER ID */}
              <div className="order-top">
                <h2>Order ID</h2>
                <p>{order._id.slice(-8).toUpperCase()}</p>
              </div>

              {/* CUSTOMER */}
              <div className="order-section">
                <h3>Customer Info</h3>
                <p><b>Name:</b> {order.fullName}</p>
                <p><b>Email:</b> {order.email}</p>
                <p><b>Phone:</b> {order.phone}</p>
              </div>

              {/* ADDRESS */}
              <div className="order-section">
                <h3>Shipping</h3>
                <p>{order.address}</p>
                <p>{order.city}, {order.state}</p>
                <p>{order.country}</p>
              </div>

              {/* ITEMS */}
              <div className="order-section">
                <h3>Items</h3>

                <div className="ordered-items">
                  {order.items?.map((item, index) => (
                    <div className="ordered-item" key={index}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p><b>{item.name}</b></p>
                        <p>₦{item.price}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENT */}
              <div className="order-section">
                <h3>Payment</h3>
                <p>
                  <b>Status:</b>{" "}
                  <span className={`payment-status ${(order.paymentStatus || "pending").toLowerCase()}`}>
                    {order.paymentStatus}
                  </span>
                </p>
                <p>
                  <b>Total:</b> ₦{order.totalPrice?.toLocaleString()}
                </p>
              </div>

              {/* STATUS UPDATE */}
              <div className="order-section">
                <h3>Order Status</h3>

                <p>
                  <span className={`order-status ${(order.orderStatus || "").replace(/\s+/g, "-").toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </p>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Ready for Pickup">Ready</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* DATE */}
              <div className="order-footer">
                <small>
                  {new Date(order.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;