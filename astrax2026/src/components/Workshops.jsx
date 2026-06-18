import "../styles/Pages.css";

// src/components/Workshops.jsx

function Workshops() {
  const workshopsList = [
    {
      id: 1,
      instructor: "Tony Stark",
      title: "Holographic UI/UX Design",
      tag: "Soul Stone Core",
      tagColor: "#ff8e3c",
      description: "Learn to design interactive 3D telemetry displays, holographic gesture controllers, and modular AI interface overlays using advanced CSS coordinates.",
      time: "June 25th | 14:00 IST",
    },
    {
      id: 2,
      instructor: "Dr. Bruce Banner",
      title: "Gamma-Scale Heavy Compute",
      tag: "Power Stone Core",
      tagColor: "#a872ff",
      description: "Harness massive computation clusters, optimize server response loads, and compile heavy algorithms without collapsing the network backend.",
      time: "June 26th | 10:00 IST",
    },
    {
      id: 3,
      instructor: "Doctor Strange",
      title: "State Portals & Dimension Routing",
      tag: "Time Stone Core",
      tagColor: "#3aff8f",
      description: "Master multi-dimensional React state routing, portal rendering, and time-travel debugging through complex application universes.",
      time: "June 27th | 16:30 IST",
    }
  ];

  return (
    <div className="page-content">
      <h2 className="page-title">Technical Labs</h2>
      <p className="page-subtitle">Learn directly from the commanders of the technological frontlines</p>
      
      <div className="cards-grid">
        {workshopsList.map(ws => (
          <div key={ws.id} className="event-card" style={{ "--card-stone-color": ws.tagColor }}>
            <div className="card-glow-overlay" style={{ background: `radial-gradient(circle at top right, ${ws.tagColor}1e, transparent 50%)` }}></div>
            <div className="card-badge" style={{ color: ws.tagColor, borderColor: ws.tagColor, boxShadow: `0 0 10px ${ws.tagColor}44` }}>
              {ws.tag}
            </div>
            <span className="instructor">INSTRUCTOR: <strong>{ws.instructor}</strong></span>
            <h3>{ws.title}</h3>
            <p className="desc">{ws.description}</p>
            <div className="card-footer">
              <span className="time">{ws.time}</span>
              <button className="card-btn" style={{ borderColor: ws.tagColor, color: ws.tagColor }}>
                Acquire Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workshops;
