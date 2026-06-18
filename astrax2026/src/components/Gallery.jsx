import "../styles/Pages.css";

// src/components/Gallery.jsx

function Gallery() {
  const monitors = [
    { id: 1, label: "ARK REACTOR DESIGN", status: "STABLE", code: "ARC-001", color: "#ffe14c" },
    { id: 2, label: "WAKANDAN VIBRANIUM GRID", status: "ENCRYPTED", code: "VIB-992", color: "#3cb6ff" },
    { id: 3, label: "MULTIVERSAL PORTAL TELEMETRY", status: "ACTIVE", code: "PTL-451", color: "#a872ff" },
    { id: 4, label: "QUANTUM TUNNEL FLUX", status: "STANDBY", code: "QTM-108", color: "#ff8e3c" },
    { id: 5, label: "SHIELD DATA NETWORK", status: "SECURE", code: "SHD-509", color: "#3aff8f" },
    { id: 6, label: "AVENGERS MAIN COMMUNICATOR", status: "ONLINE", code: "AVG-3000", color: "#ff3e70" }
  ];

  return (
    <div className="page-content">
      <h2 className="page-title">Holographic Archives</h2>
      <p className="page-subtitle">Telemetry logs, blueprints, and past operations monitoring</p>
      
      <div className="gallery-grid">
        {monitors.map(m => (
          <div key={m.id} className="gallery-card" style={{ "--monitor-color": m.color }}>
            <div className="grid-overlay"></div>
            <div className="card-top">
              <span className="code">{m.code}</span>
              <span className="status" style={{ color: m.color }}>{m.status}</span>
            </div>
            <div className="card-center">
              <div className="hologram-circle" style={{ borderColor: m.color, boxShadow: `0 0 15px ${m.color}33` }}>
                <div className="inner-ring" style={{ borderLeftColor: m.color }}></div>
              </div>
            </div>
            <div className="card-bottom">
              <h4>{m.label}</h4>
              <div className="scanline"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
