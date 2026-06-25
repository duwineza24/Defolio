import { useState, useEffect, useRef } from "react";
import { IoHomeOutline, IoPersonOutline, IoBriefcaseOutline, IoTerminalOutline } from "react-icons/io5";

export default function About({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
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
    const particles = Array.from({ length: 45 }, (_, i) => ({
      x: Math.sin(i * 9.8) * width * 0.5 + width * 0.5,
      y: Math.cos(i * 3.4) * height * 0.5 + height * 0.5,
      radius: Math.abs(Math.sin(i)) * 3 + 1,
      speedY: -(Math.abs(Math.cos(i)) * 0.4 + 0.1),
      opacity: Math.abs(Math.sin(i * 2)) * 0.5 + 0.2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.opacity})`; ctx.shadowBlur = 10; ctx.shadowColor = "#a855f7"; ctx.fill();
        p.y += p.speedY; if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      });
      ctx.shadowBlur = 0; animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  const panel = { backgroundColor: "rgba(10,7,24,0.6)", border: "1px solid rgba(168,85,247,0.25)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 40, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" };

  return (
    <div style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:90,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#06060e",padding:"80px 20px 40px",boxSizing:"border-box",fontFamily:"'Segoe UI',Roboto,sans-serif",color:"#fff" }}>
      <div style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundImage:'url("/contact-image.png")',backgroundSize:"cover",backgroundPosition:"center",zIndex:-3,pointerEvents:"none" }} />
      <div style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(10,7,24,0.7)",backdropFilter:"blur(3px)",zIndex:-2,pointerEvents:"none" }} />
      <canvas ref={canvasRef} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1,pointerEvents:"none" }} />

      <button onClick={onClose} style={{ position:"absolute",top:24,left:24,backgroundColor:"rgba(30,27,75,0.6)",border:"1px solid rgba(168,85,247,0.4)",color:"#a855f7",width:48,height:48,borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",fontSize:20 }}>
        <IoHomeOutline />
      </button>

      <div style={{ textAlign:"center",marginBottom:30 }}>
        <h1 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:300,letterSpacing:4,textTransform:"uppercase",margin:"0 0 8px",textShadow:"0 0 15px rgba(168,85,247,0.6)" }}>Devothe Uwineza</h1>
        <p style={{ color:"#a855f7",letterSpacing:2,textTransform:"uppercase",fontSize:14,margin:0 }}>Software Developer & iLEAD Leader // Systems Innovator</p>
      </div>

      <div style={{ display:"flex",gap:10,marginBottom:30,backgroundColor:"rgba(15,23,42,0.5)",padding:6,borderRadius:30,border:"1px solid rgba(168,85,247,0.2)" }}>
        {[
          { id:"profile", label:"The Leader-Developer", icon:<IoPersonOutline /> },
          { id:"journey", label:"The Journey",          icon:<IoBriefcaseOutline /> },
          { id:"stack",   label:"Tech Stack",           icon:<IoTerminalOutline /> },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:20,border:"none",cursor:"pointer",fontSize:14,backgroundColor:activeTab===tab.id?"#a855f7":"transparent",color:activeTab===tab.id?"#fff":"#94a3b8",transition:"all 0.3s" }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth:850,width:"100%",...panel,boxSizing:"border-box" }}>

        {activeTab === "profile" && (
          <div style={{ display:"flex",flexDirection:"column",gap:30 }}>
            <div>
              <h3 style={{ color:"#a855f7",margin:"0 0 12px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>About Me</h3>
              <p style={{ color:"#cbd5e1",lineHeight:1.7,fontSize:15,margin:0 }}>I am a passionate software developer driven by a single mission: building digital solution systems that solve real-life problems within my community. I don't just write code for screen pixels — I design algorithms with empathy, using computer science to create a tangible impact.</p>
            </div>
            <div style={{ backgroundColor:"rgba(234,179,8,0.04)",border:"1px dashed rgba(234,179,8,0.3)",padding:24,borderRadius:12,position:"relative" }}>
              <div style={{ position:"absolute",top:-12,right:20,backgroundColor:"#eab308",color:"#06060e",fontSize:11,fontWeight:"bold",padding:"2px 10px",borderRadius:10,textTransform:"uppercase",letterSpacing:1 }}>Leadership Core</div>
              <h4 style={{ color:"#eab308",margin:"0 0 8px",fontSize:16,fontWeight:600 }}>iLEAD Rwanda Alumni Excellence</h4>
              <p style={{ margin:0,fontSize:14.5,color:"#cbd5e1",lineHeight:1.6 }}>Through the intensive <strong>iLEAD program</strong>, I unlocked the tools to become one of tomorrow's great leaders. This transformational experience taught me that real technology requires strong values. It shaped my approach to software engineering: combining technical excellence with the communication, critical thinking, and visionary leadership needed to lead teams and scale community-focused innovations.</p>
            </div>
            <div>
              <h3 style={{ color:"#a855f7",margin:"0 0 16px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>Languages</h3>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:15 }}>
                {[
                  { lang:"English",       level:"Native Academic Fluency" },
                  { lang:"Kinyarwanda",   level:"Fluent Speaker // Heritage" },
                  { lang:"Sign Language", level:"Inclusive Communication" },
                ].map((l, i) => (
                  <div key={i} style={{ backgroundColor:"rgba(6,6,14,0.4)",padding:14,borderRadius:8,border:"1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontWeight:600,color:"#fff",marginBottom:2 }}>{l.lang}</div>
                    <div style={{ fontSize:13,color:"#94a3b8" }}>{l.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "journey" && (
          <div>
            <h3 style={{ color:"#a855f7",margin:"0 0 20px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>Education</h3>
            <div style={{ position:"relative",borderLeft:"2px solid #a855f7",paddingLeft:20,marginBottom:40,marginLeft:10 }}>
              <div style={{ position:"absolute",width:12,height:12,borderRadius:"50%",backgroundColor:"#eab308",left:-7,top:4 }} />
              <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:6 }}>
                <span style={{ fontWeight:600,fontSize:16,color:"#fff" }}>Liquidnet Family High School @ ASYV</span>
                <span style={{ color:"#eab308",fontSize:14 }}>2023 – 2027</span>
              </div>
              <div style={{ color:"#94a3b8",fontSize:14,marginBottom:4 }}>Rwamagana, Rwanda</div>
              <div style={{ color:"#cbd5e1",fontSize:14 }}>Combination: <span style={{ color:"#a855f7" }}>Mathematics, Physics & Computer Science (MPC)</span></div>
            </div>

            <h3 style={{ color:"#a855f7",margin:"0 0 20px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>Experience</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
              {[
                { title:"Lead Robotics Programmer",  date:"Apr 2024 – Present",  loc:"Robotics & Innovation Club",    desc:"Developing and programming physical robot architectures for state competitions." },
                { title:"Software Track Scholar",     date:"Sep 2024 – Present",  loc:"Programming Class Alpha",       desc:"Mastering software architectures and computer systems to create innovative tech projects." },
                { title:"Technical Cohort Fellow",    date:"Aug 2024 – Sep 2024", loc:"HerInTech",                    desc:"Completed an advanced tech accelerator camp to empower girls with industry software stacks." },
                { title:"Humanitarian First Responder",date:"Aug 2024 – Sep 2024",loc:"Croix Rouge Rwanda (Red Cross)","desc":"Certified first-aid and crisis management training with humanitarian cooperation values." },
                { title:"Global Scholar Alumna",      date:"Jun 2025",            loc:"Yale Young African Scholars",   desc:"Collaborative global problem-solving with top student minds across Africa via YYAS." },
              ].map((exp, i) => (
                <div key={i} style={{ backgroundColor:"rgba(6,6,14,0.4)",padding:20,borderRadius:10,border:"1px solid rgba(168,85,247,0.1)" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8 }}>
                    <h4 style={{ margin:0,fontSize:16,color:"#fff",fontWeight:600 }}>{exp.title}</h4>
                    <span style={{ fontSize:13,color:"#eab308" }}>{exp.date}</span>
                  </div>
                  <div style={{ fontSize:13,color:"#a855f7",marginBottom:8 }}>{exp.loc}</div>
                  <p style={{ margin:0,fontSize:14,color:"#cbd5e1",lineHeight:1.5 }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stack" && (
          <div style={{ display:"flex",flexDirection:"column",gap:30 }}>
            <div>
              <h3 style={{ color:"#a855f7",margin:"0 0 16px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>Core Engineering Languages</h3>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12 }}>
                {[
                  { name:"React",        type:"Frontend Core",     color:"#38bdf8" },
                  { name:"Node.js",      type:"JS Environment",    color:"#4ade80" },
                  { name:"C++",          type:"Robotics Logic",    color:"#60a5fa" },
                  { name:"Java",         type:"System Logic",      color:"#fb923c" },
                  { name:"Python",       type:"Scripts & AI",      color:"#facc15" },
                  { name:"Express.js",   type:"Backend API",       color:"#a78bfa" },
                  { name:"PHP",          type:"Server Logic",      color:"#f472b6" },
                  { name:"JavaScript",   type:"Web Engine",        color:"#fde047" },
                  { name:"HTML5",        type:"Structure",         color:"#f06529" },
                  { name:"CSS3",         type:"Style",             color:"#2965f1" },
                  { name:"Tailwind CSS", type:"Utility Styling",   color:"#06b6d4" },
                ].map((s, i) => (
                  <div key={i} style={{ backgroundColor:"rgba(6,6,14,0.5)",border:"1px solid rgba(255,255,255,0.05)",padding:16,borderRadius:10,textAlign:"center",position:"relative",overflow:"hidden" }}>
                    <div style={{ position:"absolute",top:0,left:0,width:"100%",height:3,backgroundColor:s.color }} />
                    <div style={{ fontWeight:600,fontSize:15,color:"#fff",marginBottom:4 }}>{s.name}</div>
                    <div style={{ fontSize:12,color:"#94a3b8" }}>{s.type}</div>
                  </div>
                ))}
              </div>
            </div>
            <hr style={{ border:0,borderTop:"1px solid rgba(168,85,247,0.15)" }} />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:30 }}>
              <div>
                <h3 style={{ color:"#a855f7",margin:"0 0 12px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>Leadership Competencies</h3>
                <ul style={{ paddingLeft:20,margin:0,color:"#cbd5e1",lineHeight:1.8,fontSize:14 }}>
                  <li><strong style={{ color:"#fff" }}>Visionary Teamwork:</strong> Bringing people together to tackle difficult engineering milestones.</li>
                  <li><strong style={{ color:"#fff" }}>Public Communication:</strong> Translating complex technology into clear value pitches.</li>
                  <li><strong style={{ color:"#fff" }}>Systems Thinking:</strong> Spotting exactly where tech can help the community.</li>
                </ul>
              </div>
              <div>
                <h3 style={{ color:"#a855f7",margin:"0 0 12px",fontSize:18,textTransform:"uppercase",letterSpacing:1 }}>Credentials & Honors</h3>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                  {["iLEAD Leadership Certified","Wavumbuzi Entrepreneurship (2x)","Yale Young African Scholars","HerInTech Graduate Accelerator","Math & Science Quiz Laureate"].map((b, i) => (
                    <span key={i} style={{ backgroundColor:"rgba(234,179,8,0.1)",border:"1px solid rgba(234,179,8,0.3)",color:"#eab308",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500 }}>
                      🛡️ {b}
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