import '../App.css';

import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";



export default function Footer() {
  return <footer className="footer">
    <div className="footer-container">

      {/* About Us */}
      <div className="footer-box">
        <h3>About Us</h3>
        <p>
          Wonder A Way is your travel partner for unforgettable journeys.
          We help you explore the best destinations, plan trips, and make
          lasting memories — within India and around the world.
        </p>
      </div>

      {/* Contact */}
      <div className="footer-box">
        <h3>Contact</h3>
        <p>Email: support@wonderaway.com</p>
        <p>Phone: +91 12345 67890</p>
        <p>Address: 123 Travel Street, India</p>
        <div className="footer-links">
          <span><FaFacebook /></span><span><RiInstagramFill /></span><span>< FaSquareTwitter /></span>
          <span><FaLinkedin /></span>
        </div>
      </div>

    </div>

    {/* Footer Bottom */}
    <div className="footer-bottom">
      <p>© 2025 Wonder A Way. All Rights Reserved.</p>

    </div>
  </footer>
};
