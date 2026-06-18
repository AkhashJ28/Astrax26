import "../styles/Pages.css";

// src/components/Sponsors.jsx

function Sponsors() {
  const sponsorsList = [
    { id: 1, name: "Stark Industries", sector: "Defense & Energy Core", color: "#3cb6ff" },
    { id: 2, name: "Pym Technologies", sector: "Quantum Scaling & Logic", color: "#ff8e3c" },
    { id: 3, name: "Wakanda Design Group", sector: "Nano-Tech & Vibranium Research", color: "#a872ff" },
    { id: 4, name: "Oscorp Biotech", sector: "Bio-Genetics & Cybernetics", color: "#3aff8f" },
    { id: 5, name: "S.H.I.E.L.D.", sector: "Security & Global Intelligence Coordination", color: "#ff3e70" }
  ];

  return (
    <div className="page-content">
      <h2 className="page-title">Sponsorship Hub</h2>
      <p className="page-subtitle">Under the patronage of Earth's leading technical corporations</p>
      
      <div className="sponsors-list">
        {sponsorsList.map(sp => (
          <div key={sp.id} className="sponsor-item" style={{ "--sponsor-color": sp.color }}>
            <div className="sponsor-border" style={{ borderColor: `${sp.color}33` }}></div>
            <h3 style={{ textShadow: `0 0 10px ${sp.color}44` }}>{sp.name}</h3>
            <span className="sector">{sp.sector}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sponsors;
