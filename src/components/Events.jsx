import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Events.css";

import eventDebate from "../assets/event-debate.png";
import eventTva from "../assets/event-tva.png";
import eventTechnova from "../assets/event-technova.png";
import eventNeural from "../assets/event-neural.png";
import eventPixel from "../assets/event-pixel.png";
import eventNexus from "../assets/event-nexus.png";
import eventIdeathon from "../assets/event-ideathon.png";
import bgVideo from "../assets/bg-video.mp4";
import titleCard from "../assets/title card.png";
import eyeOfAgamotto from "../assets/eye of agamotto.png";
import agamottoOpen from "../assets/agamotto_open.png";
import agamottoClose from "../assets/agamotto_close.png";

const eventDatabase = [
  { id: "debate",    badge: "Tech Saga",            title: "AI Technical Debate", image: eventDebate,    prize: "₹40,000",   participants: "200+", description: "An intense battle of minds pitching human logic against artificial intelligence algorithms." },
  { id: "tva",       badge: "Quest Saga",            title: "TVA: Variant Hunt",   image: eventTva,       prize: "₹60,000",   participants: "500+", description: "A high-speed multiverse treasure hunt across complex temporal nodes." },
  { id: "technova",  badge: "Innovation Challenge",  title: "Technova",            image: eventTechnova,  prize: "₹80,000",   participants: "350+", description: "A design and prototyping challenge aimed at bringing innovative tech solutions to life." },
  { id: "neural",    badge: "Tech Saga",             title: "Neural Knockout",     image: eventNeural,    prize: "₹50,000",   participants: "300+", description: "A deep learning battle arena where custom neural network models will compete." },
  { id: "pixel",     badge: "Design Saga",           title: "Pixel Whisper",       image: eventPixel,     prize: "₹45,000",   participants: "250+", description: "Where design parameters are generated purely by vocal commands." },
  { id: "nexus",     badge: "Quest Saga",            title: "Nexus Grid",          image: eventNexus,     prize: "₹35,000",   participants: "400+", description: "A high-speed cyber bingo event designed to test algorithmic speed and basic tech trivia." },
  { id: "ideathon",  badge: "Flagship Saga",         title: "Ideathon",            image: eventIdeathon,  prize: "₹1,00,000", participants: "600+", description: "The crowning flagship event of Astra-X. Pitch revolutionary product concepts." },
];

const PARTICLE_COUNT = 28;

