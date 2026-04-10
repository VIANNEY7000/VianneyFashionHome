import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://vfhome-backend2-3.onrender.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>Profile </h2>

      {user && (
        <>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;