import { useState, useEffect, useRef } from "react";    

const timelineData = [
  {
    month: "MAY",
    label: "05",
    color: "#1a1a1a",
    focus: "Transition & Archive Building",
    secretary: "Organizes past documents and builds centralized filing system with consistent naming conventions",
    innovation: "Introduces folder templates, document naming standards, and a master index spreadsheet",
    icon: "◈"
  },
  {
    month: "JUNE",
    label: "06",
    color: "#1a1a1a",
    focus: "Planning & Internal Strategy Meetings",
    secretary: "Tracks meeting agendas, records decisions, and builds the internal organizational calendar",
    innovation: "Launches anonymous feedback form and begins alumni groundwork via LinkedIn outreach",
    icon: "◉"
  },
  {
    month: "JULY",
    label: "07",
    color: "#1a1a1a",
    focus: "Finalizing Logistics & Recruitment Strategy",
    secretary: "Ensures documentation compliance, manages digital assets and forms readiness",
    innovation: "Builds comprehensive contact directories and finalizes all systems before fall",
    icon: "◎"
  },
  {
    month: "AUG",
    label: "08",
    color: "#1a1a1a",
    focus: "Internal Readiness & Return to Campus",
    secretary: "Activates communication infrastructure; initializes member onboarding documentation",
    innovation: "Prepares newsletter framework and email list segmentation for launch",
    icon: "◍"
  },
  {
    month: "SEPT",
    label: "09",
    color: "#1a1a1a",
    focus: "Recruitment Events — Interest Meeting, Plug Walk, Walk Clinic",
    secretary: "Tracks attendance, engagement metrics, and recruitment pipeline in real time",
    innovation: "Launches Newsletter #1 and cross-department integration protocols",
    icon: "●"
  },
  {
    month: "OCT",
    label: "10",
    color: "#1a1a1a",
    focus: "Development Events — Resume Ready & Professional Workshops",
    secretary: "Logs participation data, distributes event evaluations, and tracks member growth",
    innovation: "Introduces Opportunity Tracking System to equalize access across the membership",
    icon: "◐"
  },
  {
    month: "NOV",
    label: "11",
    color: "#1a1a1a",
    focus: "Community Events — FaMM Friday, BRAGxMOTM",
    secretary: "Audits participation consistency, reviews branding alignment across departments",
    innovation: "Proposes the Creative Direction Committee for unified brand governance",
    icon: "◑"
  },
  {
    month: "DEC",
    label: "12",
    color: "#1a1a1a",
    focus: "Wrap-Up & End-of-Year Documentation",
    secretary: "Compiles full annual report, archives season materials, and conducts exit interviews",
    innovation: "Launches alumni database and submits spring initiative proposals to E-Board",
    icon: "◒"
  }
];

const systemsData = [
  {
    title: "Monthly Newsletter",
    tag: "COMMUNICATION",
    purpose: "Create a consistent, branded communication channel that reaches every member, prospect, and alumni.",
    how: "Published monthly by the Secretary. Covers upcoming events, department highlights, member spotlights, and org announcements. Distributed via email and GroupMe.",
    impact: "Eliminates information silos. Every member — regardless of department — receives the same baseline information."
  },
  {
    title: "Anonymous Feedback",
    tag: "CULTURE",
    purpose: "Give every member a safe, low-barrier channel to surface concerns, ideas, or critiques.",
    how: "Google Form distributed monthly. Secretary aggregates themes and presents anonymized summaries to E-Board. Tracked in a running log.",
    impact: "Transforms unspoken tension into actionable data. Builds trust between leadership and membership."
  },
  {
    title: "Opportunity Tracking",
    tag: "EQUITY",
    purpose: "Ensure modeling gigs, editorial features, partnerships, and paid opportunities reach all eligible members — not just the most visible.",
    how: "Secretary maintains a shared spreadsheet of all incoming opportunities. Tagged by type, eligibility, and deadline. Members opt in; Secretary monitors distribution.",
    impact: "Closes the access gap. Every member has equal visibility into what's available."
  },
  {
    title: "Documentation & Archive",
    tag: "LEGACY",
    purpose: "Preserve institutional knowledge so the org doesn't restart from zero each leadership cycle.",
    how: "Centralized Google Drive with strict naming conventions: [YEAR_SEMESTER_DEPT_TITLE]. Secretary conducts quarterly audits. End-of-year archive is handed off at transition.",
    impact: "Future boards inherit a fully functional system. History becomes a competitive advantage."
  },
  {
    title: "Alumni Network",
    tag: "GROWTH",
    purpose: "Transform former members into an active network of mentors, collaborators, and industry connectors.",
    how: "Secretary builds and maintains a LinkedIn alumni directory. Annual alumni panel hosted in November. Monthly email digest keeps alumni informed.",
    impact: "MOTM becomes a career-long affiliation, not just a college org. Alumni feed the pipeline."
  }
];

const problemSolutions = [
  { problem: "Lack of Communication", solution: "Structured monthly newsletter keeps all members informed and aligned", icon: "01" },
  { problem: "Fragmented 'FaMM' Culture", solution: "Cross-department integration events and shared communication channels", icon: "02" },
  { problem: "Unequal Opportunity Distribution", solution: "Centralized opportunity tracking system with equitable access protocols", icon: "03" },
  { problem: "Weak Alumni Engagement", solution: "Alumni panels, directory database, and regular touchpoint communications", icon: "04" },
  { problem: "Inconsistent Branding", solution: "Creative Direction Committee overseeing brand standards across all outputs", icon: "05" }
];

const mockData = {
  events: [
    { name: "Interest Meeting", attendance: 87, cap: 100 },
    { name: "Plug Walk", attendance: 64, cap: 80 },
    { name: "Walk Clinic", attendance: 72, cap: 80 },
    { name: "Resume Ready", attendance: 58, cap: 75 },
    { name: "FaMM Friday", attendance: 91, cap: 100 },
    { name: "BRAGxMOTM", attendance: 79, cap: 90 },
  ],
  engagement: [
    { dept: "Models", score: 92 },
    { dept: "Photography", score: 78 },
    { dept: "Creative", score: 85 },
    { dept: "Marketing", score: 71 },
    { dept: "Styling", score: 88 },
  ]
};

export default function MOTMApp() {
  const [activeMonth, setActiveMonth] = useState(null);
  const [view, setView] = useState("exec");
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const navItems = [
    { id: "timeline", label: "Timeline" },
    { id: "systems", label: "Systems" },
    { id: "problems", label: "Strategy" },
    { id: "data", label: "Data" },
  ];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#f5f4f0", color: "#0a0a0a", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }

        .nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #666;
          cursor: pointer;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s;
          text-decoration: none;
          border: none;
          background: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #0a0a0a;
          transition: width 0.3s;
        }
        .nav-link:hover { color: #0a0a0a; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #0a0a0a; }
        .nav-link.active::after { width: 100%; }

        .month-card {
          cursor: pointer;
          border: 1px solid #e0ddd8;
          background: #fff;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .month-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: #0a0a0a;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s ease;
        }
        .month-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .month-card:hover::before { transform: scaleY(1); }
        .month-card.active { background: #0a0a0a; color: #f5f4f0; border-color: #0a0a0a; }
        .month-card.active::before { background: #d4a853; transform: scaleY(1); }

        .system-card {
          background: #fff;
          border: 1px solid #e0ddd8;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .system-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          border-color: #0a0a0a;
        }

        .toggle-btn {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #0a0a0a;
        }
        .toggle-btn.active { background: #0a0a0a; color: #f5f4f0; }
        .toggle-btn:not(.active) { background: transparent; color: #0a0a0a; }
        .toggle-btn:hover:not(.active) { background: #0a0a0a; color: #f5f4f0; }

        .bar-fill {
          height: 100%;
          background: #0a0a0a;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.03em;
          line-height: 0.9;
        }

        .serif { font-family: 'Cormorant Garamond', serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .gold-accent { color: #d4a853; }
        .gold-bg { background: #d4a853; }

        .problem-row {
          border-bottom: 1px solid #e0ddd8;
          transition: background 0.2s;
          cursor: default;
        }
        .problem-row:hover { background: #f0ede8; }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
        }

        .animated-bar { width: 0; }
        .bar-animate .animated-bar { width: var(--target-width); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f5f4f0; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(245,244,240,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e0ddd8" : "1px solid transparent",
        transition: "all 0.4s ease",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 8, height: 8, background: "#0a0a0a", borderRadius: "50%" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>MOTM</span>
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          {navItems.map(item => (
            <button key={item.id} className={`nav-link ${activeSection === item.id ? "active" : ""}`} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 0 }}>
          <button className={`toggle-btn ${view === "exec" ? "active" : ""}`} onClick={() => setView("exec")}>
            Exec
          </button>
          <button className={`toggle-btn ${view === "member" ? "active" : ""}`} onClick={() => setView("member")}>
            Member
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 40px 80px",
        background: "#0a0a0a",
        position: "relative", overflow: "hidden"
      }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 70% 30%, #1a1a1a 0%, #0a0a0a 60%)",
          opacity: 0.8
        }} />

        {/* Decorative grid lines */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: 0, bottom: 0,
            left: `${(i + 1) * (100 / 7)}%`,
            width: 1, background: "rgba(255,255,255,0.04)"
          }} />
        ))}

        {/* Top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "100px 40px 0",
          zIndex: 2
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Secretary Operational System — FY 2025–26
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
            {view === "exec" ? "EXECUTIVE VIEW" : "MEMBER VIEW"}
          </span>
        </div>

        {/* Gold accent line */}
        <div style={{ position: "absolute", top: "50%", left: 40, width: 60, height: 1, background: "#d4a853", zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="serif" style={{ fontSize: 22, color: "#d4a853", marginBottom: 24, fontStyle: "italic", fontWeight: 300 }}>
            Models of the Mecca, Inc.
          </p>
          <h1 className="hero-title" style={{ fontSize: "clamp(60px, 9vw, 140px)", color: "#f5f4f0", marginBottom: 8 }}>
            SECRETARY
          </h1>
          <h1 className="hero-title" style={{ fontSize: "clamp(60px, 9vw, 140px)", color: "#f5f4f0", marginBottom: 8, WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
            OPERATIONAL
          </h1>
          <h1 className="hero-title" style={{ fontSize: "clamp(60px, 9vw, 140px)", color: "#f5f4f0", marginBottom: 48 }}>
            SYSTEM
          </h1>

          <div style={{ display: "flex", gap: 40, alignItems: "flex-end" }}>
            <div style={{ maxWidth: 440 }}>
              <p className="serif" style={{ fontSize: 18, color: "rgba(245,244,240,0.7)", lineHeight: 1.7, fontWeight: 300 }}>
                A Secretary-driven infrastructure that transforms MOTM into a documentation-first, communication-forward organization built to outlast any single leadership cycle.
              </p>
            </div>
            <div style={{ display: "flex", gap: 48 }}>
              {["Structure", "Communication", "Legacy"].map((word, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 1, height: 40, background: "#d4a853", margin: "0 auto 12px" }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("timeline")} style={{
          position: "absolute", bottom: 40, right: 40,
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)", background: "none", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
          transition: "color 0.2s"
        }}>
          Scroll to explore
          <span style={{ fontSize: 16 }}>↓</span>
        </button>
      </section>

      {/* TIMELINE */}
      <section id="timeline" ref={setRef("timeline")} style={{ padding: "120px 40px", background: "#f5f4f0" }}>
        <div className={`fade-up ${visibleSections.timeline ? "visible" : ""}`} style={{ marginBottom: 64 }}>
          <span className="section-label">01 — Operational Calendar</span>
          <h2 className="hero-title" style={{ fontSize: "clamp(48px, 6vw, 80px)", marginTop: 16, marginBottom: 16 }}>
            MAY → DECEMBER
          </h2>
          <p className="serif" style={{ fontSize: 18, color: "#666", maxWidth: 540, fontWeight: 300, lineHeight: 1.7 }}>
            Eight months. Every initiative, responsibility, and innovation mapped to a single unified calendar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
          {timelineData.map((item, i) => (
            <div
              key={item.month}
              className={`month-card fade-up stagger-${Math.min(i + 1, 5)} ${visibleSections.timeline ? "visible" : ""} ${activeMonth === i ? "active" : ""}`}
              onClick={() => setActiveMonth(activeMonth === i ? null : i)}
              style={{ padding: "32px 28px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 10,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: activeMonth === i ? "rgba(245,244,240,0.5)" : "#999",
                    marginBottom: 6
                  }}>
                    {item.label}
                  </div>
                  <div className="hero-title" style={{ fontSize: 36, color: activeMonth === i ? "#f5f4f0" : "#0a0a0a" }}>
                    {item.month}
                  </div>
                </div>
                <div style={{ fontSize: 24, opacity: 0.4 }}>{item.icon}</div>
              </div>

              <p style={{
                fontSize: 13, fontWeight: 600,
                color: activeMonth === i ? "#f5f4f0" : "#0a0a0a",
                marginBottom: 12, lineHeight: 1.4
              }}>
                {item.focus}
              </p>

              {activeMonth === i && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 16, marginTop: 4 }}>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "#d4a853", marginBottom: 6, textTransform: "uppercase" }}>
                      Secretary Role
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(245,244,240,0.75)", lineHeight: 1.6 }}>{item.secretary}</p>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "#d4a853", marginBottom: 6, textTransform: "uppercase" }}>
                      Strategic Addition
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(245,244,240,0.75)", lineHeight: 1.6 }}>{item.innovation}</p>
                  </div>
                </div>
              )}

              {activeMonth !== i && (
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9,
                  color: "#999", letterSpacing: "0.1em", marginTop: 16,
                  textTransform: "uppercase"
                }}>
                  Tap to expand →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEMS */}
      <section id="systems" ref={setRef("systems")} style={{ padding: "120px 40px", background: "#0a0a0a" }}>
        <div className={`fade-up ${visibleSections.systems ? "visible" : ""}`} style={{ marginBottom: 64 }}>
          <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>02 — Infrastructure</span>
          <h2 className="hero-title" style={{ fontSize: "clamp(48px, 6vw, 80px)", marginTop: 16, marginBottom: 16, color: "#f5f4f0" }}>
            KEY SYSTEMS
          </h2>
          <p className="serif" style={{ fontSize: 18, color: "rgba(245,244,240,0.5)", maxWidth: 540, fontWeight: 300, lineHeight: 1.7 }}>
            Five foundational systems that transform ad-hoc coordination into a repeatable, scalable operational model.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 2 }}>
          {systemsData.map((sys, i) => (
            <div
              key={sys.title}
              className={`system-card fade-up stagger-${Math.min(i + 1, 5)} ${visibleSections.systems ? "visible" : ""}`}
              style={{ padding: "36px 32px", background: "#111", border: "1px solid #222" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9,
                  letterSpacing: "0.2em", color: "#d4a853",
                  border: "1px solid rgba(212,168,83,0.3)",
                  padding: "4px 10px", textTransform: "uppercase"
                }}>
                  {sys.tag}
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, color: "rgba(255,255,255,0.1)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="hero-title" style={{ fontSize: 32, color: "#f5f4f0", marginBottom: 20 }}>
                {sys.title}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Purpose", text: sys.purpose },
                  { label: "How It Works", text: sys.how },
                  { label: "Impact", text: sys.impact },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: 4 }}>
                      {item.label}
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(245,244,240,0.65)", lineHeight: 1.65 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMS → SOLUTIONS */}
      <section id="problems" ref={setRef("problems")} style={{ padding: "120px 40px", background: "#f5f4f0" }}>
        <div className={`fade-up ${visibleSections.problems ? "visible" : ""}`} style={{ marginBottom: 64 }}>
          <span className="section-label">03 — Strategic Rationale</span>
          <h2 className="hero-title" style={{ fontSize: "clamp(48px, 6vw, 80px)", marginTop: 16, marginBottom: 16 }}>
            PROBLEMS → SOLUTIONS
          </h2>
          <p className="serif" style={{ fontSize: 18, color: "#666", maxWidth: 540, fontWeight: 300, lineHeight: 1.7 }}>
            Every initiative in this system was designed to address a specific, documented organizational failure.
          </p>
        </div>

        <div style={{ border: "1px solid #e0ddd8" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "60px 1fr 1fr",
            background: "#0a0a0a", padding: "14px 28px"
          }}>
            {["#", "PROBLEM", "SOLUTION"].map(h => (
              <span key={h} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "rgba(245,244,240,0.5)", textTransform: "uppercase" }}>
                {h}
              </span>
            ))}
          </div>

          {problemSolutions.map((item, i) => (
            <div
              key={i}
              className={`problem-row fade-up stagger-${Math.min(i + 1, 5)} ${visibleSections.problems ? "visible" : ""}`}
              style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", padding: "24px 28px", alignItems: "start" }}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#d4a853", fontWeight: 700 }}>
                {item.icon}
              </span>
              <div style={{ paddingRight: 40 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 2 }}>{item.problem}</p>
              </div>
              <div>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{item.solution}</p>
              </div>
            </div>
          ))}
        </div>

        {view === "exec" && (
          <div className={`fade-up ${visibleSections.problems ? "visible" : ""}`} style={{
            marginTop: 48, background: "#0a0a0a", padding: "36px 40px",
            display: "flex", gap: 48, alignItems: "center"
          }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#d4a853", textTransform: "uppercase" }}>
                Executive Note
              </span>
              <h4 className="hero-title" style={{ fontSize: 28, color: "#f5f4f0", marginTop: 8, marginBottom: 12 }}>
                STRUCTURAL RECOMMENDATION
              </h4>
              <p className="serif" style={{ fontSize: 16, color: "rgba(245,244,240,0.65)", lineHeight: 1.7, fontWeight: 300 }}>
                This system functions only if the Secretary role is resourced correctly. Recommendation: Secretary should receive a defined 10–12 hrs/month allocation, have direct E-Board access, and present a monthly operations report at every board meeting.
              </p>
            </div>
            <div style={{ width: 1, height: 80, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "right" }}>
              <div className="hero-title" style={{ fontSize: 56, color: "rgba(255,255,255,0.08)" }}>SEC</div>
            </div>
          </div>
        )}
      </section>

      {/* DATA DASHBOARD */}
      <section id="data" ref={setRef("data")} style={{ padding: "120px 40px", background: "#111" }}>
        <div className={`fade-up ${visibleSections.data ? "visible" : ""}`} style={{ marginBottom: 64 }}>
          <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>04 — Analytics</span>
          <h2 className="hero-title" style={{ fontSize: "clamp(48px, 6vw, 80px)", marginTop: 16, marginBottom: 16, color: "#f5f4f0" }}>
            ENGAGEMENT DASHBOARD
          </h2>
          <p className="serif" style={{ fontSize: 18, color: "rgba(245,244,240,0.5)", maxWidth: 540, fontWeight: 300, lineHeight: 1.7 }}>
            Mock data visualizing the participation and engagement metrics the Secretary system is designed to track.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {/* Event Attendance */}
          <div className={`fade-up ${visibleSections.data ? "visible" : ""}`} style={{ background: "#1a1a1a", border: "1px solid #222", padding: "36px 32px" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 24 }}>
              Event Attendance — Fall 2025
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {mockData.events.map((ev, i) => (
                <div key={ev.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{ev.name}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#d4a853" }}>
                      {ev.attendance}/{ev.cap}
                    </span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div
                      className={`bar-fill ${visibleSections.data ? "" : "animated-bar"}`}
                      style={{
                        width: `${(ev.attendance / ev.cap) * 100}%`,
                        background: ev.attendance / ev.cap > 0.85 ? "#d4a853" : "rgba(255,255,255,0.4)"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Engagement */}
          <div className={`fade-up stagger-2 ${visibleSections.data ? "visible" : ""}`} style={{ background: "#1a1a1a", border: "1px solid #222", padding: "36px 32px" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 24 }}>
              Department Engagement Score
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {mockData.engagement.map((dept, i) => (
                <div key={dept.dept} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", width: 80, flexShrink: 0 }}>
                    {dept.dept}
                  </span>
                  <div style={{ flex: 1, height: 32, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
                    <div style={{
                      width: `${dept.score}%`,
                      height: "100%",
                      background: `rgba(212,168,83,${0.3 + (dept.score / 100) * 0.7})`,
                      transition: "width 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transitionDelay: `${i * 0.1}s`
                    }} />
                    <span style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#f5f4f0", fontWeight: 700
                    }}>
                      {dept.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          {[
            { label: "Events Tracked", value: "18", sub: "Fall 2025" },
            { label: "Avg. Attendance Rate", value: "83%", sub: "Above 80% target" },
            { label: "Newsletter Opens", value: "74%", sub: "Industry avg: 22%" },
            { label: "Opportunities Logged", value: "31", sub: "This semester" },
          ].map((stat, i) => (
            <div key={stat.label} className={`fade-up stagger-${i + 1} ${visibleSections.data ? "visible" : ""}`} style={{
              background: "#1a1a1a", border: "1px solid #222",
              padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between"
            }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                {stat.label}
              </span>
              <div>
                <div className="hero-title" style={{ fontSize: 64, color: "#f5f4f0", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#d4a853", marginTop: 8 }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", padding: "60px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="hero-title" style={{ fontSize: 48, color: "#f5f4f0", lineHeight: 1, marginBottom: 12 }}>MOTM</div>
            <p className="serif" style={{ fontSize: 14, color: "rgba(245,244,240,0.4)", fontStyle: "italic" }}>
              Models of the Mecca, Inc.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Secretary Operational System
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 4 }}>
              FY 2025–2026
            </p>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Structure. Communication. Legacy.
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
            © Howard University
          </span>
        </div>
      </footer>
    </div>
  );
}
