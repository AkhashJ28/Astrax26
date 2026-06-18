import { useState } from "react";
import navLogo from "../assets/nav-logo.png";
import "../styles/Navbar.css";

// src/components/Navbar.jsx

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={navLogo} alt="Astrax Logo" className="logo-img" />
      </div>

      <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li className="nav-item power" onClick={() => setIsMenuOpen(false)}>Home</li>
        <li className="nav-item time" onClick={() => setIsMenuOpen(false)}>Events</li>
        <li className="nav-item reality" onClick={() => setIsMenuOpen(false)}>About Us</li>
        <li className="nav-item soul" onClick={() => setIsMenuOpen(false)}>Workshops</li>
        <li className="nav-item mind" onClick={() => setIsMenuOpen(false)}>Gallery</li>
        <li className="nav-item space" onClick={() => setIsMenuOpen(false)}>Sponsors</li>
        <li className="nav-mobile-register">
          <button className="register-btn mobile-reg-btn">
            Register Now
          </button>
        </li>
      </ul>

      <button className="register-btn desktop-reg-btn">
        Register Now
      </button>
    </nav>
  );
}

export default Navbar;