import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://vfhome-backend2-3.onrender.com/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  if (!user) {
    return <h2>No user found</h2>;
  }

  return (
    <div className="profile-container">

      {/* USER INFO */}
      <div className="profile-card">
        <h2>My Profile</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>

      {/* ADDRESS */}
      <div className="profile-card">
        <h2>Address</h2>
        <p>{user.address?.street || "No address set"}</p>
        <p>
          {user.address?.city} {user.address?.state}
        </p>
        <p>{user.address?.country}</p>
      </div>

      {/* ORDERS */}
      <div className="profile-card">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-box">
              <p><b>ID:</b> {order._id.slice(-6)}</p>
              <p><b>Status:</b> {order.orderStatus}</p>
              <p><b>Total:</b> ₦{order.totalPrice}</p>

              <div className="order-items">
                {order.items?.map((item, i) => (
                  <div key={i} className="mini-item">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default CustomerProfile;