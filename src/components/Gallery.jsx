import React, { useEffect, useRef } from 'react';
import '../styles/Gallery.css';

// Background image
import galleryBg from '../assets/gallery-bg.png';
// Portals image
import portalsImg from '../assets/new_portals.png';
// Title image
import galleryTitleImg from '../assets/gallery-title.png';

/* ── Gallery Page ── */
const Gallery = () => {
  const bgRef = useRef(null);

  // Parallax removed to keep the background frame perfectly aligned

  return (
    <div className="gallery-page">
      {/* Background image layer (parallax) */}
      <div className="gallery-bg" ref={bgRef} style={{ backgroundImage: `url(${galleryBg})` }}></div>
      <div className="gallery-overlay"></div>

      {/* Floating embers (optional, kept for vibe) */}
      <div className="embers-layer" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="ember" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            '--max-opacity': 0.1 + Math.random() * 0.3,
            '--drift': Math.random()
          }}></span>
        ))}
      </div>

      {/* Center Portals with Random Images Inside */}
      <div className="center-portals-container">
        <img src={galleryTitleImg} alt="Gallery" className="gallery-main-title-img" />
        <div className="portals-wrapper">
          
          {/* Images inside the windows */}
          <div className="portal-content portal-left">
            <img src="https://picsum.photos/seed/portal1/400/800" alt="Memory 1" />
          </div>
          <div className="portal-content portal-center">
            <img src="https://picsum.photos/seed/portal2/400/800" alt="Memory 2" />
          </div>
          <div className="portal-content portal-right">
            <img src="https://picsum.photos/seed/portal3/400/800" alt="Memory 3" />
          </div>
          
          {/* The main portals frame overlay */}
          <img src={portalsImg} alt="Portals Frame" className="portals-frame" />
          
        </div>
      </div>

    </div>
  );
};

export default Gallery;