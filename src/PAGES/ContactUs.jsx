import React from "react";
import { motion } from "framer-motion";
import "../STYLES/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-page">

      <motion.div
        className="contact-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Contact Us</h1>
        <p>We’re here to help you. Send us a message anytime.</p>
      </motion.div>

      <div className="contact-container">

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Send a Message</h2>

          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message" rows="6" required />

          <button type="submit">Send Message</button>
        </motion.form>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> support@vianneyfashionhome.com</p>
          <p><strong>Phone:</strong> +234 904 057 9333</p>
          <p><strong>Location:</strong>Owerri, ImoState, Nigeria</p>

          <div className="info-box">
            <h3>Working Hours</h3>
            <p>Mon - Sat: 9AM - 6PM</p>
            <p>Sunday: Closed</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactUs;