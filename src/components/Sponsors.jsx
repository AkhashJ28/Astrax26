import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Sponsors.css';

// Background Video
import sponsersBg from '../assets/sponsers-bg.mp4';

// Demo Sponsor Icons
import { FaGoogle, FaMicrosoft, FaAws, FaReact } from 'react-icons/fa';
import { SiNvidia, SiOpenai, SiIntel, SiAmd, SiTesla, SiMeta, SiGooglecloud, SiCisco } from 'react-icons/si';

const demoSponsors = [
  { id: 1, name: 'TechNova', Icon: SiNvidia, tier: 'INNOVATE. INSPIRE. IMPACT.' },
  { id: 2, name: 'QuantumStack', Icon: SiOpenai, tier: 'TITLE SPONSOR' },
  { id: 3, name: 'DevForge', Icon: FaMicrosoft, tier: 'TITLE SPONSOR' },
  { id: 4, name: 'CodeCraft', Icon: SiIntel, tier: 'POWER SPONSOR' },
  { id: 5, name: 'DataFlux', Icon: FaGoogle, tier: 'POWER SPONSOR' },
  { id: 6, name: 'ApexLabs', Icon: FaAws, tier: 'POWER SPONSOR' },
  { id: 7, name: 'SynthNet', Icon: SiAmd, tier: 'TECH PARTNER' },
  { id: 8, name: 'CyberCore', Icon: SiTesla, tier: 'TECH PARTNER' },
  { id: 9, name: 'NexusAI', Icon: SiMeta, tier: 'CRITICAL HUB' },
  { id: 10, name: 'CloudVibe', Icon: SiGooglecloud, tier: 'CLOUD PARTNER' },
  { id: 11, name: 'Crypton', Icon: SiCisco, tier: 'SECURITY LEADER' },
  { id: 12, name: 'Vertex', Icon: FaReact, tier: 'DATA EXPERT' }
];

