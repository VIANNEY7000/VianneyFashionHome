import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <Link to="/" className="logo">
          <span>V</span>FashionHome
        </Link>

        {/* DESKTOP MENU */}
        <div className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/customer/shop">Shop</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/cart" className="cart-icon">
            <FiShoppingBag size={22} />
          </Link>
        </div>

        {/* HAMBURGER / CLOSE */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        className={`menu-backdrop ${open ? "show-backdrop" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "show-menu" : ""}`}>
        <ul>
          <li onClick={() => setOpen(false)}><Link to="/">Home</Link></li>
          <li onClick={() => setOpen(false)}><Link to="/customer/shop">Shop</Link></li>
          <li onClick={() => setOpen(false)}><Link to="/new-arrivals">New Arrivals</Link></li>
          <li onClick={() => setOpen(false)}><Link to="/collections">Collections</Link></li>
          <li onClick={() => setOpen(false)}><Link to="/contact">Contact</Link></li>
          <li onClick={() => setOpen(false)}>
            <Link to="/login" className="mobile-login">Login</Link>
          </li>
          <li onClick={() => setOpen(false)}><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;