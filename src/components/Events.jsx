import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Events.css";

// Assets
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

const eventDatabase = [
  {
    id: "debate", badge: "Tech Saga", title: "AI Technical Debate",
    image: eventDebate, prize: "₹40,000", participants: "200+",
    description: "An intense battle of minds pitching human logic against artificial intelligence algorithms."
  },
  {
    id: "tva", badge: "Quest Saga", title: "TVA: Variant Hunt",
    image: eventTva, prize: "₹60,000", participants: "500+",
    description: "A high-speed multiverse treasure hunt across complex temporal nodes."
  },
  {
    id: "technova", badge: "Innovation Challenge", title: "Technova",
    image: eventTechnova, prize: "₹80,000", participants: "350+",
    description: "A design and prototyping challenge aimed at bringing innovative tech solutions to life."
  },
  {
    id: "neural", badge: "Tech Saga", title: "Neural Knockout",
    image: eventNeural, prize: "₹50,000", participants: "300+",
    description: "A deep learning battle arena where custom neural network models will compete."
  },
  {
    id: "pixel", badge: "Design Saga", title: "Pixel Whisper",
    image: eventPixel, prize: "₹45,000", participants: "250+",
    description: "Where design parameters are generated purely by vocal commands."
  },
  {
    id: "nexus", badge: "Quest Saga", title: "Nexus Grid",
    image: eventNexus, prize: "₹35,000", participants: "400+",
    description: "A high-speed cyber bingo event designed to test algorithmic speed and basic tech trivia."
  },
  {
    id: "ideathon", badge: "Flagship Saga", title: "Ideathon",
    image: eventIdeathon, prize: "₹1,00,000", participants: "600+",
    description: "The crowning flagship event of Astra-X. Pitch revolutionary product concepts."
  }
];

