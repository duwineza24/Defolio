import { useState, useEffect, useRef } from "react";
import { IoHomeOutline, IoCodeSlashOutline } from "react-icons/io5";

const skillNodes = [
  { name:"React",        category:"Frontend",   level:"Advanced Core",           desc:"Building high-performance 3D UI layers and fluid web matrix applications.",                      color:"#38bdf8" },
  { name:"Node.js",      category:"Runtime",    level:"Fullstack Architecture",  desc:"Structuring scalable JavaScript servers and ecosystem communication.",                          color:"#4ade80" },
  { name:"C++",          category:"Systems",    level:"Robotics Logic",          desc:"Programming algorithmic controllers and hardware task matrices for competitions.",               color:"#60a5fa" },
  { name:"Java",         category:"Systems",    level:"Application Logic",       desc:"Designing robust backend data models and objective-oriented systems.",                          color:"#fb923c" },
  { name:"Python",       category:"Automation", level:"Scripting & AI",          desc:"Writing community data scanners, optimization scripts, and logic trees.",                      color:"#facc15" },
  { name:"Express.js",   category:"Backend",    level:"API Infrastructure",      desc:"Engineering fast, secure routing frameworks and structural network endpoints.",                color:"#a78bfa" },
  { name:"PHP",          category:"Server",     level:"Data Engineering",        desc:"Handling server-side computations, database connections, and classic web logic.",              color:"#f472b6" },
  { name:"JavaScript",   category:"Core",       level:"Engine Core",             desc:"The root engine behind my entire development workflow — asynchronous logic mastery.",          color:"#fde047" },
  { name:"HTML5",        category:"Frontend",   level:"Structure Foundation",    desc:"Crafting semantic, accessible web structural layouts and modern document frameworks.",         color:"#f06529" },
  { name:"CSS3",         category:"Frontend",   level:"Style Engine",            desc:"Designing glassmorphic layouts, responsive grids, and deep neon UI animations.",              color:"#2965f1" },
  { name:"Tailwind CSS", category:"Frontend",   level:"Atomic Styling Engine",   desc:"Deploying rapid utility class architectures to engineer responsive production-ready layouts.", color:"#06b6d4" },
];

export default function SkillsPage({ onClose }) {
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

      <button onClick={onClose} style={{ position:"absolute",top:24,left:24,backgroundColor:"rgba(30,27,75,0.6)",border:"1px solid rgba(168,85,247,0.4)",color:"#a855f7",width:48,height:48,borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",fontSize:20 }}>
        <IoHomeOutline />
      </button>

      <div style={{ textAlign:"center",marginBottom:40 }}>
        <h1 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:300,letterSpacing:4,textTransform:"uppercase",margin:"0 0 8px",textShadow:"0 0 15px rgba(168,85,247,0.6)" }}>Engine Control Vault</h1>
        <p style={{ color:"#94a3b8",letterSpacing:1.5,fontSize:14,margin:0,maxWidth:500,lineHeight:1.6 }}>Hover over any engineering module block to map out deployment scopes and functionality.</p>
      </div>

      <div style={{ maxWidth:1000,width:"100%",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20,boxSizing:"border-box" }}>
        {skillNodes.map((node, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div key={node.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ backgroundColor:isHovered?"rgba(15,12,38,0.75)":"rgba(10,7,24,0.5)",border:isHovered?`1px solid ${node.color}`:"1px solid rgba(168,85,247,0.2)",borderRadius:14,padding:24,boxSizing:"border-box",transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",cursor:"pointer",transform:isHovered?"translateY(-6px) scale(1.02)":"translateY(0) scale(1)" }}
            >
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontSize:11,textTransform:"uppercase",letterSpacing:1,color:isHovered?"#fff":"#807dfa",fontWeight:600,backgroundColor:"rgba(131,125,250,0.1)",padding:"2px 8px",borderRadius:4 }}>{node.category}</span>
                <IoCodeSlashOutline style={{ color:isHovered?node.color:"#475569",transition:"color 0.3s" }} />
              </div>
              <h3 style={{ margin:"0 0 4px",fontSize:22,fontWeight:500,letterSpacing:0.5 }}>{node.name}</h3>
              <div style={{ fontSize:13,color:node.color,fontWeight:500,marginBottom:12 }}>{node.level}</div>
              <p style={{ margin:0,fontSize:13.5,color:isHovered?"#e2e8f0":"#94a3b8",lineHeight:1.5,transition:"color 0.3s" }}>{node.desc}</p>
              <div style={{ width:"100%",height:4,backgroundColor:"rgba(255,255,255,0.05)",marginTop:16,borderRadius:2,overflow:"hidden" }}>
                <div style={{ width:isHovered?"100%":"30%",height:"100%",backgroundColor:node.color,transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)",borderRadius:2 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}