import "../styles/Pages.css";

// src/components/Events.jsx

function Events() {
  const eventsList = [
    {
      id: 1,
      title: "Stark Expo Hackathon",
      tag: "Time Stone Division",
      tagColor: "#3aff8f",
      description: "Assemble the next generation of autonomous flight controllers and localized energy grid displays. A 36-hour sprint judged by Stark Industries tech veterans.",
      prize: "$10,000 + Internship",
    },
    {
      id: 2,
      title: "Wakandan Cryptographic Trial",
      tag: "Reality Stone Division",
      tagColor: "#ff3e70",
      description: "Decrypt ancient Vibranium matrix logs, patch security vulnerabilities in the Wakanda Design Group mainframe, and escape the mirror firewall.",
      prize: "$7,500 + Tech Gear",
    },
    {
      id: 3,
      title: "Sanctum Sanctorum CTF",
      tag: "Power Stone Division",
      tagColor: "#a872ff",
      description: "Protect the Sanctum Database from multi-dimensional DDOS incursions. Decode magical seals and build defense scripts against dark magic injections.",
      prize: "$5,000 + Mystic Artifact",
    }
  ];

  return (
    <div className="page-content">
      <h2 className="page-title">Assembled Events</h2>
      <p className="page-subtitle">Unleash your superpowers across our competitive tech battles</p>
      
      <div className="cards-grid">
        {eventsList.map(event => (
          <div key={event.id} className="event-card" style={{ "--card-stone-color": event.tagColor }}>
            <div className="card-glow-overlay" style={{ background: `radial-gradient(circle at top right, ${event.tagColor}1e, transparent 50%)` }}></div>
            <div className="card-badge" style={{ color: event.tagColor, borderColor: event.tagColor, boxShadow: `0 0 10px ${event.tagColor}44` }}>
              {event.tag}
            </div>
            <h3>{event.title}</h3>
            <p className="desc">{event.description}</p>
            <div className="card-footer">
              <span className="prize">Prize Pool: <strong>{event.prize}</strong></span>
              <button className="card-btn" style={{ borderColor: event.tagColor, color: event.tagColor }}>
                Join Assembly
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
