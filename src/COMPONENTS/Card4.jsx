import React, { useState } from "react";
import { motion } from "framer-motion";
import "../STYLES/Card4.css";

const Card4 = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    alert("Subscribed successfully!");
    setSubscribed(true);
  };

  return (
    <section className="newsletter-section">
      <motion.div
        className="newsletter-box"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Stay In Style</h2>
        <p>Subscribe to get exclusive updates and offers.</p>

        <div className="newsletter-input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleClick} disabled={subscribed}>
            {subscribed ? "🤍 Subscribed" : "🔔 Subscribe"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Card4;