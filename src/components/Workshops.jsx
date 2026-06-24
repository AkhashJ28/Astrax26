import { useState } from "react";
import "../styles/Workshop.css";
import upcomingVideo from "../assets/upcoming.mp4";

function Workshops({ setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSide, setActiveSide] = useState(null); // "left", "right", or null

  const handleToggle = () => {
    setIsOpen(!isOpen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (e) => {
    const { clientX } = e;
    const width = window.innerWidth;

    if (activeSide === "left") {
      // If left is expanded, stay left unless cursor moves to the right of 70% width
      if (clientX > width * 0.70) {
        setActiveSide(null);
      }
    } else if (activeSide === "right") {
      // If right is expanded, stay right unless cursor moves to the left of 30% width
      if (clientX < width * 0.30) {
        setActiveSide(null);
      }
    } else {
      // In neutral split: trigger expand when mouse moves outside the central 45% - 55% deadzone
      if (clientX < width * 0.45) {
        setActiveSide("left");
      } else if (clientX > width * 0.55) {
        setActiveSide("right");
      }
    }
  };

  const handleMouseLeave = () => {
    setActiveSide(null);
  };

  return (
    <section id="workshops" className={`workshops-section ${isOpen ? "expanded" : "collapsed"}`}>
      
      {!isOpen ? (
        // COLLAPSED / COMING SOON VIEW (Full Screen Video Background)
        <>
          <video autoPlay muted loop playsInline className="workshop-video-bg">
            <source src={upcomingVideo} type="video/mp4" />
          </video>
          <div className="workshop-overlay-fixed"></div>
          
          <button className="teaser-back-to-home-btn" onClick={() => setActivePage("Home")}>
            ← Back to Home
          </button>

          <div className="workshop-teaser-fullscreen" onClick={handleToggle}>     
            <div className="teaser-content">
              <span className="teaser-tagline">LEARN • BUILD • INNOVATE</span>
              <h2 className="teaser-title">WORKSHOPS</h2>
              <div className="coming-soon-badge-container">
                <span className="coming-soon-badge">COMING SOON</span>
              </div>
              <p className="teaser-hint">Click to Reveal & Explore</p>
            </div>
            <div className="corners-decor-fullscreen">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
            </div>
          </div>
        </>
      ) : (
        // EXPANDED VIEW WITH SHANG-CHI SPLIT HOVER VIEW
        <div className="workshop-split-container">
          
          {/* Fixed split screen background image */}
          <div className="workshop-split-bg"></div>

          {/* Top Header Bar with Navigation buttons */}
          <div className="split-header-bar">
            <div className="split-header-left">
              <button className="back-to-teaser-btn" onClick={() => setIsOpen(false)}>
                ← Back to Teaser
              </button>
              <button className="back-to-home-btn-split" onClick={() => setActivePage("Home")}>
                ← Home
              </button>
            </div>
            <h2 className="split-page-title">CHOOSE YOUR PATH</h2>
          </div>

          {/* Split panels container */}
          <div 
            className="split-panels"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* LEFT PANEL: BLUE / CYBER SECURITY */}
            <div 
              className={`split-panel left-panel ${activeSide === "left" ? "expanded" : activeSide === "right" ? "shrunk" : ""}`}
            >
              <div className="panel-bg-hover left-hover-bg"></div>
              <div className="panel-overlay blue-overlay"></div>
              
              <div className="panel-content">
                <div className="panel-glow-ring blue-ring"></div>
                <span className="panel-side-tag">PATH OF DEFENSE</span>
                <h3 className="panel-workshop-title">CYBER SECURITY 101</h3>
                
                <div className="panel-workshop-details">
                  <p className="panel-description">
                    Master the digital defense arts. Learn cybersecurity fundamentals, ethical hacking, vulnerability assessment, and how to defend against cyber threats in the modern digital age.
                  </p>
                  
                  <div className="panel-metadata">
                    <div className="split-tag blue-tag">
                      <svg viewBox="0 0 24 24" className="split-tag-icon" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Intermediate</span>
                    </div>
                    <div className="split-tag blue-tag">
                      <svg viewBox="0 0 24 24" className="split-tag-icon" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>3 Hours</span>
                    </div>
                  </div>

                  <button className="register-now-split-btn blue-btn">
                    Secure Seat
                  </button>
                </div>
                
                <div className="hover-prompt blue-prompt">
                  Hover to Acquire Power
                </div>
              </div>
            </div>

            {/* Sci-fi Divider Line */}
            <div className={`split-divider ${activeSide ? activeSide : ""}`}></div>

            {/* RIGHT PANEL: ORANGE / INTRO TO AI/ML */}
            <div 
              className={`split-panel right-panel ${activeSide === "right" ? "expanded" : activeSide === "left" ? "shrunk" : ""}`}
            >
              <div className="panel-bg-hover right-hover-bg"></div>
              <div className="panel-overlay orange-overlay"></div>
              
              <div className="panel-content">
                <div className="panel-glow-ring orange-ring"></div>
                <span className="panel-side-tag">PATH OF COGNITION</span>
                <h3 className="panel-workshop-title">INTRO TO AI/ML</h3>
                
                <div className="panel-workshop-details">
                  <p className="panel-description">
                    Uncover the secrets of machine cognition. Dive into Artificial Intelligence, neural networks, supervised learning algorithms, and build models that think for themselves.
                  </p>
                  
                  <div className="panel-metadata">
                    <div className="split-tag orange-tag">
                      <svg viewBox="0 0 24 24" className="split-tag-icon" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Intermediate</span>
                    </div>
                    <div className="split-tag orange-tag">
                      <svg viewBox="0 0 24 24" className="split-tag-icon" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>4 Hours</span>
                    </div>
                  </div>

                  <button className="register-now-split-btn orange-btn">
                    Unleash Potential
                  </button>
                </div>
                
                <div className="hover-prompt orange-prompt">
                  Hover to Unleash Force
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Workshops;
