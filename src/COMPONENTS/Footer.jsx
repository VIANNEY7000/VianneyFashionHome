import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footername">
          <h3>VianneyFashionHome</h3>
          <p>Modern fashion for everyday confidence.</p>
        </div>
      <div className="footer-container">

        <div>
          <h4>Shop</h4>
          <p><Link to='/customer/shop'>Men</Link></p>
          <p><Link to='/customer/shop'>Women</Link></p>
          <p><Link to='/customer/shop'>Kids</Link></p>
          <p><Link to='/customer/shop'>Accessories</Link></p>
        </div>

        <div>
          <h4>Company</h4>
          <p><Link to='/aboutus'>About</Link></p>
          <p><Link to='/contact'>Contact</Link></p>
        </div>

        <div>
          <h4>Follow</h4>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>

      </div>

      <p className="copy">© 2026 Vianney. All rights reserved.</p>
    </footer>
  );
};

export default Footer;