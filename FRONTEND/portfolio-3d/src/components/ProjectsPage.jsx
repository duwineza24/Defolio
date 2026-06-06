import { useState, useEffect, useRef } from "react";
// ✅ Swapped to rock-solid Font Awesome imports that exist in every version
import { FaHome, FaExternalLinkAlt, FaCodeBranch, FaMicrochip } from "react-icons/fa";

const projectData = [
  {
    title: "Kanda Shop",
    tagline: "E-Commerce Deployment Platform",
    desc: "A production-grade, full-stack digital marketplace system. Engineered with a responsive design layer to handle seamless product browsing, robust data models, and fluid client-to-server operations.",
    liveUrl: "https://kanda-shop.onrender.com/",
    tech: ["React", "Node.js", "Express.js", "Tailwind CSS", "JavaScript"],
    accentColor: "#38bdf8", 
    glow: "rgba(56, 189, 248, 0.25)"
  },
  {
    title: "FindMe System",
    tagline: "Location & Finder Protocol",
    desc: "An innovative digital mapping/search engine application architected to bridge local data voids. Built with automated asset routing architectures to help communities find essential resources dynamically.",
    liveUrl: "https://findme-1-q9sv.onrender.com/",
    tech: ["React", "Node.js", "Express.js", "CSS3", "API Integration"],
    accentColor: "#a855f7", 
    glow: "rgba(168, 85, 247, 0.25)"
  },

];

export default function ProjectsPage({ onClose }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);

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

    const particleCount = 40;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.3 + 0.1),
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
        ctx.shadowBlur = 8;
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
      
      {/* 🖼️ Background Infrastructure */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundImage: 'url("/contact-image.png")', backgroundSize: "cover",
        backgroundPosition: "center", opacity: 0.12, zIndex: -3, pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(10, 7, 24, 0.75)", backdropFilter: "blur(4px)", zIndex: -2, pointerEvents: "none"
      }} />
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }} />

      {/* 🏡 Return Button */}
      <button 
        onClick={onClose}
        style={{
          position: "absolute", top: "24px", left: "24px", backgroundColor: "rgba(30, 27, 75, 0.6)",
          border: "1px solid rgba(168, 85, 247, 0.4)", color: "#a855f7", width: "48px", height: "48px",
          borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center",
          cursor: "pointer", fontSize: "18px", transition: "all 0.3s"
        }}
      >
        <FaHome />
      </button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "300", letterSpacing: "4px",
          textTransform: "uppercase", margin: "0 0 8px 0", textShadow: "0 0 15px rgba(168, 85, 247, 0.6)"
        }}>
          Deployment Hub
        </h1>
        <p style={{ color: "#94a3b8", letterSpacing: "1.5px", fontSize: "14px", margin: 0, maxWidth: "550px", lineHeight: "1.6" }}>
          A ledger of active technical systems, interactive web applications, and local hardware innovations.
        </p>
      </div>

      {/* 🛠️ Projects Grid Matrix */}
      <div style={{
        maxWidth: "1050px", width: "100%", display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "24px",
        boxSizing: "border-box"
      }}>
        {projectData.map((project, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={project.title}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: "rgba(10, 7, 24, 0.55)",
                border: isHovered ? `1px solid ${project.accentColor}` : "1px solid rgba(168, 85, 247, 0.2)",
                borderRadius: "16px", padding: "32px", boxSizing: "border-box",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                backdropFilter: "blur(10px)",
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                boxShadow: isHovered ? `0 15px 40px ${project.glow}` : "0 4px 20px rgba(0,0,0,0.3)"
              }}
            >
              <div>
                {/* Title & Icon Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "400", letterSpacing: "1px", color: "#ffffff" }}>
                    {project.title}
                  </h3>
                  {/* ✅ Swapped securely to Fa icons */}
                  {project.liveUrl ? (
                    <FaCodeBranch style={{ color: project.accentColor, fontSize: "16px" }} />
                  ) : (
                    <FaMicrochip style={{ color: project.accentColor, fontSize: "16px" }} />
                  )}
                </div>

                {/* Subtitle Tagline */}
                <div style={{ fontSize: "12px", color: project.accentColor, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600", marginBottom: "16px" }}>
                  {project.tagline}
                </div>

                {/* Description */}
                <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6" }}>
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{
                      fontSize: "11px", color: "#94a3b8", backgroundColor: "rgba(255,255,255,0.04)",
                      padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Button */}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      width: "100%", padding: "12px", borderRadius: "8px", textDecoration: "none",
                      fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px",
                      boxSizing: "border-box", transition: "all 0.3s",
                      border: `1px solid ${project.accentColor}`,
                      backgroundColor: isHovered ? project.accentColor : "transparent",
                      color: isHovered ? "#06060e" : "#ffffff",
                      boxShadow: isHovered ? `0 0 15px ${project.accentColor}` : "none"
                    }}
                  >
                    Launch Live System <FaExternalLinkAlt style={{ fontSize: "12px" }} />
                  </a>
                ) : (
                  <div style={{
                    textAlign: "center", padding: "12px", borderRadius: "8px",
                    fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px",
                    border: "1px dashed rgba(255,255,255,0.15)", color: "#64748b"
                  }}>
                    Hardware Core // Internal Deployment
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}