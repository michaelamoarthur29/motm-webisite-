import { useState, useEffect, useRef } from "react";

const timelineData = [
  {
    period: "MAY — JUNE",
    phase: "Transition & System Building",
    tag: "FOUNDATION",
    description: "E-Board transitions and internal planning season. The Secretary lays the groundwork before the semester begins.",
    systems: [
      { name: "Central Documentation System", detail: "Standardized folder structure, naming conventions, and a master index. Everything findable by anyone." },
      { name: "Meeting Architecture", detail: "Agenda templates, decision logs, and follow-up protocols established for all E-Board meetings." },
      { name: "Archive System", detail: "Past season materials organized and handed off. Institutional memory preserved." },
      { name: "Alumni Contact Collection", detail: "Early outreach begins. Building the database before fall recruitment." },
    ],
    accent: "#d4a853"
  },
  {
    period: "JULY — AUGUST",
    phase: "Pre-Semester Setup",
    tag: "INFRASTRUCTURE",
    description: "Systems are finalized before students return. Communication channels are ready to activate on day one.",
    systems: [
      { name: "Newsletter System", detail: "Template designed, distribution list built, editorial calendar drafted. Ready to launch September 1." },
      { name: "Communication Structure", detail: "Department heads briefed on information flow. No more announcement gaps." },
      { name: "Cross-Department Alignment", detail: "Soft sync between Models, Photography, Creative, Styling, and Marketing before the semester begins." },
    ],
    accent: "#d4a853"
  },
  {
    period: "SEPTEMBER",
    phase: "Recruitment Period",
    tag: "ACTIVATION",
    description: "High activity. New prospects entering the organization. Systems are publicly deployed for the first time.",
    systems: [
      { name: "Newsletter Launch — Issue #1", detail: "First issue sent to full membership. Covers recruitment events, expectations, and org updates." },
      { name: "Engagement Documentation", detail: "Attendance, participation, and prospect pipeline tracked in real time." },
      { name: "Communication Clarity", detail: "Every department knows what's happening, when, and why. No information silos." },
    ],
    accent: "#d4a853"
  },
  {
    period: "OCTOBER",
    phase: "Development Phase",
    tag: "EVALUATION",
    description: "Members and prospects are being assessed. The Secretary introduces systems that make evaluation transparent and equitable.",
    systems: [
      { name: "Opportunity Tracking System", detail: "Every editorial, gig, and visibility opportunity is logged. Distribution is monitored to ensure fairness." },
      { name: "Internal Transparency Layer", detail: "Members can see how opportunities are allocated. Leadership can identify gaps." },
      { name: "Participation Audit", detail: "Cross-department event attendance reviewed. Data informs November decisions." },
    ],
    accent: "#d4a853"
  },
  {
    period: "NOVEMBER",
    phase: "Halfway Show + Community Activation",
    tag: "KEY MOMENT",
    description: "The most critical month. The Halfway Show determines the final prospect class — and what comes after redefines the culture.",
    systems: [
      { name: "Halfway Show Documentation", detail: "Chopping block scores, evaluations, and final class decisions recorded and archived." },
      { name: "MOTM Family Field Day ↓", detail: "NEW initiative introduced immediately after the Halfway Show. Alumni, current members, and the new class come together for the first time. Breaks generational divisions. Builds real faMM culture.", highlight: true },
      { name: "Alumni Network Activation", detail: "Alumni formally welcomed back into the ecosystem. LinkedIn directory launched. Spring panel planning begins." },
    ],
    accent: "#d4a853"
  },
  {
    period: "DECEMBER",
    phase: "Wrap-Up & Spring Preparation",
    tag: "LEGACY",
    description: "The semester closes. The Secretary's final act is ensuring the next leadership cycle inherits a fully functional system.",
    systems: [
      { name: "Alumni Network — Live", detail: "Database complete. Monthly digest scheduled. Alumni are now an active part of the organization." },
      { name: "Industry Panel Planning", detail: "Spring alumni panel fully planned. Speakers confirmed. Format designed." },
      { name: "Full Semester Documentation", detail: "Every event, decision, and outcome compiled into a year-end report for E-Board and future Secretaries." },
    ],
    accent: "#d4a853"
  },
];

