import React, { useState, useEffect } from "react";
import axios from "axios";
import "../STYLES/Customers.css";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://vfhome-backend2-3.onrender.com/api/auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // get only customers, not admins
        const onlyCustomers = res.data.users.filter(
          (user) => user.role === "customer"
        );

        setCustomers(onlyCustomers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://vfhome-backend2-3.onrender.com/api/auth/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCustomers((prev) => prev.filter((customer) => customer._id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="customers-page">
      <div className="customers-header">
        <h1>Customers</h1>
        <p>Manage and view all registered customers.</p>
      </div>

      <div className="customers-topbar">
        <input
          type="text"
          placeholder="Search customers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customers-table-wrapper">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.role}</td>
                  <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="view-btn">View</button>
                    <button
                        className="delete-btn"
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this customer? "
                          );
                          if (!confirmDelete) return;

                          try {
                            const token = localStorage.getItem("token");
                            await axios.delete(
                              `https://vfhome-backend2-3.onrender.com/api/auth/delete/${customer._id}`,
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            setCustomers((prev) => prev.filter((c) => c._id !== customer._id));
                          } catch (err) {
                            console.error("Error deleting customer:", err);
                          }
                        }}
                      >
                        Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-customers">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;