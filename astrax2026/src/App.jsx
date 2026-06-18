import { useState } from "react";
import "./App.css";
import "./styles/Pages.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import AboutUs from "./components/AboutUs";
import Workshops from "./components/Workshops";
import Gallery from "./components/Gallery";
import Sponsors from "./components/Sponsors";
import BlipParticles from "./components/BlipParticles";

import bgVideo from "./assets/hero-video.mp4";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isBlipping, setIsBlipping] = useState(false);
  const [displayTab, setDisplayTab] = useState("Home");
  const [stoneColor, setStoneColor] = useState("#a872ff"); // default Power (purple)

  const stoneColors = {
    Home: "#a872ff",       // Power (Purple)
    Events: "#3aff8f",     // Time (Green)
    "About Us": "#ff3e70", // Reality (Red)
    Workshops: "#ff8e3c",  // Soul (Orange)
    Gallery: "#ffe14c",    // Mind (Yellow)
    Sponsors: "#3cb6ff",   // Space (Blue)
  };

  const handleTabChange = (tabName) => {
    if (tabName === activeTab || isBlipping) return;

    setStoneColor(stoneColors[tabName] || "#a872ff");
    setIsBlipping(true);
    setActiveTab(tabName);

    // Halfway through the blip transition, swap the actual displayed page component
    setTimeout(() => {
      setDisplayTab(tabName);
    }, 600);

    // Reset blip status
    setTimeout(() => {
      setIsBlipping(false);
    }, 1200);
  };

  return (
    <div className="app">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="bg-video"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className={`page-container ${isBlipping ? "blipping" : ""}`}>
        {displayTab === "Home" && <Hero />}
        {displayTab === "Events" && <Events />}
        {displayTab === "About Us" && <AboutUs />}
        {displayTab === "Workshops" && <Workshops />}
        {displayTab === "Gallery" && <Gallery />}
        {displayTab === "Sponsors" && <Sponsors />}
      </div>

      {isBlipping && <BlipParticles color={stoneColor} />}
    </div>
  );
}

export default App;