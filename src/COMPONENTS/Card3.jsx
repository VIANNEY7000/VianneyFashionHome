import React from 'react'
import { motion } from 'framer-motion'
import promoImg from "../assets/IMAGES/promo2.jpg";
import '../STYLES/Card3.css'

const Card3 = () => {
  return (
    <section className="promo-section">

      {/* BACKGROUND IMAGE */}
      <div className="promo-bg">
        <img src={promoImg} alt="Promo" />
        <div className="overlay"></div>
      </div>

      {/* CONTENT */}
      <motion.div
        className="promo-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="section-tag">Limited Offer</p>
        <h2>Up to 50% Off New Collection</h2>
        <p>
          Discover exclusive styles curated for this season. Don’t miss out.
        </p>
        <button>Shop Now</button>
      </motion.div>

    </section>
  )
}

export default Card3