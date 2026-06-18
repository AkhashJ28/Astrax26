import navLogo from "../assets/nav-logo.png";
import "../styles/Navbar.css";

// src/components/Navbar.jsx

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-img-wrapper">
          <img src={navLogo} alt="Astrax Logo" className="logo-img" />
        </div>
        <span className="logo-text">ASTRAX26</span>
      </div>

      <ul className="nav-links">
        <li className="nav-item power">Home</li>
        <li className="nav-item time">Events</li>
        <li className="nav-item reality">About Us</li>
        <li className="nav-item soul">Workshops</li>
        <li className="nav-item mind">Gallery</li>
        <li className="nav-item space">Sponsors</li>
      </ul>

      <button className="register-btn">
        Register Now
      </button>
    </nav>
  );
}

export default Navbar;