import { useState, useEffect, useRef } from "react";
import { FaHome, FaExternalLinkAlt, FaCodeBranch, FaMicrochip } from "react-icons/fa";

const projectData = [
  {
    title:"Kanda Shop",
    tagline:"E-Commerce Deployment Platform",
    desc:"A production-grade, full-stack digital marketplace system. Engineered with a responsive design layer to handle seamless product browsing, robust data models, and fluid client-to-server operations.",
    liveUrl:"https://kanda-shop.onrender.com/",
    tech:["React","Node.js","Express.js","Tailwind CSS","JavaScript"],
    accentColor:"#38bdf8", glow:"rgba(56,189,248,0.25)",
  },
  {
    title:"FindMe System",
    tagline:"Location & Finder Protocol",
    desc:"An innovative digital mapping/search engine application architected to bridge local data voids. Built with automated asset routing to help communities find essential resources dynamically.",
    liveUrl:"https://findme-1-q9sv.onrender.com/",
    tech:["React","Node.js","Express.js","CSS3","API Integration"],
    accentColor:"#a855f7", glow:"rgba(168,85,247,0.25)",
  },
];

export default function ProjectsPage({ onClose }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const onResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      speedY: -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.5 + 0.2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.opacity})`; ctx.shadowBlur = 8; ctx.shadowColor = "#a855f7"; ctx.fill();
        p.y += p.speedY; if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      });
      ctx.shadowBlur = 0; animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:90,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#06060e",padding:"80px 20px 40px",boxSizing:"border-box",fontFamily:"'Segoe UI',Roboto,sans-serif",color:"#fff" }}>
      <div style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundImage:'url("/contact-image.png")',backgroundSize:"cover",backgroundPosition:"center",opacity:0.12,zIndex:-3,pointerEvents:"none" }} />
      <div style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(10,7,24,0.75)",backdropFilter:"blur(4px)",zIndex:-2,pointerEvents:"none" }} />
      <canvas ref={canvasRef} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1,pointerEvents:"none" }} />

      <button onClick={onClose} style={{ position:"absolute",top:24,left:24,backgroundColor:"rgba(30,27,75,0.6)",border:"1px solid rgba(168,85,247,0.4)",color:"#a855f7",width:48,height:48,borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",fontSize:18 }}>
        <FaHome />
      </button>

      <div style={{ textAlign:"center",marginBottom:50 }}>
        <h1 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:300,letterSpacing:4,textTransform:"uppercase",margin:"0 0 8px",textShadow:"0 0 15px rgba(168,85,247,0.6)" }}>Deployment Hub</h1>
        <p style={{ color:"#94a3b8",letterSpacing:1.5,fontSize:14,margin:0,maxWidth:550,lineHeight:1.6 }}>A ledger of active technical systems, interactive web applications, and local hardware innovations.</p>
      </div>

      <div style={{ maxWidth:1050,width:"100%",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:24,boxSizing:"border-box" }}>
        {projectData.map((project, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div key={project.title}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ backgroundColor:"rgba(10,7,24,0.55)",border:isHovered?`1px solid ${project.accentColor}`:"1px solid rgba(168,85,247,0.2)",borderRadius:16,padding:32,boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"space-between",backdropFilter:"blur(10px)",transition:"all 0.4s cubic-bezier(0.25,1,0.5,1)",transform:isHovered?"translateY(-8px)":"translateY(0)",boxShadow:isHovered?`0 15px 40px ${project.glow}`:"0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6 }}>
                  <h3 style={{ margin:0,fontSize:24,fontWeight:400,letterSpacing:1,color:"#fff" }}>{project.title}</h3>
                  {project.liveUrl ? <FaCodeBranch style={{ color:project.accentColor,fontSize:16 }} /> : <FaMicrochip style={{ color:project.accentColor,fontSize:16 }} />}
                </div>
                <div style={{ fontSize:12,color:project.accentColor,textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,marginBottom:16 }}>{project.tagline}</div>
                <p style={{ margin:"0 0 24px",fontSize:14,color:"#cbd5e1",lineHeight:1.6 }}>{project.desc}</p>
              </div>
              <div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:24 }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{ fontSize:11,color:"#94a3b8",backgroundColor:"rgba(255,255,255,0.04)",padding:"4px 10px",borderRadius:6,border:"1px solid rgba(255,255,255,0.05)" }}>{t}</span>
                  ))}
                </div>
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:12,borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600,textTransform:"uppercase",letterSpacing:1,boxSizing:"border-box",transition:"all 0.3s",border:`1px solid ${project.accentColor}`,backgroundColor:isHovered?project.accentColor:"transparent",color:isHovered?"#06060e":"#fff",boxShadow:isHovered?`0 0 15px ${project.accentColor}`:"none" }}>
                    Launch Live System <FaExternalLinkAlt style={{ fontSize:12 }} />
                  </a>
                ) : (
                  <div style={{ textAlign:"center",padding:12,borderRadius:8,fontSize:12,textTransform:"uppercase",letterSpacing:1,border:"1px dashed rgba(255,255,255,0.15)",color:"#64748b" }}>Hardware Core // Internal Deployment</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}