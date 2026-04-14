import { motion } from "framer-motion";
import { FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import "../STYLES/Card2.css";

const features = [
  {
    icon: <FiTruck />,
    title: "Fast Delivery",
    desc: "Swift and reliable shipping across all locations."
  },
  {
    icon: <FiShield />,
    title: "Secure Payments",
    desc: "Transactions are encrypted and fully protected."
  },
  {
    icon: <FiRefreshCw />,
    title: "Easy Returns",
    desc: "Simple return process with zero stress."
  }
];

const Card2 = () => {
  return (
    <section className="why-section">
      <motion.div
        className="why-header"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="section-tag">Why Choose Us</p>
        <h2>Designed For A Better Shopping Experience</h2>
      </motion.div>

      <div className="why-grid">
        {features.map((item, index) => (
          <motion.div
            className="why-card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Card2;