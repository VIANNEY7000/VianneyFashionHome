import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import menImg from "../assets/IMAGES/malemodel2.jpg";
import womenImg from "../assets/IMAGES/fashionimage2.jpg";
import accessoriesImg from "../assets/IMAGES/girlonjeancloth.webp";
import newArrivalsImg from "../assets/IMAGES/fashionimage3.avif";
import "./FeaturedCategories.css";

const categories = [
  {
    title: "Men",
    image: menImg,
    path: "/shop",
    desc: "Sharp, clean, and everyday essential styles."
  },
  {
    title: "Women",
    image: womenImg,
    path: "/shop",
    desc: "Elegant looks designed for confidence and comfort."
  },
  {
    title: "Accessories",
    image: accessoriesImg,
    path: "/shop",
    desc: "Finish your outfit with standout details."
  },
  {
    title: "New Arrivals",
    image: newArrivalsImg,
    path: "/shop",
    desc: "Fresh pieces curated for the modern trendsetter."
  }
];

const FeaturedCategories = () => {
  return (
    <section className="featured-categories">
      <motion.div
        className="category-header"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="section-tag">Shop By Category</p>
        <h2>Curated Fashion For Every Style</h2>
        <p className="section-subtext">
          Explore carefully selected collections tailored to elevate your
          everyday wardrobe.
        </p>
      </motion.div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <motion.div
            className="category-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <Link to={category.path} className="category-link">
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.title} />
                <div className="category-overlay"></div>
              </div>

              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.desc}</p>
                <span>Shop Category</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;