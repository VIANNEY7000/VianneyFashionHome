import React, { useEffect, useState } from "react";
import axios from "axios";
import '../STYLES/CustomerOrder.css'
import { useNavigate } from "react-router-dom";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        "https://vfhome-backend2-3.onrender.com/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDERS:", res.data);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error?.response?.data || error.message);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <h2 className="loading">Loading orders...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p className="empty">No orders yet</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <p><b>Order ID:</b> {order._id.slice(-6)}</p>

                <span
                  className={`status ${order.orderStatus
                    ?.replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <p><b>Total:</b> ₦{order.totalPrice}</p>

              <div className="items">
                {order.items.map((item, i) => (
                  <div key={i} className="item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <small>
                {new Date(order.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