const systemsData = [
  {
    title: "Monthly Newsletter",
    tag: "COMMUNICATION",
    icon: "✦",
    purpose: "Eliminate information silos. Every member receives the same baseline update regardless of department.",
    impact: "Reduces misinformation. Increases event turnout. Creates a paper trail of org activity."
  },
  {
    title: "Anonymous Feedback",
    tag: "TRANSPARENCY",
    icon: "◎",
    purpose: "Give every member a low-barrier channel to surface concerns without internal politics.",
    impact: "Transforms unspoken tension into actionable data. Builds trust between leadership and membership."
  },
  {
    title: "Opportunity Tracking",
    tag: "EQUITY",
    icon: "◈",
    purpose: "Ensure editorials, gigs, and visibility opportunities are distributed fairly across all eligible members.",
    impact: "Closes the access gap. Leadership can see and correct imbalances before they become culture problems."
  },
  {
    title: "Documentation & Archive",
    tag: "CONTINUITY",
    icon: "◉",
    purpose: "Preserve institutional knowledge so the organization doesn't restart from zero every leadership cycle.",
    impact: "Future boards inherit a fully functional system. History becomes a competitive advantage."
  },
  {
    title: "Alumni Network + Industry Panel",
    tag: "GROWTH",
    icon: "◐",
    purpose: "Transform former members into an active network of mentors, collaborators, and industry connectors.",
    impact: "MOTM becomes a career-long affiliation. Spring industry panel connects current members to real opportunities."
  },
];

