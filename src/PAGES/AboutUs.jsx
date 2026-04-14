import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/IMAGES/about2.avif";
import "../STYLES/AboutUs.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const values = [
    { title: "Quality", desc: "Premium materials in every design." },
    { title: "Style", desc: "Trendy yet timeless fashion." },
    { title: "Comfort", desc: "Wear confidence every day." }
  ];

  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-tag">About Us</p>
          <h1>Redefining Modern Fashion</h1>
          <p>
            We create timeless pieces designed to elevate your everyday lifestyle.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <motion.div
          className="story-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>Our Story</h2>
          <p>
            VianneyFashionHome was built with a simple vision — to create fashion
            that blends style, comfort, and confidence. Every piece is designed
            with attention to detail and modern trends.
          </p>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="values-grid">
          {values.map((item, index) => (
            <motion.div
              className="value-card"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="about-split">
        <div className="split-container">

          <motion.div
            className="split-image"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img src={aboutImg} alt="About" />
          </motion.div>

          <motion.div
            className="split-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2>Crafted For You</h2>
            <p>
              Our collections are designed to fit seamlessly into your lifestyle,
              combining elegance with everyday functionality.
            </p>
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Start Your Style Journey</h2>
          <button><Link to='/customer/shop'>Shop Now</Link></button>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutUs;