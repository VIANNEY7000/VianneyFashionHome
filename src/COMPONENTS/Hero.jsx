import heroImg from "../assets/IMAGES/Landingpage4.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <img src={heroImg} alt="Fashion Hero" className="hero-image" />

      <div className="hero-content">
        <motion.p
          className="hero-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          New Collection 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Redefine Your <br /> Everyday <span>Style</span>
        </motion.h1>

        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover timeless fashion pieces designed to elevate your
          confidence, comfort, and class.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Link to="/customer/shop" className="shop-btn">
            Shop Now
          </Link>

          <Link to="/collections" className="explore-btn">
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;