export default function App() {
  const [activeMonth, setActiveMonth] = useState(null);
  const [view, setView] = useState("exec");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.08 }
    );
    Object.values(refs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const ref = id => el => { refs.current[id] = el; };
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#f5f4f0", color: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade.in { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.05s; } .d2 { transition-delay: 0.15s; } .d3 { transition-delay: 0.25s; } .d4 { transition-delay: 0.35s; } .d5 { transition-delay: 0.45s; }
        .nav-btn { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; background: none; border: none; cursor: pointer; color: #888; padding: 4px 0; position: relative; transition: color 0.2s; }
        .nav-btn::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #0a0a0a; transition: width 0.25s; }
        .nav-btn:hover { color: #0a0a0a; }
        .nav-btn:hover::after { width: 100%; }
        .month-card { cursor: pointer; border: 1px solid #e0ddd8; background: #fff; transition: box-shadow 0.25s, transform 0.25s; }
        .month-card:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(0,0,0,0.07); }
        .month-card.open { background: #0a0a0a; color: #f5f4f0; border-color: #0a0a0a; }
        .sys-card { background: #111; border: 1px solid #222; transition: border-color 0.25s, transform 0.25s; }
        .sys-card:hover { border-color: #d4a853; transform: translateY(-3px); }
        .tag { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; padding: 3px 9px; border: 1px solid; display: inline-block; }
        .row-hover { border-bottom: 1px solid #e8e5e0; transition: background 0.18s; }
        .row-hover:hover { background: #eeeae4; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: #ccc; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(245,244,240,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #e0ddd8" : "1px solid transparent",
        transition: "all 0.35s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, background: "#0a0a0a", borderRadius: "50%" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.16em", fontWeight: 700 }}>MOTM</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["timeline", "systems", "culture", "impact"].map(id => (
            <button key={id} className="nav-btn" onClick={() => scrollTo(id)}>{id}</button>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {["exec", "member"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "7px 18px", cursor: "pointer", transition: "all 0.18s",
              border: "1px solid #0a0a0a",
              background: view === v ? "#0a0a0a" : "transparent",
              color: view === v ? "#f5f4f0" : "#0a0a0a"
            }}>{v}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 80px", position: "relative", overflow: "hidden" }}>
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i + 1) * 100 / 8}%`, width: 1, background: "rgba(255,255,255,0.03)" }} />
        ))}
        <div style={{ position: "absolute", top: 96, left: 40, right: 40, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Secretary Operational Vision — FY 2025–26
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em" }}>
            {view === "exec" ? "EXECUTIVE VIEW" : "MEMBER VIEW"}
          </span>
        </div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#d4a853", fontStyle: "italic", fontWeight: 300, marginBottom: 20 }}>
            Models of the Mecca, Inc.
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8.5vw, 130px)", color: "#f5f4f0", lineHeight: 0.88, marginBottom: 6 }}>
            SECRETARY
          </h1>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8.5vw, 130px)", lineHeight: 0.88, marginBottom: 6, WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>
            OPERATIONAL
          </h1>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8.5vw, 130px)", color: "#f5f4f0", lineHeight: 0.88, marginBottom: 52 }}>
            VISION
          </h1>
          <div style={{ display: "flex", gap: 48, alignItems: "flex-end", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "rgba(245,244,240,0.6)", lineHeight: 1.75, maxWidth: 420, fontWeight: 300 }}>
              A Secretary-driven framework that introduces structured communication, alumni integration, and community systems into MOTM's existing infrastructure — designed to outlast any single leadership cycle.
            </p>
            <div style={{ display: "flex", gap: 40 }}>
              {["Structure", "Community", "Legacy"].map((w, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 1, height: 36, background: "#d4a853", margin: "0 auto 10px" }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" ref={ref("timeline")} style={{ padding: "110px 40px", background: "#f5f4f0" }}>
        <div className={`fade d1 ${visible.timeline ? "in" : ""}`} style={{ marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999" }}>01 — Strategic Timeline</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 5.5vw, 76px)", marginTop: 14, lineHeight: 1 }}>
            MAY → DECEMBER
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#666", maxWidth: 480, marginTop: 10, fontWeight: 300, lineHeight: 1.7 }}>
            Not a list of events. A map of where new systems are introduced into the organization's existing rhythm.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {timelineData.map((item, i) => (
            <div key={i} className={`month-card fade d${Math.min(i + 1, 5)} ${visible.timeline ? "in" : ""} ${activeMonth === i ? "open" : ""}`}
              onClick={() => setActiveMonth(activeMonth === i ? null : i)}>
              <div style={{ padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                  <div style={{ minWidth: 120 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.16em", color: activeMonth === i ? "#d4a853" : "#999", textTransform: "uppercase", marginBottom: 4 }}>
                      {item.tag}
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: activeMonth === i ? "#f5f4f0" : "#0a0a0a", letterSpacing: "0.02em" }}>
                      {item.period}
                    </div>
                  </div>
                  <div style={{ width: 1, height: 36, background: activeMonth === i ? "rgba(255,255,255,0.12)" : "#e0ddd8" }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: activeMonth === i ? "#f5f4f0" : "#0a0a0a", marginBottom: 3 }}>{item.phase}</p>
                    <p style={{ fontSize: 12, color: activeMonth === i ? "rgba(245,244,240,0.55)" : "#888", maxWidth: 480, lineHeight: 1.55 }}>{item.description}</p>
                  </div>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: activeMonth === i ? "rgba(255,255,255,0.3)" : "#ccc", transform: activeMonth === i ? "rotate(45deg)" : "none", transition: "transform 0.25s" }}>+</div>
              </div>

              {activeMonth === i && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                  {item.systems.map((sys, j) => (
                    <div key={j} style={{
                      background: sys.highlight ? "rgba(212,168,83,0.12)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${sys.highlight ? "rgba(212,168,83,0.4)" : "rgba(255,255,255,0.08)"}`,
                      padding: "18px 20px", borderRadius: 0
                    }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: sys.highlight ? "#d4a853" : "#f5f4f0", marginBottom: 6, lineHeight: 1.3 }}>{sys.name}</p>
                      <p style={{ fontSize: 12, color: "rgba(245,244,240,0.6)", lineHeight: 1.6 }}>{sys.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEMS */}
      <section id="systems" ref={ref("systems")} style={{ padding: "110px 40px", background: "#0a0a0a" }}>
        <div className={`fade d1 ${visible.systems ? "in" : ""}`} style={{ marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>02 — Infrastructure</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 5.5vw, 76px)", marginTop: 14, color: "#f5f4f0", lineHeight: 1 }}>
            FIVE SYSTEMS
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "rgba(245,244,240,0.45)", maxWidth: 480, marginTop: 10, fontWeight: 300, lineHeight: 1.7 }}>
            Each system addresses a specific organizational failure. Together, they create an infrastructure that runs independent of who holds any single role.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
          {systemsData.map((sys, i) => (
            <div key={i} className={`sys-card fade d${Math.min(i + 1, 5)} ${visible.systems ? "in" : ""}`} style={{ padding: "34px 30px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                <span className="tag" style={{ color: "#d4a853", borderColor: "rgba(212,168,83,0.3)" }}>{sys.tag}</span>
                <span style={{ fontSize: 22, color: "rgba(255,255,255,0.12)" }}>{sys.icon}</span>
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: "#f5f4f0", marginBottom: 20, letterSpacing: "0.02em" }}>{sys.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[{ label: "Purpose", text: sys.purpose }, { label: "Impact", text: sys.impact }].map(item => (
                  <div key={item.label}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.16em", color: "#555", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                    <p style={{ fontSize: 13, color: "rgba(245,244,240,0.6)", lineHeight: 1.65 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section id="culture" ref={ref("culture")} style={{ padding: "110px 40px", background: "#f5f4f0" }}>
        <div className={`fade d1 ${visible.culture ? "in" : ""}`} style={{ marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999" }}>03 — Community</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 5.5vw, 76px)", marginTop: 14, lineHeight: 1 }}>
            CULTURE INITIATIVE
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {/* Problem */}
          <div className={`fade d2 ${visible.culture ? "in" : ""}`} style={{ background: "#fff", border: "1px solid #e0ddd8", padding: "40px 36px" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.16em", color: "#999", textTransform: "uppercase", marginBottom: 20 }}>The Problem</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#0a0a0a", marginBottom: 24 }}>FRAGMENTED FAM</h3>
            {[
              "Alumni disconnected from current members after graduation",
              "Departments operate in silos with minimal cross-interaction",
              "New class feels separated from the broader organization",
              "Culture exists in pockets, not as a unified whole"
            ].map((p, i) => (
              <div key={i} className="row-hover" style={{ padding: "14px 0", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, background: "#ccc", borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>

          {/* Solution */}
          <div className={`fade d3 ${visible.culture ? "in" : ""}`} style={{ background: "#0a0a0a", padding: "40px 36px" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.16em", color: "#d4a853", textTransform: "uppercase", marginBottom: 20 }}>The Solution</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#f5f4f0", marginBottom: 8 }}>FAMILY FIELD DAY</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(245,244,240,0.5)", fontStyle: "italic", marginBottom: 24 }}>
              Introduced immediately after the Halfway Show — November
            </p>
            {[
              { title: "Three Generations, One Space", detail: "Alumni, current members, and the new class meet for the first time outside of a formal event." },
              { title: "Break the Division", detail: "Structured activities designed to create new connections across departments and years." },
              { title: "Build Real Culture", detail: "FaMM isn't a word — it's a feeling. This event makes it tangible." },
              { title: "Alumni Re-Entry Point", detail: "Field Day serves as the formal moment alumni are welcomed back into the ecosystem." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 0" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#f5f4f0", marginBottom: 3 }}>{item.title}</p>
                <p style={{ fontSize: 12, color: "rgba(245,244,240,0.5)", lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className={`fade d4 ${visible.culture ? "in" : ""}`} style={{ marginTop: 2, background: "#d4a853", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#0a0a0a", fontStyle: "italic", fontWeight: 300, maxWidth: 600, lineHeight: 1.5 }}>
            "The strongest organizations don't just build members — they build a culture that members carry with them for life."
          </p>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: "rgba(0,0,0,0.1)", flexShrink: 0 }}>FAMM</div>
        </div>
      </section>

      {/* FUTURE IMPACT */}
      <section id="impact" ref={ref("impact")} style={{ padding: "110px 40px", background: "#111" }}>
        <div className={`fade d1 ${visible.impact ? "in" : ""}`} style={{ marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>04 — Forward</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 5.5vw, 76px)", marginTop: 14, color: "#f5f4f0", lineHeight: 1 }}>
            SPRING IMPACT
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "rgba(245,244,240,0.45)", maxWidth: 480, marginTop: 10, fontWeight: 300, lineHeight: 1.7 }}>
            Everything built in the fall is designed to activate in the spring. The Secretary's work compounds.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
          {[
            { num: "01", title: "Alumni Industry Panel", detail: "Speakers confirmed in December. Spring panel connects current members to working professionals in fashion, photography, and creative direction.", tag: "FEBRUARY" },
            { num: "02", title: "Stronger Brand Identity", detail: "Creative Direction Committee — proposed in November — begins formal oversight of all MOTM visual outputs in the spring semester.", tag: "ONGOING" },
            { num: "03", title: "Industry-Ready Members", detail: "Comp cards, model bags, portfolio reviews, and casting call preparation. Members enter the industry with real tools.", tag: "MARCH" },
            { num: "04", title: "Unified Organization", detail: "After Family Field Day and a full semester of structured communication, the org enters spring as a cohesive unit — not a collection of departments.", tag: "FULL SEMESTER" },
          ].map((item, i) => (
            <div key={i} className={`fade d${i + 1} ${visible.impact ? "in" : ""}`} style={{ background: "#1a1a1a", border: "1px solid #222", padding: "34px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, color: "rgba(255,255,255,0.07)", fontWeight: 700 }}>{item.num}</span>
                <span className="tag" style={{ color: "#d4a853", borderColor: "rgba(212,168,83,0.25)", fontSize: 8 }}>{item.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#f5f4f0", marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(245,244,240,0.55)", lineHeight: 1.65 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        {view === "exec" && (
          <div className={`fade d5 ${visible.impact ? "in" : ""}`} style={{ marginTop: 2, background: "#d4a853", padding: "36px 40px", display: "flex", gap: 40, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.18em", color: "rgba(0,0,0,0.5)", textTransform: "uppercase" }}>Executive Note</span>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#0a0a0a", marginTop: 8, marginBottom: 10 }}>SECRETARY RESOURCE REQUIREMENT</h4>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(0,0,0,0.7)", lineHeight: 1.7, fontWeight: 300 }}>
                This system functions only if the Secretary role is properly resourced. Recommendation: defined 10–12 hrs/month allocation, direct E-Board access, and a standing agenda item at every board meeting for an operations report.
              </p>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, color: "rgba(0,0,0,0.08)", flexShrink: 0, lineHeight: 1 }}>SEC</div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", padding: "56px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: "#f5f4f0", lineHeight: 1, marginBottom: 8 }}>MOTM</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "rgba(245,244,240,0.35)", fontStyle: "italic" }}>Models of the Mecca, Inc.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Secretary Operational Vision</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", marginTop: 4 }}>FY 2025–2026</p>
          </div>
        </div>
        <div style={{ marginTop: 44, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Structure. Community. Legacy.</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.18)" }}>Howard University</span>
        </div>
      </footer>
    </div>
  );
}
