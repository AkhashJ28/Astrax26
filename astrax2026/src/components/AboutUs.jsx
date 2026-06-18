import "../styles/Pages.css";

// src/components/AboutUs.jsx

function AboutUs() {
  return (
    <div className="page-content">
      <h2 className="page-title">Mission Dossier</h2>
      <p className="page-subtitle">S.H.I.E.L.D. Archives | Classification: Level Alpha Clearance</p>

      <div className="shield-dossier">
        <div className="dossier-header">
          <span className="clearance-badge">LEVEL 7 CLEARANCE ONLY</span>
          <span className="status-badge">DIRECTIVE: ACTIVE</span>
        </div>
        <div className="dossier-body">
          <div className="dossier-section">
            <h4>[ PROJECT DIRECTIVE ]</h4>
            <p>
              Under threat of rising multiversal and digital systemic disruptions, the **ASTRA X 2026 Innovation Assembly** was established. 
              Our mission: Gather the world's most brilliant tech-heroes to prototype, compile, and deploy defensive and experimental systems 
              capable of shielding the civilian networks.
            </p>
          </div>
          
          <div className="dossier-section">
            <h4>[ OPERATIONAL SECTORS ]</h4>
            <ul>
              <li><strong>Stark UI Labs:</strong> Testing pilot-grade flight telemetry displays and autonomous AI systems.</li>
              <li><strong>Wakanda Design Core:</strong> Interfacing with Vibranium nanotech fabrics and cryptographically secure networks.</li>
              <li><strong>Mystic Web Sanctum:</strong> Building defense triggers to resist multi-dimensional database injections.</li>
            </ul>
          </div>
          
          <div className="dossier-footer">
            <p className="signature">AUTHORIZATION: <strong>NICHOLAS J. FURY (DIRECTOR)</strong></p>
            <div className="approved-stamp">APPROVED</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