// Helper to avoid hook purity issues (deterministic pseudo-random generator)
const INITIAL_PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${(i * 3.7 + 5) % 100}%`,
  animationDelay: `${(i * 0.4) % 8}s`,
  animationDuration: `${8 + (i * 0.6) % 12}s`,
  maxOpacity: 0.2 + (i * 0.05) % 0.6,
  drift: (i * 0.1) % 1
}));

// Calculates the 3D position and properties for each card based on its relative distance from the center
const getCardStyle = (index, activeIndex, totalCards) => {
  let diff = index - activeIndex;
  
  // Wrap around for circular list
  if (diff > totalCards / 2) diff -= totalCards;
  if (diff < -totalCards / 2) diff += totalCards;

  const isVisible = Math.abs(diff) <= 2;
  
  let x = 0;
  let z = 0;
  let rotateY = 0;
  let scale = 1;
  let opacity = 0;
  let zIndex = 0;

  if (isVisible) {
    if (diff === 0) {
      x = 0; z = 120; rotateY = 0; scale = 1.1; opacity = 1; zIndex = 10;
    } else if (diff === 1) {
      x = 220; z = 20; rotateY = -35; scale = 0.85; opacity = 0.7; zIndex = 8;
    } else if (diff === -1) {
      x = -220; z = 20; rotateY = 35; scale = 0.85; opacity = 0.7; zIndex = 8;
    } else if (diff === 2) {
      x = 380; z = -80; rotateY = -50; scale = 0.7; opacity = 0.4; zIndex = 6;
    } else if (diff === -2) {
      x = -380; z = -80; rotateY = 50; scale = 0.7; opacity = 0.4; zIndex = 6;
    }
  } else {
    // Hidden cards slide in/out from the deep background
    x = diff > 0 ? 550 : -550;
    z = -200; rotateY = diff > 0 ? -60 : 60; scale = 0.6; opacity = 0; zIndex = 0;
  }

  return { x, z, rotateY, scale, opacity, zIndex, isVisible, diff };
};

const Sponsors = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const N = demoSponsors.length;

  const rotateRight = () => setActiveIndex((prev) => (prev + 1) % N);
  const rotateLeft = () => setActiveIndex((prev) => (prev - 1 + N) % N);

  const handleCardClick = (diff, index) => {
    // Bring clicked card to center
    if (diff !== 0) setActiveIndex(index);
  };

  const handleDragEnd = (event, info) => {
    // Threshold for swipe to trigger rotation
    if (info.offset.x < -50) rotateRight();
    else if (info.offset.x > 50) rotateLeft();
  };

  return (
    <div className="sponsors-page">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="sponsors-bg-video">
        <source src={sponsersBg} type="video/mp4" />
      </video>
      <div className="sponsors-overlay"></div>
      <div className="scan-lines"></div>

      {/* Floating Particles */}
      <div className="particles-layer" aria-hidden="true">
        {INITIAL_PARTICLES.map((p) => (
          <span key={p.id} className="particle" style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
            '--max-opacity': p.maxOpacity,
            '--drift': p.drift
          }}></span>
        ))}
      </div>

      {/* Main Split Layout */}
      <main className="sponsors-main-content">
        
        {/* Left Text Panel */}
        <section className="sponsors-left-panel">
          <div className="sponsors-tagline">TOGETHER, WE BUILD THE EXTRAORDINARY</div>
          <h1 className="sponsors-title">OUR<br/>SPONSORS</h1>
          <h2 className="sponsors-subtitle">OUR POWER. THEIR VISION.</h2>
          <p className="sponsors-description">
            Astra X 2026 is made possible by visionary partners who believe in innovation, creativity and the future.
          </p>
          <div className="status-indicator">
            <span style={{ fontSize: '0.65rem' }}>PARTNERSHIP STATUS</span>
            <div className="status-value">
              <span className="status-dot"></span> ACTIVE
            </div>
          </div>
        </section>

        {/* Right Carousel Panel */}
        <section className="sponsors-carousel-panel">
          <div className="carousel-viewport">
            {/* Left Nav Arrow */}
            <div className="nav-arrow left" onClick={rotateLeft}>
              &lt;
            </div>

            {/* 3D Cards Container */}
            <motion.div 
              className="carousel-container"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {demoSponsors.map((sponsor, index) => {
                const { x, z, rotateY, scale, opacity, zIndex, isVisible, diff } = getCardStyle(index, activeIndex, N);
                
                return (
                  <motion.div
                    key={sponsor.id}
                    className={`sponsor-3d-card ${diff === 0 ? 'active-card' : 'inactive-card'}`}
                    animate={{ x, z, rotateY, scale, opacity }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ zIndex, pointerEvents: isVisible ? 'auto' : 'none' }}
                    onClick={() => handleCardClick(diff, index)}
                  >
                    
                    <div className="card-body-tech">
                      <div className="card-icon-container">
                        <sponsor.Icon />
                      </div>
                      <h3 className="card-name">{sponsor.name}</h3>
                      <div className="card-tier">{sponsor.tier}</div>
                    </div>

                    <div className="card-footer-tech">
                      <span className="card-status-dot"></span>
                      <span>SYSTEM ACTIVE</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right Nav Arrow */}
            <div className="nav-arrow right" onClick={rotateRight}>
              &gt;
            </div>
          </div>

          {/* Hologram Pedestal Base */}
          <div className="pedestal-container">
            <div className="volumetric-beam"></div>
            <div className="pedestal-base">
              <div className="pedestal-ring-1"></div>
              <div className="pedestal-ring-2"></div>
              <div className="pedestal-core"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom CTA Banner */}
      <div className="sponsors-cta-banner">
        {/* Left: 3D Cube */}
        <div className="banner-cube-container">
          <div className="cube-wrapper">
            <div className="cube">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <div className="cube-status">
            SYSTEM 
            <span className="cube-status-val">ONLINE</span>
          </div>
        </div>

        {/* Center: Call to Action Text */}
        <div className="banner-center-text">
          <h2 className="banner-title">BE PART OF THE LEGACY</h2>
          <p className="banner-desc">Partner with Astra X 2026 and empower the next generation of innovators.</p>
        </div>

        {/* Right: Button */}
        <button className="banner-cta-button">
          Become a Sponsor <span style={{ fontSize: '1.2rem', marginLeft: '4px' }}>→</span>
        </button>
      </div>

    </div>
  );
};

export default Sponsors;