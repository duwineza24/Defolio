import { useState, useEffect, useRef } from "react";
import { IoHomeOutline, IoPersonOutline, IoBriefcaseOutline, IoTerminalOutline } from "react-icons/io5";

export default function About({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
  const canvasRef = useRef(null);

  // 🌌 Animate canvas background particles over the background image overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 45;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.sin(i * 9.8) * width * 0.5 + width * 0.5,
        y: Math.cos(i * 3.4) * height * 0.5 + height * 0.5,
        radius: (Math.abs(Math.sin(i)) * 3) + 1,
        speedY: -(Math.abs(Math.cos(i)) * 0.4 + 0.1), 
        opacity: Math.abs(Math.sin(i * 2)) * 0.5 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cosmic particles drifting smoothly over the background layers
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`; 
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#a855f7";
        ctx.fill();

        p.y += p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 90,
      overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center",
      backgroundColor: "#06060e", padding: "80px 20px 40px 20px", boxSizing: "border-box",
      fontFamily: "'Segoe UI', Roboto, sans-serif", color: "#ffffff"
    }}>
      
      {/* LAYER 1: 🖼️ YOUR BACKGROUND IMAGE */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundImage: 'url("/contact-image.png")', backgroundSize: "cover",
        backgroundPosition: "center", zIndex: -3, pointerEvents: "none"
      }} />

      {/* LAYER 2: 🕶️ TRANSLUCENT GLASS OVERLAY TINT */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(10, 7, 24, 0.7)", 
        backdropFilter: "blur(3px)", 
        zIndex: -2, pointerEvents: "none"
      }} />

      {/* LAYER 3: 🔮 ANIMATED COSMIC PARTICLES (Drifts above the image & tinted overlay) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: -1, pointerEvents: "none"
        }}
      />

      {/* 🏡 Home Navigation Button */}
      <button 
        onClick={onClose}
        style={{
          position: "absolute", top: "24px", left: "24px", backgroundColor: "rgba(30, 27, 75, 0.6)",
          border: "1px solid rgba(168, 85, 247, 0.4)", color: "#a855f7", width: "48px", height: "48px",
          borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center",
          cursor: "pointer", fontSize: "20px", transition: "all 0.3s"
        }}
      >
        <IoHomeOutline />
      </button>

      {/* 🌌 Top Creative Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "300", letterSpacing: "4px",
          textTransform: "uppercase", margin: "0 0 8px 0", textShadow: "0 0 15px rgba(168, 85, 247, 0.6)"
        }}>
          Devothe Uwineza
        </h1>
        <p style={{ color: "#a855f7", letterSpacing: "2px", textTransform: "uppercase", fontSize: "14px", margin: 0 }}>
          Software Developer & iLEAD Leader // Systems Innovator
        </p>
      </div>

      {/* 🎛️ Dynamic Tab Switches */}
      <div style={{
        display: "flex", gap: "10px", marginBottom: "30px", backgroundColor: "rgba(15, 23, 42, 0.5)",
        padding: "6px", borderRadius: "30px", border: "1px solid rgba(168, 85, 247, 0.2)"
      }}>
        {[
          { id: "profile", label: "The Leader-Developer", icon: <IoPersonOutline /> },
          { id: "journey", label: "The Journey", icon: <IoBriefcaseOutline /> },
          { id: "stack", label: "Tech Stack", icon: <IoTerminalOutline /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
              borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "14px",
              backgroundColor: activeTab === tab.id ? "#a855f7" : "transparent",
              color: activeTab === tab.id ? "#ffffff" : "#94a3b8",
              transition: "all 0.3s ease"
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 📄 MATTE GLASS PANEL MATRIX */}
      <div style={{
        maxWidth: "850px", width: "100%", backgroundColor: "rgba(10, 7, 24, 0.6)",
        border: "1px solid rgba(168, 85, 247, 0.25)", backdropFilter: "blur(20px)",
        borderRadius: "16px", padding: "40px", boxSizing: "border-box",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)"
      }}>

        {/* ================= TAB 1: PROFILE ================= */}
        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div>
              <h3 style={{ color: "#a855f7", margin: "0 0 12px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>About Me</h3>
              <p style={{ color: "#cbd5e1", lineHeight: "1.7", fontSize: "15px", margin: 0 }}>
                I am a passionate software developer driven by a single mission: building digital solution systems that solve real-life problems within my community. I don't just write code for screen pixels—I design algorithms with empathy, using computer science to create a tangible impact.
              </p>
            </div>
            
            {/* 👑 SPECIALIZED HIGH-HIGHLIGHT INTERACTIVE iLEAD SECTION */}
            <div style={{ 
              backgroundColor: "rgba(234, 179, 8, 0.04)", 
              border: "1px dashed rgba(234, 179, 8, 0.3)", 
              padding: "24px", 
              borderRadius: "12px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute", top: "-12px", right: "20px", backgroundColor: "#eab308",
                color: "#06060e", fontSize: "11px", fontWeight: "bold", padding: "2px 10px",
                borderRadius: "10px", textTransform: "uppercase", letterSpacing: "1px"
              }}>
                Leadership Core
              </div>
              <h4 style={{ color: "#eab308", margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
                iLEAD Rwanda Alumni Excellence
              </h4>
              <p style={{ margin: 0, fontSize: "14.5px", color: "#cbd5e1", lineHeight: "1.6" }}>
                Through the intensive <strong>iLEAD program</strong>, I unlocked the tools to become one of tomorrow's great leaders. This transformational experience taught me that real technology requires strong values. It shaped my approach to software engineering: combining technical excellence with the communication, critical thinking, and visionary leadership needed to lead teams and scale community-focused innovations.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: "#a855f7", margin: "0 0 16px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>Linguistic Protocols</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                {[
                  { lang: "English", level: "Native Academic Fluency" },
                  { lang: "Kinyarwanda", level: "Fluent Speaker // Heritage" },
                  { lang: "Sign Language", level: "Inclusive Communication Adaptability" }
                ].map((l, idx) => (
                  <div key={idx} style={{ backgroundColor: "rgba(6, 6, 14, 0.4)", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontWeight: "600", color: "#ffffff", marginBottom: "2px" }}>{l.lang}</div>
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>{l.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: JOURNEY ================= */}
        {activeTab === "journey" && (
          <div>
            {/* Education System */}
            <h3 style={{ color: "#a855f7", margin: "0 0 20px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>Education Matrix</h3>
            <div style={{ position: "relative", borderLeft: "2px solid #a855f7", paddingLeft: "20px", marginBottom: "40px", marginLeft: "10px" }}>
              <div style={{ position: "absolute", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#eab308", left: "-7px", top: "4px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontWeight: "600", fontSize: "16px", color: "#ffffff" }}>Liquidnet Family High School @ ASYV</span>
                <span style={{ color: "#eab308", fontSize: "14px" }}>2023 – 2027</span>
              </div>
              <div style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "4px" }}>Rwamagana, Rwanda</div>
              <div style={{ color: "#cbd5e1", fontSize: "14px" }}>Academic Combination Focus: <span style={{ color: "#a855f7" }}>Mathematics, Physics, and Computer Science (MPC)</span></div>
            </div>

            {/* Timed Experience Timeline */}
            <h3 style={{ color: "#a855f7", margin: "0 0 20px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>Chronological Operations</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { title: "Lead Robotics Programmer", date: "Apr 2024 – Present", loc: "Robotics & Innovation Club", desc: "Developing and programming physical robot architectures to execute complex tasks in state competitions. Harnessing cross-functional teamwork to build hardware and software solutions focused on local community hurdles." },
                { title: "Software Track Scholar", date: "Sep 2024 – Present", loc: "Programming Class Alpha", desc: "Mastering software architectures and computer systems to create innovative tech projects aimed at engineering a better society." },
                { title: "Technical Cohort Fellow", date: "Aug 2024 – Sep 2024", loc: "HerInTech", desc: "Completed an advanced tech accelerator camp engineered to empower and equip girls with heavy industry software development stacks." },
                { title: "Humanitarian First Responder", date: "Aug 2024 – Sep 2024", loc: "Croix Rouge Rwanda (Red Cross)", desc: "Acquired intensive, certified tactical first-aid and crisis management training. Developed deep leadership, communication, and humanitarian cooperation values during regional crisis exercises." },
                { title: "Global Scholar Alumna", date: "Jun 2025", loc: "Yale Young African Scholars Network", desc: "Engaged in collaborative global problem-solving modules with top-performing student minds across the continent via the online YYAS platform." }
              ].map((exp, idx) => (
                <div key={idx} style={{ backgroundColor: "rgba(6, 6, 14, 0.4)", padding: "20px", borderRadius: "10px", border: "1px solid rgba(168, 85, 247, 0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                    <h4 style={{ margin: 0, fontSize: "16px", color: "#ffffff", fontWeight: "600" }}>{exp.title}</h4>
                    <span style={{ fontSize: "13px", color: "#eab308" }}>{exp.date}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#a855f7", marginBottom: "8px" }}>{exp.loc} // Rwanda</div>
                  <p style={{ margin: 0, fontSize: "14px", color: "#cbd5e1", lineHeight: "1.5" }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

       {/* ================= TAB 3: TECH STACK ================= */}
{activeTab === "stack" && (
  <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
    {/* Programming Languages Grid */}
    <div>
      <h3 style={{ color: "#a855f7", margin: "0 0 16px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>Core Engineering Languages</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
        {[
          { name: "React", type: "Frontend Core", color: "#38bdf8" },
          { name: "Node.js", type: "JS Environment", color: "#4ade80" },
          { name: "C++", type: "Robotics Logic", color: "#60a5fa" },
          { name: "Java", type: "System Logic", color: "#fb923c" },
          { name: "Python", type: "Scripts & AI", color: "#facc15" },
          { name: "Express.js", type: "Backend API", color: "#a78bfa" },
          { name: "PHP", type: "Server Logic", color: "#f472b6" },
          { name: "JavaScript", type: "Web Engine", color: "#fde047" },
          { name: "HTML5", type: "Structure Matrix", color: "#f06529" },
          { name: "CSS3", type: "Style Architecture", color: "#2965f1" },
          /* 🚀 TAILWIND INJECTED HERE */
          { name: "Tailwind CSS", type: "Utility Styling", color: "#06b6d4" }
        ].map((skill, idx) => (
          <div key={idx} style={{
            backgroundColor: "rgba(6, 6, 14, 0.5)", border: "1px solid rgba(255,255,255,0.05)",
            padding: "16px", borderRadius: "10px", textAlign: "center", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", backgroundColor: skill.color }} />
            <div style={{ fontWeight: "600", fontSize: "15px", color: "#ffffff", marginBottom: "4px" }}>{skill.name}</div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>{skill.type}</div>
          </div>
        ))}
      </div>
    </div>

            <hr style={{ border: "0", borderTop: "1px solid rgba(168, 85, 247, 0.15)" }} />

            {/* Double Column: Skills & Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
              <div>
                <h3 style={{ color: "#a855f7", margin: "0 0 12px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>Leadership Competencies</h3>
                <ul style={{ paddingLeft: "20px", margin: 0, color: "#cbd5e1", lineHeight: "1.8", fontSize: "14px" }}>
                  <li><strong style={{ color: "#ffffff" }}>Visionary Teamwork:</strong> Bringing people together to tackle difficult engineering milestones.</li>
                  <li><strong style={{ color: "#ffffff" }}>Public Communication:</strong> Translating complex technology loops into clear value pitches.</li>
                  <li><strong style={{ color: "#ffffff" }}>Strategic Systems Thinking:</strong> Analyzing community layouts to spot exactly where tech can help.</li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: "#a855f7", margin: "0 0 12px 0", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>Credentials & Honors</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["iLEAD Leadership Certified", "Wavumbuzi Entrepreneurship (2x)", "Yale Young African Scholars", "HerInTech Graduate Accelerator", "Math & Science Quiz Laureate"].map((badge, idx) => (
                    <span key={idx} style={{
                      backgroundColor: "rgba(234, 179, 8, 0.1)", border: "1px solid rgba(234, 179, 8, 0.3)",
                      color: "#eab308", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "500"
                    }}>
                      🛡️ {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}