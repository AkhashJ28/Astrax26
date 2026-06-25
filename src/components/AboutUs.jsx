import aboutVideo from "../assets/about-bg.mp4";
import "../styles/AboutUs.css";

function AboutUs({ setActivePage }) {
  const missionPoints = [
    "To create next generation leaders by effective teaching learning methodologies and instill scientific spark in them to meet the global challenges.",
    "To transform lives through deployment of emerging technology, novelty and sustainability.",
    "To inculcate human values and ethical principles to cater to the societal needs.",
    "To contribute towards the research ecosystem by providing a suitable, effective platform for interaction between industry, academia and R & D establishments.",
    "To nurture incubation centers enabling structured entrepreneurship and start-ups."
  ];

  return (
    <section className="about-section">
      {/* Background Video Layer */}
      <video autoPlay muted loop playsInline className="about-video-bg">
        <source src={aboutVideo} type="video/mp4" />
      </video>
      <div className="about-video-overlay"></div>

      {/* Red ambient background glows */}
      <div className="about-glow about-glow-1"></div>
      <div className="about-glow about-glow-2"></div>

      <div className="about-container">
        {/* Header Bar */}
        <div className="about-header-bar">
          <h2 className="about-page-title">ABOUT US</h2>
        </div>

        {/* Main Grid Content */}
        <div className="about-grid">
          {/* Card 1: About CIT */}
          <div className="about-card cit-card">
            <div className="card-corners">
              <span className="corner top-left"></span>
              <span className="corner top-right"></span>
              <span className="corner bottom-left"></span>
              <span className="corner bottom-right"></span>
            </div>
            <div className="card-badge red-badge">INSTITUTION</div>
            <h3 className="card-title">Chennai Institute of Technology</h3>
            <p className="card-text">
              Chennai Institute of Technology is a leading institution dedicated to academic excellence, 
              innovation, and research. The institute provides a dynamic learning environment that 
              fosters technical expertise, creativity, and professional growth. 
            </p>
            <p className="card-text text-secondary">
              With a strong focus on industry-oriented education and holistic development, CIT empowers 
              students to become skilled engineers, innovators, and responsible leaders who contribute 
              to society and technological advancement.
            </p>
            <div className="cit-stats">
              <div className="stat-item">
                <span className="stat-value">A++</span>
                <span className="stat-label">NAAC Grade</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Top 100</span>
                <span className="stat-label">NIRF Ranking</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Innovation Focused</span>
              </div>
            </div>
          </div>

          {/* Column 2: Vision & Mission */}
          <div className="about-side-column">
            {/* Card 2: Vision */}
            <div className="about-card vision-card">
              <div className="card-corners">
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="corner bottom-right"></span>
              </div>
              <div className="card-badge red-badge">VISION</div>
              <h3 className="card-title">Our Vision</h3>
              <p className="vision-quote">
                “To be an eminent centre for Academia, Industry and Research by imparting knowledge, 
                relevant practices and inculcating human values to address global challenges through 
                novelty and sustainability.”
              </p>
            </div>

            {/* Card 3: Mission */}
            <div className="about-card mission-card">
              <div className="card-corners">
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="corner bottom-right"></span>
              </div>
              <div className="card-badge red-badge">MISSION</div>
              <h3 className="card-title">Our Mission</h3>
              <ul className="mission-list">
                {missionPoints.map((point, index) => (
                  <li key={index} className="mission-item">
                    <div className="mission-number">0{index + 1}</div>
                    <p className="mission-text">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