function Events() {
  const containerRef    = useRef(null);
  const eyeWrapperRef   = useRef(null);
  const eyeOpenImgRef   = useRef(null);
  const eyeCloseImgRef  = useRef(null);
  const eyeInnerImgRef  = useRef(null);
  const runeRing1Ref    = useRef(null);
  const runeRing2Ref    = useRef(null);
  const infoCardRef     = useRef(null);
  const particleRefs    = useRef([]);

  const [currentIdx, setCurrentIdx]   = useState(0);
  const [displayIdx, setDisplayIdx]   = useState(0);
  const [infoOpen, setInfoOpen]       = useState(false);
  const isAnimatingRef  = useRef(false);
  const isInfoOpenRef   = useRef(false);

  // Counter
  const [hasCounted, setHasCounted]   = useState(false);
  const statsContainerRef = useRef(null);
  const numbersRef        = useRef([]);

  // Timeline
  const timelineRef    = useRef(null);
  const progressLineRef = useRef(null);
  const nodesRef        = useRef([]);

  // ── Rune ring spin ──
  useEffect(() => {
    if (!runeRing1Ref.current || !runeRing2Ref.current) return;
    gsap.to(runeRing1Ref.current, { rotation: 360,  duration: 16, ease: "none", repeat: -1 });
    gsap.to(runeRing2Ref.current, { rotation: -360, duration: 24, ease: "none", repeat: -1 });
  }, []);

  // ── Particle burst ──
  const fireBurst = (intensity = 1) => {
    particleRefs.current.forEach(p => {
      if (!p) return;
      const angle = Math.random() * Math.PI * 2;
      const dist  = (80 + Math.random() * 220) * intensity;
      gsap.fromTo(p,
        { x: 0, y: 0, opacity: 1, scale: 1 + Math.random() * 0.6 },
        { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
          opacity: 0, scale: 0,
          duration: 0.75 + Math.random() * 0.55,
          ease: "power2.out",
          delay: Math.random() * 0.1,
          overwrite: "auto" }
      );
    });
  };

  // ── Toggle info card ──
  const openInfo = () => {
    const card = infoCardRef.current;
    if (!card) return;
    isInfoOpenRef.current = true;
    setInfoOpen(true);
    card.style.pointerEvents = "auto";
    gsap.fromTo(card,
      { opacity: 0, yPercent: 10, xPercent: -50, scale: 0.95 },
      { opacity: 1, yPercent: -50, xPercent: -50, scale: 1, duration: 0.52, ease: "power3.out" }
    );
  };

  const closeInfo = () => {
    const card = infoCardRef.current;
    if (!card) return;
    gsap.to(card, {
      opacity: 0, yPercent: 0, scale: 0.95, duration: 0.32, ease: "power2.in",
      onComplete: () => {
        card.style.pointerEvents = "none";
        isInfoOpenRef.current = false;
        setInfoOpen(false);
      }
    });
  };

  const handleEyeClick = () => {
    if (isAnimatingRef.current) return;
    if (isInfoOpenRef.current) closeInfo();
    else openInfo();
  };

  // ── Main eye transition ──
  const triggerTransition = (nextIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Close info panel if open
    if (isInfoOpenRef.current) {
      closeInfo();
    }

    const openImg  = eyeOpenImgRef.current;
    const closeImg = eyeCloseImgRef.current;
    const innerImg = eyeInnerImgRef.current;
    const wrapper  = eyeWrapperRef.current;
    const rings    = [runeRing1Ref.current, runeRing2Ref.current];

    const tl = gsap.timeline({ onComplete: () => { isAnimatingRef.current = false; } });

    // Phase 1 — Click flash & burst
    tl.call(() => fireBurst(1.3), null, 0);
    tl.to(rings, { filter: "brightness(4) drop-shadow(0 0 20px #e6b800)", duration: 0.2, ease: "power2.out" }, 0);
    tl.to(wrapper, {
      x: gsap.utils.random(-5, 5), y: gsap.utils.random(-4, 4),
      duration: 0.06, repeat: 6, yoyo: true, ease: "none", clearProps: "x,y",
    }, 0);

    // Phase 2 — Close
    tl.to(innerImg, { opacity: 0, scale: 0.9, duration: 0.32, ease: "power2.in" }, 0.1);
    tl.to(openImg,  { opacity: 0, duration: 0.38, ease: "power2.inOut" }, 0.15);
    tl.to(closeImg, { opacity: 1, duration: 0.38, ease: "power2.inOut" }, 0.15);

    // Phase 3 — Swap content while closed
    tl.call(() => {
      setCurrentIdx(nextIndex);
      setDisplayIdx(nextIndex);
      innerImg.src = eventDatabase[nextIndex].image;
    }, null, 0.6);

    // Phase 4 — Open
    tl.to(closeImg, { opacity: 0, duration: 0.52, ease: "power3.out" }, 0.72);
    tl.to(openImg,  { opacity: 1, duration: 0.52, ease: "power3.out" }, 0.72);
    tl.to(innerImg, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 0.88);
    tl.call(() => fireBurst(0.75), null, 0.78);
    tl.to(rings, { filter: "brightness(1) drop-shadow(0 0 6px rgba(230,184,0,0.5))", duration: 0.6 }, 0.85);
  };

  const handleNext = () => triggerTransition((currentIdx + 1) % eventDatabase.length);
  const handlePrev = () => triggerTransition((currentIdx - 1 + eventDatabase.length) % eventDatabase.length);

  const activeEvent = eventDatabase[displayIdx];

  // ── Timeline engine ──
  useEffect(() => {
    const tl        = timelineRef.current;
    const progress  = progressLineRef.current;
    const nodes     = nodesRef.current;
    if (!tl || !progress) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    nodes.forEach(n => { if (n) observer.observe(n); });

    const onScroll = () => {
      const rect = tl.getBoundingClientRect();
      const tp   = window.innerHeight * 0.6;
      if (rect.top < tp) {
        const pct = Math.min(Math.max(((tp - rect.top) / rect.height) * 100, 0), 100);
        progress.style.height = `${pct}%`;
        nodes.forEach(n => {
          if (!n) return;
          n.getBoundingClientRect().top < tp
            ? n.classList.add("active-marker", "visible")
            : n.classList.remove("active-marker");
        });
      } else {
        progress.style.height = "0%";
        nodes.forEach(n => { if (n) n.classList.remove("active-marker"); });
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  // ── Stats counter ──
  useEffect(() => {
    const el = statsContainerRef.current;
    if (!el || hasCounted) return;
    const count = () => {
      numbersRef.current.forEach(n => {
        if (!n) return;
        const target = parseInt(n.getAttribute("data-target"), 10);
        const inc    = target / (2000 / 16);
        let cur = 0;
        const id = setInterval(() => {
          cur += inc;
          if (cur >= target) {
            clearInterval(id);
            n.textContent = target >= 1000 ? target.toLocaleString("en-IN") : target;
            if (target === 3000 || target === 500) n.textContent += "+";
          } else {
            n.textContent = Math.floor(cur).toLocaleString("en-IN");
          }
        }, 16);
      });
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && !hasCounted) { count(); setHasCounted(true); } });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasCounted]);

  return (
    <div className="events-page-wrapper" ref={containerRef}>
      <div className="cosmic-bg">
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="cosmic-overlay"></div>
        <div className="nebula-red"></div>
        <div className="nebula-blue"></div>
      </div>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-title-container">
              <img src={titleCard} alt="Astra-X: Hall of Legends" className="hero-title-img" />
            </div>
            <p className="hero-subtitle">
              Step through the gateway. Prepare to enter the upcoming sagas of Astra-X and witness the high-tech battles, legendary challenges, and cosmic innovations that will define our new chapter.
            </p>
            <div className="hero-divider">
              <div className="line"></div>
              <div className="eye-of-agamotto">
                <img src={eyeOfAgamotto} alt="Eye of Agamotto" className="doctor-strange-eye" />
              </div>
              <div className="line"></div>
            </div>
          </div>
          <div className="scroll-indicator">
            <span className="mouse"><span className="wheel"></span></span>
            <span className="scroll-text">Scroll Down</span>
          </div>
        </section>

        {/* ── Mirror Dimension ── */}
        <section id="events" className="events-section">
          <div className="section-header">
            <h2 className="section-title">THE MIRROR DIMENSION</h2>
            <p className="section-subtitle">Traverse the fractured realities of our upcoming national-level sagas.</p>
          </div>

          <div className="agamotto-showcase">
            <div className="agamotto-eye-wrapper" ref={eyeWrapperRef}>
              {/* Rune rings */}
              <div className="rune-ring rune-ring-1" ref={runeRing1Ref}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="rune-tick"
                    style={{ transform: `rotate(${i * 30}deg) translateY(-50%)` }} />
                ))}
              </div>
              <div className="rune-ring rune-ring-2" ref={runeRing2Ref}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="rune-diamond"
                    style={{ transform: `rotate(${i * 45}deg) translateY(-50%)` }} />
                ))}
              </div>

              {/* Event image — fills wrapper, shows through transparent eye opening */}
              <div
                className="agamotto-inner-stage"
                onClick={handleEyeClick}
                role="button"
                tabIndex={0}
                aria-label="View event details"
                onKeyDown={e => e.key === "Enter" && handleEyeClick()}
              >
                <img
                  ref={eyeInnerImgRef}
                  src={eventDatabase[0].image}
                  alt={activeEvent.title}
                  className="agamotto-inner-img"
                />
              </div>

              {/* Close image — hidden by default */}
              <img ref={eyeCloseImgRef} src={agamottoClose} alt=""
                className="agamotto-eye-img agamotto-close-img" aria-hidden="true" />

              {/* Open image — visible by default */}
              <img ref={eyeOpenImgRef} src={agamottoOpen} alt="Eye of Agamotto"
                className="agamotto-eye-img agamotto-open-img" />

              {/* Particle burst */}
              <div className="agamotto-particles" aria-hidden="true">
                {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                  <span key={i} className="agamotto-particle"
                    ref={el => particleRefs.current[i] = el}
                    style={{ '--p-size': `${3 + Math.random() * 8}px`, '--p-hue': Math.random() < 0.65 ? '45' : '38' }} />
                ))}
              </div>

              {/* Nav buttons — inside wrapper */}
              <button className="agamotto-nav-btn prev" onClick={handlePrev} aria-label="Previous event">
                <span className="nav-arrow">❮</span>
              </button>
              <button className="agamotto-nav-btn next" onClick={handleNext} aria-label="Next event">
                <span className="nav-arrow">❯</span>
              </button>
            </div>

            {/* Click Guide */}
            <div className="agamotto-click-guide">
              <span className="guide-text">Click the core to reveal details</span>
            </div>

            {/* Dot indicators */}
            <div className="event-dots">
              {eventDatabase.map((_, i) => (
                <button
                  key={i}
                  className={`event-dot${i === currentIdx ? " active" : ""}`}
                  onClick={() => i !== currentIdx && triggerTransition(i)}
                  aria-label={`Go to ${eventDatabase[i].title}`}
                />
              ))}
            </div>
          </div>

          {/* Info card — modal overlay */}
          <div
            className="agamotto-info-card"
            ref={infoCardRef}
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            <button className="info-close-btn" onClick={closeInfo} aria-label="Close">✕</button>
            <div className="info-card-layout">
              <div className="info-image-col">
                <img src={activeEvent.image} alt={activeEvent.title} className="info-modal-image" />
              </div>
              <div className="info-text-col">
                <div className="info-badge">{activeEvent.badge}</div>
                <h3 className="info-title">{activeEvent.title}</h3>
                <p className="info-description">{activeEvent.description}</p>
                <div className="info-meta">
                  <div className="meta-item">
                    <span className="meta-label">Reward</span>
                    <strong className="meta-value">{activeEvent.prize}</strong>
                  </div>
                  <div className="meta-divider"></div>
                  <div className="meta-item">
                    <span className="meta-label">Participants</span>
                    <strong className="meta-value">{activeEvent.participants}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section id="timeline" className="timeline-section">
          <div className="section-header">
            <h2 className="section-title">CHRONOLOGY OF POWER</h2>
            <p className="section-subtitle">How Astra-X expanded its territory in the college event universe.</p>
          </div>
          <div className="timeline-container" ref={timelineRef}>
            <div className="timeline-line">
              <div className="timeline-progress" ref={progressLineRef}></div>
            </div>
            {[
              { year: 2025, title: "Multiverse Expansion",  desc: "Achieved a footprint of 600+ national participants. Expanded tech tracks into AI, Machine Learning, and Web3 integration, cementing Astra-X as a top regional tech conclave." },
              { year: 2024, title: "The Age of Iron",        desc: "Introduced bulletproof arena combat robots and speed drone piloting obstacles. Witnessed the heaviest bots colliding in a record-breaking spectacle." },
              { year: 2023, title: "Infinity Codex",         desc: "Initiated high-speed competitive programming and Cyber Security CTF battles. Developed custom capture-the-flag servers to challenge 500+ security enthusiasts." },
              { year: 2022, title: "Creative Dimension",     desc: "Pioneered UI/UX design masterclasses and dynamic 48-hour game jams, opening up Astra-X to digital designers and storytellers." },
              { year: 2021, title: "Quantum Genesis",        desc: "The spark that ignited the legacy. Conducted a fully virtual, cryptic puzzle-solving event that reached 800+ participants during challenging circumstances." },
            ].map((node, i) => (
              <div key={node.year} className="timeline-node" ref={el => nodesRef.current[i] = el}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{node.year}</span>
                  <h3 className="timeline-heading">{node.title}</h3>
                  <p className="timeline-body">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <section id="achievements" className="achievements-section" ref={statsContainerRef}>
          <div className="achievements-container">
            {[
              { target: 3000,   label: "Expected Heroes" },
              { target: 500,    label: "Projects to Deploy" },
              { target: 7,      label: "Upcoming Sagas" },
              { target: 500000, label: "Prizes to Win (₹)" },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number" data-target={stat.target} ref={el => numbersRef.current[i] = el}>0</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Events;