function Events() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);

  // Mirror Slider Refs
  const slicesContainerRef = useRef(null);
  const ghostsContainerRef = useRef(null);
  const voidGridRef = useRef(null);
  const activeImgRef = useRef(null);
  const activeImgContainerRef = useRef(null);
  const detailsCardRef = useRef(null);
  const energyBorderRef = useRef(null);
  const ambientGlowRef = useRef(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const isAnimatingRef = useRef(false);
  const isDetailsOpenRef = useRef(false);

  // Counter State
  const [hasCounted, setHasCounted] = useState(false);
  const statsContainerRef = useRef(null);
  const numbersRef = useRef([]);

  // Timeline Refs
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const nodesRef = useRef([]);

  // --- 1. Background Particles ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let timelineThreads = [];
    let mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class TimelineThread {
      constructor(baseX) {
        this.baseX = baseX;
        this.amplitude = Math.random() * 25 + 15;
        this.wavelength = Math.random() * 150 + 120;
        this.phase = Math.random() * 100;
        this.speed = (Math.random() * 0.01 + 0.003) * (Math.random() < 0.5 ? 1 : -1);
        this.color = Math.random() < 0.35 ? "rgba(230, 184, 0, " : "rgba(0, 255, 136, ";
        this.alpha = Math.random() * 0.15 + 0.08;
        this.thickness = Math.random() * 1.5 + 0.6;
        this.nodes = [];
        const numNodes = Math.floor(canvas.height / 220);
        for (let i = 0; i < numNodes; i++) {
          this.nodes.push({
            yOffsetPercent: (i + Math.random()) / numNodes,
            size: Math.random() * 3.5 + 1.5,
            pulseSpeed: Math.random() * 0.03 + 0.01,
            pulsePhase: Math.random() * Math.PI
          });
        }
      }
      update() { this.phase += this.speed; }
      draw() {
        ctx.beginPath();
        ctx.lineWidth = this.thickness;
        let isFirst = true;
        for (let y = 0; y <= canvas.height; y += 15) {
          let waveX = this.baseX + Math.sin(y / this.wavelength + this.phase) * this.amplitude;
          if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - waveX;
            let dy = mouse.y - y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
              let force = (mouse.radius - distance) / mouse.radius;
              waveX += dx * force * 0.35;
            }
          }
          if (isFirst) { ctx.moveTo(waveX, y); isFirst = false; }
          else { ctx.lineTo(waveX, y); }
        }
        ctx.strokeStyle = this.color + this.alpha + ")";
        ctx.stroke();

        this.nodes.forEach(node => {
          let nodeY = node.yOffsetPercent * canvas.height;
          let nodeX = this.baseX + Math.sin(nodeY / this.wavelength + this.phase) * this.amplitude;
          if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - nodeX;
            let dy = mouse.y - nodeY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
              let force = (mouse.radius - distance) / mouse.radius;
              nodeX += dx * force * 0.35;
            }
          }
          node.pulsePhase += node.pulseSpeed;
          let currentSize = node.size + Math.sin(node.pulsePhase) * 1.5;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = this.color + (this.alpha + 0.3) + ")";
          ctx.shadowColor = this.color.includes("230") ? "rgba(230, 184, 0, 0.8)" : "rgba(0, 255, 136, 0.8)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      timelineThreads = [];
      const gap = 160;
      const totalThreads = Math.ceil(canvas.width / gap) + 1;
      for (let i = 0; i < totalThreads; i++) {
        timelineThreads.push(new TimelineThread((i - 0.5) * gap));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timelineThreads.forEach(t => { t.update(); t.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- 2. Mirror Volumetric Particles ---
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -Math.random() * 0.7 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.25;
        this.color = Math.random() < 0.4 ? "rgba(0, 255, 136, " : "rgba(0, 204, 102, ";
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- 3. Timeline Engine ---
  useEffect(() => {
    const timeline = timelineRef.current;
    const progressLine = progressLineRef.current;
    const nodes = nodesRef.current;
    if (!timeline || !progressLine) return;

    const nodeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    nodes.forEach(node => {
      if (node) nodeObserver.observe(node);
    });

    const handleScroll = () => {
      const rect = timeline.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.6;
      if (rect.top < triggerPoint) {
        const relativePosition = triggerPoint - rect.top;
        const percentage = Math.min(Math.max((relativePosition / rect.height) * 100, 0), 100);
        progressLine.style.height = `${percentage}%`;

        nodes.forEach(node => {
          if (!node) return;
          const nodeRect = node.getBoundingClientRect();
          if (nodeRect.top < triggerPoint) {
            node.classList.add("active-marker", "visible");
          } else {
            node.classList.remove("active-marker");
          }
        });
      } else {
        progressLine.style.height = "0%";
        nodes.forEach(node => {
          if (node) node.classList.remove("active-marker");
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      nodeObserver.disconnect();
    };
  }, []);

  // --- 4. Stats Counter ---
  useEffect(() => {
    const statsContainer = statsContainerRef.current;
    if (!statsContainer || hasCounted) return;

    const startCounting = () => {
      numbersRef.current.forEach(num => {
        if (!num) return;
        const target = parseInt(num.getAttribute("data-target"), 10);
        const increment = target / (2000 / 16);
        let current = 0;
        const counterInterval = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(counterInterval);
            num.textContent = target >= 1000 ? target.toLocaleString("en-IN") : target;
            if (target === 3000 || target === 500) num.textContent += "+";
          } else {
            num.textContent = Math.floor(current).toLocaleString("en-IN");
          }
        }, 16);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          startCounting();
          setHasCounted(true);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
    return () => observer.disconnect();
  }, [hasCounted]);

  // --- Mirror Dimension Logic Helper ---
  const createSlices = (imageSrc, container, numSlices = 8) => {
    container.innerHTML = "";
    const slices = [];
    for (let i = 0; i < numSlices; i++) {
      const slice = document.createElement("div");
      slice.className = "mirror-slice";
      slice.style.left = `${(i / numSlices) * 100}%`;
      slice.style.width = `${100 / numSlices}%`;
      slice.style.backgroundImage = `url(${imageSrc})`;
      slice.style.backgroundSize = `${numSlices * 100}% 100%`;
      slice.style.backgroundPosition = `${(i / (numSlices - 1)) * 100}% 0%`;
      container.appendChild(slice);
      slices.push(slice);
    }
    return slices;
  };

  const triggerMirrorTransition = (nextIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const currentData = eventDatabase[currentIdx];
    const nextData = eventDatabase[nextIndex];
    const frame = containerRef.current.querySelector(".mirror-frame");
    const crackPaths = containerRef.current.querySelectorAll(".crack-path");

    if (isDetailsOpenRef.current) {
      gsap.to(detailsCardRef.current, { opacity: 0, y: 15, duration: 0.35, ease: "power2.out" });
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentIdx(nextIndex);
        isAnimatingRef.current = false;
        
        activeImgRef.current.src = nextData.image;
        activeImgRef.current.alt = nextData.title;
        activeImgContainerRef.current.classList.add("active");
        
        slicesContainerRef.current.innerHTML = "";
        ghostsContainerRef.current.innerHTML = "";
        voidGridRef.current.classList.remove("active");
        
        gsap.to(energyBorderRef.current, { opacity: 0, duration: 0.5 });
        gsap.to(ambientGlowRef.current, { opacity: 0.15, duration: 0.8 });
        
        if (isDetailsOpenRef.current) {
          gsap.to(detailsCardRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
        }
      }
    });

    timeline.call(() => {
      gsap.to(energyBorderRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(frame, {
        x: () => (Math.random() - 0.5) * 6,
        y: () => (Math.random() - 0.5) * 6,
        duration: 0.05,
        repeat: 8,
        yoyo: true,
        clearProps: "x,y",
        ease: "none"
      });
    }, null, 0);

    timeline.call(() => {
      gsap.to(crackPaths, { opacity: 0.9, duration: 0.4, stagger: { each: 0.04, from: "center" }, ease: "sine.inOut" });
    }, null, 0.3);

    timeline.call(() => {
      const currentSlices = createSlices(currentData.image, slicesContainerRef.current, 8);
      activeImgContainerRef.current.classList.remove("active");
      voidGridRef.current.classList.add("active");
      
      gsap.to(".volumetric-fog", { background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.16) 0%, transparent 80%)", duration: 0.4 });

      gsap.to(currentSlices, {
        rotationY: (i) => i % 2 === 0 ? 50 + Math.random() * 20 : -50 - Math.random() * 20,
        rotationX: () => (Math.random() - 0.5) * 25,
        z: () => -350 - Math.random() * 200,
        y: (i) => i % 2 === 0 ? 55 : -55,
        x: (i) => (i - 3.5) * 20,
        opacity: 0, duration: 1.25,
        stagger: { amount: 0.35, from: "center" },
        ease: "power2.inOut"
      });

      const ghosts1 = createSlices(currentData.image, ghostsContainerRef.current, 8);
      gsap.set(ghosts1, { opacity: 0.25, z: -250 });
      gsap.to(ghosts1, { rotationY: (i) => i % 2 === 0 ? 65 : -65, z: -500, opacity: 0, duration: 1.1, stagger: 0.025, ease: "power2.inOut" });

      const ghosts2Layer = document.createElement("div");
      ghostsContainerRef.current.appendChild(ghosts2Layer);
      const ghosts2 = createSlices(currentData.image, ghosts2Layer, 8);
      gsap.set(ghosts2, { opacity: 0.12, z: -500 });
      gsap.to(ghosts2, { rotationY: (i) => i % 2 === 0 ? 75 : -75, z: -850, opacity: 0, duration: 1.2, stagger: 0.025, ease: "power2.inOut" });
    }, null, 0.7);

    timeline.call(() => {
      const nextSlices = createSlices(nextData.image, slicesContainerRef.current, 8);
      gsap.set(nextSlices, {
        rotationY: (i) => i % 2 === 0 ? -60 : 60,
        rotationX: () => (Math.random() - 0.5) * 40,
        z: -800, y: (i) => i % 2 === 0 ? -85 : 85,
        x: (i) => (i - 3.5) * 30, opacity: 0
      });
      gsap.to(nextSlices, { rotationY: 0, rotationX: 0, z: 0, y: 0, x: 0, opacity: 1, duration: 1.3, stagger: { amount: 0.35, from: "center" }, ease: "power3.inOut" });
    }, null, 1.2);

    timeline.call(() => {
      gsap.to(crackPaths, { opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(".volumetric-fog", { background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 70%)", duration: 0.85 });
    }, null, 2.0);

    timeline.to({}, { duration: 2.5 });
  };

  const handleNext = () => triggerMirrorTransition((currentIdx + 1) % eventDatabase.length);
  const handlePrev = () => triggerMirrorTransition((currentIdx - 1 + eventDatabase.length) % eventDatabase.length);

  const toggleDetails = (open) => {
    isDetailsOpenRef.current = open;
    const detailsCard = detailsCardRef.current;
    if (open) {
      gsap.to(detailsCard, {
        opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
        onStart: () => { detailsCard.style.pointerEvents = "auto"; detailsCard.style.visibility = "visible"; }
      });
    } else {
      gsap.to(detailsCard, {
        opacity: 0, y: 15, duration: 0.4, ease: "power2.inOut",
        onComplete: () => { detailsCard.style.pointerEvents = "none"; detailsCard.style.visibility = "hidden"; }
      });
    }
  };

  const activeEvent = eventDatabase[currentIdx];

  return (
    <div className="events-page-wrapper" ref={containerRef}>
      <canvas id="particle-canvas" ref={canvasRef}></canvas>
      
      <div className="cosmic-bg">
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="cosmic-overlay"></div>
        <div className="nebula-red"></div>
        <div className="nebula-blue"></div>
      </div>

      <main>
        {/* Hero Section */}
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
                    <div className="eye-of-agamotto" aria-label="Eye of Agamotto">
                        <img src={eyeOfAgamotto} alt="Eye of Agamotto" className="doctor-strange-eye" />
                    </div>
                    <div className="line"></div>
                </div>
            </div>
            <div className="scroll-indicator">
                <span className="mouse">
                    <span className="wheel"></span>
                </span>
                <span className="scroll-text">Scroll Down</span>
            </div>
        </section>

        {/* Events Mirror Dimension Showcase */}
        <section id="events" className="events-section">
          <div className="section-header">
            <h2 className="section-title">THE MIRROR DIMENSION</h2>
            <p className="section-subtitle">Traverse the fractured realities of our upcoming national-level sagas.</p>
          </div>
          <div className="mirror-slider-container">
            <div className="mirror-frame" onMouseEnter={() => !isAnimatingRef.current && gsap.to(ambientGlowRef.current, { opacity: 0.35, duration: 0.5 })} onMouseLeave={() => !isAnimatingRef.current && gsap.to(ambientGlowRef.current, { opacity: 0.15, duration: 0.5 })}>
              <div className="frame-energy-border" ref={energyBorderRef}></div>
              <div className="frame-ambient-glow" ref={ambientGlowRef}></div>
              <div className="volumetric-fog"></div>
              <canvas id="mirror-particle-canvas" ref={particleCanvasRef}></canvas>

              <svg className="crack-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path className="crack-path" d="M500,500 L150,150" />
                <path className="crack-path" d="M500,500 L850,150" />
                <path className="crack-path" d="M500,500 L850,850" />
                <path className="crack-path" d="M500,500 L150,850" />
                <path className="crack-path" d="M500,500 L500,80" />
                <path className="crack-path" d="M500,500 L500,920" />
                <path className="crack-path" d="M500,500 L80,500" />
                <path className="crack-path" d="M500,500 L920,500" />
                <path className="crack-path" d="M500,280 L650,390 L500,500 L350,390 Z" />
                <path className="crack-path" d="M500,720 L650,610 L500,500 L350,610 Z" />
                <path className="crack-path" d="M500,180 L720,340 L500,500 L280,340 Z" />
                <path className="crack-path" d="M500,820 L720,660 L500,500 L280,660 Z" />
              </svg>

              <div className="mirror-void" ref={voidGridRef}>
                <div className="void-grid-floor"></div>
                <div className="void-grid-ceiling"></div>
                <div className="void-portal-ring"></div>
              </div>

              <div className="mirror-stage" onClick={() => !isAnimatingRef.current && toggleDetails(!isDetailsOpenRef.current)}>
                <div className="mirror-slices-container" ref={slicesContainerRef}></div>
                <div className="mirror-active-image-container active" ref={activeImgContainerRef}>
                  <img id="mirror-active-image" src={activeEvent.image} alt={activeEvent.title} ref={activeImgRef} />
                </div>
                <div className="mirror-ghosts-container" ref={ghostsContainerRef}></div>
                <div className="stage-border-overlay"></div>
              </div>

              <button className="mirror-nav-btn prev" onClick={handlePrev}>
                <span className="arrow">&#x276E;</span>
              </button>
              <button className="mirror-nav-btn next" onClick={handleNext}>
                <span className="arrow">&#x276F;</span>
              </button>

              <div className="mirror-details-card" ref={detailsCardRef} onClick={(e) => { e.stopPropagation(); toggleDetails(false); }} style={{ opacity: 0, y: 15, pointerEvents: "none", visibility: "hidden" }}>
                <div className="details-badge">{activeEvent.badge}</div>
                <h3 className="details-title">{activeEvent.title}</h3>
                <p className="details-description">{activeEvent.description}</p>
                <div className="details-meta">
                  <div className="meta-item">
                    <span className="meta-label">REWARD</span>
                    <strong className="meta-value">{activeEvent.prize}</strong>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">EXPECTED PARTICIPANTS</span>
                    <strong className="meta-value">{activeEvent.participants}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline / Legacy Section */}
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
              { year: 2025, title: "Multiverse Expansion", desc: "Achieved a footprint of 600+ national participants. Expanded tech tracks into AI, Machine Learning, and Web3 integration, cementing Astra-X as a top regional tech conclave." },
              { year: 2024, title: "The Age of Iron", desc: "Introduced bulletproof arena combat robots and speed drone piloting obstacles. Witnessed the heaviest bots colliding in a record-breaking spectacle." },
              { year: 2023, title: "Infinity Codex", desc: "Initiated high-speed competitive programming and Cyber Security CTF battles. Developed custom capture-the-flag servers to challenge 500+ security enthusiasts." },
              { year: 2022, title: "Creative Dimension", desc: "Pioneered UI/UX design masterclasses and dynamic 48-hour game jams, opening up Astra-X to digital designers and storytellers." },
              { year: 2021, title: "Quantum Genesis", desc: "The spark that ignited the legacy. Conducted a fully virtual, cryptic puzzle-solving event that reached 800+ participants during challenging circumstances." }
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

        {/* Stats / Upcoming Targets */}
        <section id="achievements" className="achievements-section" ref={statsContainerRef}>
          <div className="achievements-container">
            {[
              { target: 3000, label: "Expected Heroes" },
              { target: 500, label: "Projects to Deploy" },
              { target: 7, label: "Upcoming Sagas" },
              { target: 500000, label: "Prizes to Win (₹)" }
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
