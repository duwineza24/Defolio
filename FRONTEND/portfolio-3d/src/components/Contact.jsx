import { useState, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import emailjs from "@emailjs/browser";

export default function Contact({ onClose }) {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { setStatus("All communication vectors must be filled."); return; }
    setIsSending(true); setStatus("Transmitting Signal...");
    try {
      const result = await emailjs.send(
        "service_1htm47j", "template_ofkyc35",
        { from_name: formData.name, reply_to: formData.email, message: formData.message },
        "YXDk2dyHFxdhW3k4R"
      );
      if (result.status === 200) { setStatus("Signal Dispatched! Check your inbox."); setFormData({ name:"", email:"", message:"" }); }
      else setStatus("Transmission Rejected by server core.");
    } catch {
      setStatus("Connection failure. Transmission Interrupted.");
    } finally { setIsSending(false); }
  };

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

  const inputStyle = { width:"100%",padding:"14px 16px",backgroundColor:"rgba(6,6,14,0.7)",border:"1px solid rgba(168,85,247,0.2)",borderRadius:8,color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",transition:"all 0.3s" };

  return (
    <div style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:90,overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#06060e" }}>
      <div style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:'url("/contact-image.png")',backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",opacity:0.45,zIndex:-2 }} />
      <canvas ref={canvasRef} style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:-1,pointerEvents:"none" }} />

      <button onClick={onClose} style={{ position:"absolute",top:24,left:24,backgroundColor:"rgba(30,27,75,0.6)",border:"1px solid rgba(168,85,247,0.5)",color:"#a855f7",width:48,height:48,borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",fontSize:20,zIndex:100 }}>
        <IoHomeOutline />
      </button>

      <div style={{ maxWidth:540,width:"90%",textAlign:"center",backgroundColor:"rgba(10,7,24,0.55)",border:"1px solid rgba(168,85,247,0.3)",backdropFilter:"blur(20px)",borderRadius:16,padding:"40px 32px",boxShadow:"0 20px 50px rgba(0,0,0,0.6),0 0 30px rgba(168,85,247,0.1)",boxSizing:"border-box" }}>
        <h1 style={{ fontSize:"clamp(26px,4vw,36px)",fontWeight:300,color:"#fff",letterSpacing:3,textTransform:"uppercase",margin:"0 0 12px",textShadow:"0 0 15px rgba(168,85,247,0.6)" }}>Bridge the Void</h1>
        <p style={{ fontSize:14,color:"#94a3b8",lineHeight:1.6,letterSpacing:0.5,margin:"0 0 24px" }}>Send your concepts drifting through the digital ether. Drop a line below and let the network align our realities.</p>

        {status && (
          <div style={{ fontSize:13,color:status.includes("Dispatched")?"#34d399":status.includes("Transmitting")?"#38bdf8":"#f87171",backgroundColor:"rgba(255,255,255,0.03)",padding:10,borderRadius:6,marginBottom:20,border:"1px solid rgba(255,255,255,0.05)" }}>
            {status}
          </div>
        )}

        <form style={{ display:"flex",flexDirection:"column",gap:16 }} onSubmit={handleSubmit}>
          <input type="text"  name="name"    value={formData.name}    onChange={handleChange} placeholder="Identity / Name"            disabled={isSending} required style={inputStyle} onFocus={(e)=>e.target.style.borderColor="#a855f7"} onBlur={(e)=>e.target.style.borderColor="rgba(168,85,247,0.2)"} />
          <input type="email" name="email"   value={formData.email}   onChange={handleChange} placeholder="Digital Address / Email"    disabled={isSending} required style={inputStyle} onFocus={(e)=>e.target.style.borderColor="#a855f7"} onBlur={(e)=>e.target.style.borderColor="rgba(168,85,247,0.2)"} />
          <textarea           name="message" value={formData.message} onChange={handleChange} placeholder="Transmit your message..." rows="4" disabled={isSending} required style={{ ...inputStyle,resize:"none" }} onFocus={(e)=>e.target.style.borderColor="#a855f7"} onBlur={(e)=>e.target.style.borderColor="rgba(168,85,247,0.2)"} />
          <button type="submit" disabled={isSending}
            style={{ marginTop:8,padding:14,backgroundColor:"transparent",border:"1px solid #a855f7",color:"#fff",borderRadius:8,fontSize:14,letterSpacing:1,cursor:isSending?"not-allowed":"pointer",textTransform:"uppercase",transition:"all 0.3s",opacity:isSending?0.5:1 }}
            onMouseEnter={(e)=>{ if(!isSending){e.target.style.backgroundColor="#a855f7";e.target.style.boxShadow="0 0 25px rgba(168,85,247,0.6)";} }}
            onMouseLeave={(e)=>{ e.target.style.backgroundColor="transparent";e.target.style.boxShadow="none"; }}
          >
            {isSending ? "Transmitting..." : "Transmit Signal"}
          </button>
        </form>
      </div>
    </div>
  );
}