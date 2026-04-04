import React from "react";
import "../STYLES/AdminCards.css";

const AdminDashboardCards = () => {
  const cards = [
    { title: "Total Products", value: 120 },
    { title: "Total Orders", value: 85 },
    { title: "Total Customers", value: 45 },
    { title: "Revenue", value: "₦450,000" },
  ];

  return (
    <div className="admin-cards">
      {cards.map((card, index) => (
        <div className="admin-card" key={index}>
          <h2>{card.title}</h2>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardCards;