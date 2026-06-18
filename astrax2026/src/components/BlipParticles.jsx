import { useEffect, useRef } from "react";

// src/components/BlipParticles.jsx

function BlipParticles({ color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        // Spawn more heavily in the lower 70% of the screen
        this.y = Math.random() * (height * 0.7) + (height * 0.3);
        this.size = Math.random() * 3.5 + 1;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = -(Math.random() * 4.5 + 2); // drift up rapidly like ashes
        this.alpha = 1;
        this.decay = Math.random() * 0.018 + 0.012; // fade rate
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = [];
    // Spawn a large initial burst
    for (let i = 0; i < 450; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuously spawn some new drifting particles to keep the animation alive
      if (particles.length < 600) {
        for (let i = 0; i < 8; i++) {
          particles.push(new Particle());
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if (p.alpha <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default BlipParticles;
