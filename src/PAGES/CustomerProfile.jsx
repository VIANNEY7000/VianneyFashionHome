import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../STYLES/CustomerProfile.css'

const API = import.meta.env.VITE_PRODUCT_API || "https://vfhome-backend2-3.onrender.com";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");

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
        `${API}/api/auth/protected`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PROFILE RESPONSE:", res.data);

      const profileData = res.data?.user || res.data?.data || res.data;

      if (profileData?.name || profileData?.email) {
        setUser(profileData);
        setError("");
        return;
      }

      const usersRes = await axios.get(`${API}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const users = usersRes.data?.users || [];
      const currentUser = users.find((item) => item._id === userId);

      if (!currentUser) {
        setError("Profile data not found");
        return;
      }

      setUser(currentUser);
      setError("");
    } catch (error) {
      console.error("PROFILE ERROR:", error?.response?.data || error.message);

      if (savedName || savedEmail) {
        setUser({
          _id: userId,
          name: savedName || "Customer",
          email: savedEmail || "No email available",
          role: localStorage.getItem("role") || "customer",
        });
        setError("");
        return;
      }

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
