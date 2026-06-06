import { useState, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";

export default function Contact({ onClose }) {
  const canvasRef = useRef(null);

  // 📡 State Matrix for inputs and server transmission feedback
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); 
  const [isSending, setIsSending] = useState(false);

  // Handle value tracking from inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Transmit Signal Pipeline to your Backend Server
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check to avoid blank submissions
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("All communication vectors must be filled.");
      return;
    }

    setIsSending(true);
    setStatus("Transmitting Signal...");

    try {
      // Points to your local node process or uses your Vercel deployment variables
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Fixed bug: Corrected from 'form' to 'formData'
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Signal Dispatched! Check your inbox.");
        setFormData({ name: "", email: "", message: "" }); // Clean out form inputs safely
      } else {
        setStatus("Transmission Rejected by server core.");
      }
    } catch (error) {
      console.error("Pipeline failure:", error);
      setStatus("Connection failure. Is your backend server running?");
    } finally {
      setIsSending(false);
    }
  };

  // 🌌 Animate canvas background particles over the background image
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
      overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center",
      backgroundColor: "#06060e"
    }}>
      
      {/* 🖼️ BACKGROUND IMAGE */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        backgroundImage: 'url("/contact-image.png")', backgroundSize: "cover",
        backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.45, zIndex: -2
      }} />

      {/* 🔮 COSMIC PARTICLES */}
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }} />

      {/* 🏡 Home Circle Button */}
      <button 
        onClick={onClose}
        style={{
          position: "absolute", top: "24px", left: "24px", backgroundColor: "rgba(30, 27, 75, 0.6)",
          border: "1px solid rgba(168, 85, 247, 0.5)", color: "#a855f7", width: "48px", height: "48px",
          borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center",
          cursor: "pointer", fontSize: "20px", transition: "all 0.3s", zIndex: 100
        }}
        title="Return to Nexus"
      >
        <IoHomeOutline />
      </button>

      {/* 📄 GLASSMORPHIC CONTENT PANEL */}
      <div style={{
        maxWidth: "540px", width: "90%", textAlign: "center", backgroundColor: "rgba(10, 7, 24, 0.55)",
        border: "1px solid rgba(168, 85, 247, 0.3)", backdropFilter: "blur(20px)", borderRadius: "16px",
        padding: "40px 32px", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.1)",
        boxSizing: "border-box"
      }}>
        <h1 style={{
          fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "300", color: "#ffffff",
          letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 12px 0",
          textShadow: "0 0 15px rgba(168, 85, 247, 0.6)"
        }}>
          Bridge the Void
        </h1>
        
        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", letterSpacing: "0.5px", margin: "0 0 24px 0" }}>
          Send your concepts drifting through the digital ether. Drop a line below and let the network align our realities.
        </p>

        {/* 📟 Real-Time Status Output Layer with Dynamic Color Coding */}
        {status && (
          <div style={{
            fontSize: "13px",
            // 🎨 Smooth dynamic colors based on application states
            color: status.includes("Dispatched") 
              ? "#34d399" // Neon Green for successful delivery
              : status.includes("Transmitting") 
              ? "#38bdf8" // Neon Cyan/Blue for active sending 🌌
              : "#f87171", // Red ONLY if something actually breaks
            backgroundColor: "rgba(255, 255, 255, 0.03)", 
            padding: "10px",
            borderRadius: "6px", 
            marginBottom: "20px", 
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            {status}
          </div>
        )}

        {/* Form Pipeline */}
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Identity / Name" 
            disabled={isSending}
            required
            style={{
              width: "100%", padding: "14px 16px", backgroundColor: "rgba(6, 6, 14, 0.7)",
              border: "1px solid rgba(168, 85, 247, 0.2)", borderRadius: "8px",
              color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "all 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#a855f7"}
            onBlur={(e) => e.target.style.borderColor = "rgba(168, 85, 247, 0.2)"}
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digital Address / Email" 
            disabled={isSending}
            required
            style={{
              width: "100%", padding: "14px 16px", backgroundColor: "rgba(6, 6, 14, 0.7)",
              border: "1px solid rgba(168, 85, 247, 0.2)", borderRadius: "8px",
              color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "all 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#a855f7"}
            onBlur={(e) => e.target.style.borderColor = "rgba(168, 85, 247, 0.2)"}
          />
          <textarea 
            placeholder="Transmit your message..." 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            disabled={isSending}
            required
            style={{
              width: "100%", padding: "14px 16px", backgroundColor: "rgba(6, 6, 14, 0.7)",
              border: "1px solid rgba(168, 85, 247, 0.2)", borderRadius: "8px",
              color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box",
              resize: "none", transition: "all 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#a855f7"}
            onBlur={(e) => e.target.style.borderColor = "rgba(168, 85, 247, 0.2)"}
          />
          
          <button 
            type="submit"
            disabled={isSending}
            style={{
              marginTop: "8px", padding: "14px", backgroundColor: "transparent",
              border: "1px solid #a855f7", color: "#ffffff", borderRadius: "8px",
              fontSize: "14px", letterSpacing: "1px", cursor: isSending ? "not-allowed" : "pointer",
              textTransform: "uppercase", transition: "all 0.3s", boxShadow: "0 0 10px rgba(168, 85, 247, 0.1)",
              opacity: isSending ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (isSending) return;
              e.target.style.backgroundColor = "#a855f7";
              e.target.style.boxShadow = "0 0 25px rgba(168, 85, 247, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.boxShadow = "0 0 10px rgba(168, 85, 247, 0.1)";
            }}
          >
            {isSending ? "Transmitting..." : "Transmit Signal"}
          </button>
        </form>
      </div>
    </div>
  );
}