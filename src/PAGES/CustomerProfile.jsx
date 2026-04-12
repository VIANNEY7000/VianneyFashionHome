import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../STYLES/CustomerProfile.css'

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    // ✅ NO TOKEN → redirect immediately
    if (!token) {
      setError("You are not logged in");
      setLoading(false);
      navigate("/login");
      return;
    }

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

      console.log("PROFILE RESPONSE:", res.data);

      setUser(res.data.user || res.data);
      setError("");
    } catch (error) {
      console.error("PROFILE ERROR:", error?.response?.data || error.message);

      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (error.response?.status === 404) {
        setError("User not found");
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ LOADING
  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  // ✅ ERROR HANDLING (IMPORTANT)
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="profile-container">

      {/* USER INFO */}
      <div className="profile-card">
        <h2>My Profile</h2>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Role:</b> {user?.role}</p>
      </div>

      {/* ADDRESS */}
      <div className="profile-card">
        <h2>Address</h2>
        <p>{user?.address?.street || "No address set"}</p>
        <p>
          {user?.address?.city || ""} {user?.address?.state || ""}
        </p>
        <p>{user?.address?.country || ""}</p>
      </div>

    </div>
  );
};

export default CustomerProfile;