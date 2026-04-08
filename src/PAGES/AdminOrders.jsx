import React, { useEffect, useState } from "react";
import axios from "axios";
import "../STYLES/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const API_URL = "https://vfhome-backend2-3.onrender.com/api/orders";

  // FETCH ALL ORDERS
  const fetchOrders = async () => {
  try {
    setLoading(true);
    const res = await axios.get(API_URL);
    setOrders(res.data.orders || []);
    setFilteredOrders(res.data.orders || []);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  // FILTER ORDERS
  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.orderStatus === statusFilter
      );
      setFilteredOrders(filtered);
    }
  }, [statusFilter, orders]);

  // UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/update/${orderId}`, {
        orderStatus: newStatus,
      });

      const updatedOrders = orders.map((order) =>
        order._id === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      );

      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

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
            <option value="Ready for Pickup">Ready for Pickup</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="empty-text">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-top">
                <h2>Order ID</h2>
                <p>{order._id.slice(-8).toUpperCase()}</p>
              </div>

              <div className="order-section">
                <h3>Customer Info</h3>
                <p><strong>Name:</strong> {order.fullName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
              </div>

              <div className="order-section">
                <h3>Shipping Address</h3>
                <p>{order.address}</p>
                <p>{order.city}, {order.state}</p>
                <p>{order.country}</p>
              </div>

              <div className="order-section">
                <h3>Products Ordered</h3>
                <div className="ordered-items">
                  {order.items.map((item, index) => (
                    <div className="ordered-item" key={index}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p><strong>{item.name}</strong></p>
                        <p>₦{item.price?.toLocaleString()}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-section">
                <h3>Payment</h3>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`payment-status ${order.paymentStatus?.toLowerCase()}`}>
                    {order.paymentStatus}
                  </span>
                </p>
                <p><strong>Total:</strong> ₦{order.totalPrice?.toLocaleString()}</p>
              </div>

              <div className="order-section">
                <h3>Order Status</h3>
                <p>
                  <span className={`order-status ${order.orderStatus?.replace(/\s+/g, "-").toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </p>

                <select
                  className="status-select"
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Ready for Pickup">Ready for Pickup</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="order-footer">
                <small>
                  Ordered on:{" "}
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