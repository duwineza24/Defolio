

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import OrbitingMenu from "../components/OrbitingMenu";
import Contact from "../components/Contact";
import About from "../components/About";
import SkillsPage from "../components/SkillsPage";
import ProjectsPage from "../components/ProjectsPage";
import { IoVolumeHighOutline, IoVolumeMuteOutline, IoLogoGithub, IoLogoLinkedin, IoDocumentTextOutline } from "react-icons/io5";
 
// ── Floating dust particles ──────────────────────────────────────────────────
const initialDustPositions = (() => {
  const count = 150;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3]     = Math.sin(i * 0.95) * 5.5;
    arr[i * 3 + 1] = Math.cos(i * 1.42) * 5.5;
    arr[i * 3 + 2] = Math.sin(i * 2.11) * 4.0;
  }
  return arr;
})();

function TinyFloatingDust() {
  const pointsRef = useRef();
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.18;
      pointsRef.current.rotation.x = Math.sin(time * 0.12) * 0.15;
    }
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialDustPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.06} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

// ── Spinning star crest around the center ────────────────────────────────────
function SpinningStarCrest() {
  const starRef    = useRef();
  const torusRef   = useRef();

  const starShape = (() => {
    const shape = new THREE.Shape();
    const spikes = 16, outerR = 1.35, innerR = 0.62;
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i / (spikes * 2)) * Math.PI * 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = Math.cos(angle) * r, y = Math.sin(angle) * r;
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  })();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (starRef.current) {
      starRef.current.rotation.z += delta * 0.22;
      starRef.current.rotation.x  = Math.sin(t * 0.7) * 0.18;
      starRef.current.rotation.y  = Math.cos(t * 0.7) * 0.18;
      starRef.current.position.y  = Math.sin(t * 1.5) * 0.08;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z -= delta * 0.5;
      torusRef.current.rotation.x  = Math.sin(t * 0.9) * 0.12;
      torusRef.current.position.y  = Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Wireframe 16-point star spinning around center */}
      <mesh ref={starRef}>
        <extrudeGeometry args={[starShape, { depth: 0.12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 }]} />
        <meshStandardMaterial
          color="#0b071e"
          emissive="#a855f7"
          emissiveIntensity={3.0}
          wireframe={true}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Cyan inner ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[0.72, 0.018, 10, 80]} />
        <meshStandardMaterial color="#38bdf8" emissive="#2563eb" emissiveIntensity={4.0} roughness={0} />
      </mesh>
    </group>
  );
}

// ── Main scene ───────────────────────────────────────────────────────────────
export default function PortfolioScene() {
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [showModal,  setShowModal]  = useState(true);
  const [activePage, setActivePage] = useState("Home");
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/birds.mp3");
    audioRef.current.loop   = true;
    audioRef.current.volume = 0.4;
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  const handleModalChoice = (playMusic) => {
    setShowModal(false);
    if (playMusic && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => { console.warn("Audio playback failed:", err); });
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch((err) => { console.warn("Audio play (toggle) failed:", err); });
    setIsPlaying(!isPlaying);
  };

  const isHome = activePage === "Home";

  return (
    <div style={{ width:"100vw", height:"100vh", position:"fixed", top:0, left:0, overflow:"hidden", background:"#060818" }}>

      {/* ── MUSIC MODAL ───────────────────────────────────────────────────── */}
      {showModal && (
        <div style={{ position:"absolute",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(6,6,14,0.9)",backdropFilter:"blur(10px)",zIndex:1000,display:"flex",justifyContent:"center",alignItems:"center" }}>
          <div style={{ backgroundColor:"rgba(15,23,42,0.4)",border:"1px solid #eab308",borderRadius:6,padding:"32px 48px",textAlign:"center",maxWidth:460,width:"90%" }}>
            <h3 style={{ color:"#fff",fontFamily:"sans-serif",fontSize:20,fontWeight:400,margin:"0 0 24px" }}>
              Do you like to play the background music?
            </h3>
            <div style={{ display:"flex",justifyContent:"center",gap:20 }}>
              <button onClick={() => handleModalChoice(true)}  style={{ backgroundColor:"transparent",border:"1px solid #eab308",color:"#fff",padding:"8px 24px",borderRadius:4,cursor:"pointer" }}>Yes</button>
              <button onClick={() => handleModalChoice(false)} style={{ backgroundColor:"transparent",border:"1px solid #eab308",color:"#fff",padding:"8px 24px",borderRadius:4,cursor:"pointer" }}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* ── SOUND TOGGLE ──────────────────────────────────────────────────── */}
      {!showModal && (
        <button onClick={toggleSound} style={{ position:"absolute",top:24,right:24,zIndex:200,width:48,height:48,borderRadius:"50%",backgroundColor:isPlaying?"rgba(30,27,75,0.85)":"rgba(15,23,42,0.5)",border:isPlaying?"1px solid #eab308":"1px solid rgba(255,255,255,0.2)",color:isPlaying?"#eab308":"#fff",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",fontSize:22 }}>
          {isPlaying ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
        </button>
      )}

      {/* ── PAGE OVERLAYS ─────────────────────────────────────────────────── */}
      {!showModal && activePage === "Contact"  && <Contact      onClose={() => setActivePage("Home")} />}
      {!showModal && activePage === "About"    && <About        onClose={() => setActivePage("Home")} />}
      {!showModal && activePage === "Skills"   && <SkillsPage   onClose={() => setActivePage("Home")} />}
      {!showModal && activePage === "Projects" && <ProjectsPage onClose={() => setActivePage("Home")} />}

      {/* ── HOME UI OVERLAY ───────────────────────────────────────────────── */}
      {!showModal && isHome && (
        <>
          {/* "devothe" label above circle */}
          {/* <div style={{ position:"absolute",top:"calc(50% - 125px)",left:"50%",transform:"translateX(-50%)",zIndex:20,pointerEvents:"none",textAlign:"center" }}>
            <span style={{ fontSize:13,color:"rgba(255,255,255,0.72)",letterSpacing:"0.2em",fontFamily:"'Segoe UI',Roboto,sans-serif",textTransform:"lowercase" }}>
              devothe
            </span>
          </div> */}

          {/* Profile photo with glowing ring */}
          <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:10,pointerEvents:"none",animation:"floatY 3.5s ease-in-out infinite" }}>
            {/* Outer glow ring */}
            <div style={{ position:"absolute",inset:-5,borderRadius:"50%",border:"2px solid rgba(168,85,247,0.75)",boxShadow:"0 0 28px rgba(168,85,247,0.5),0 0 55px rgba(56,189,248,0.12)",zIndex:2 }} />
            {/* Photo */}
            <div style={{ width:140,height:140,borderRadius:"50%",overflow:"hidden",background:"linear-gradient(135deg,#1e1b4b,#4c1d95)",position:"relative",zIndex:1 }}>
              <img
                src="/me.png"
                alt="Devothe Uwineza"
                style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }}
                onError={(e) => { e.target.style.display="none"; }}
              />
            </div>
          </div>

          {/* Name + role below circle (styled) */}
          <div style={{ position:"absolute",top:"calc(50% + 96px)",left:"50%",transform:"translateX(-50%)",zIndex:20,pointerEvents:"none",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
            <div style={{ padding:"8px 16px",borderRadius:12,backdropFilter:"blur(6px)",background:"linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",border:"1px solid rgba(168,85,247,0.08)",boxShadow:"0 6px 24px rgba(10,7,24,0.6)" }}>
              <h1 style={{ fontSize:"clamp(18px,3vw,26px)",fontWeight:800,margin:0,background:"linear-gradient(90deg,#ffffff,#a855f7,#38bdf8)",WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",letterSpacing:"0.18em",textTransform:"uppercase",fontFamily:"'Segoe UI',Roboto,sans-serif" }}>
                DEVOTHE UWINEZA
              </h1>
              <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginTop:6 }}>
                <span style={{ fontSize:11,padding:"6px 10px",borderRadius:999,background:"rgba(24,18,48,0.6)",border:"1px solid rgba(168,85,247,0.14)",color:"rgba(168,85,247,0.95)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",fontFamily:"'Segoe UI',Roboto,sans-serif" }}>
                  DEVELOPER
                </span>
                <span style={{ width:6,height:6,borderRadius:6,background:"linear-gradient(180deg,#a855f7,#38bdf8)",boxShadow:"0 0 8px rgba(168,85,247,0.6)" }} />
              </div>
            </div>
          </div>

          {/* Right sidebar links */}
          <div style={{ position:"absolute",right:24,top:"50%",transform:"translateY(-50%)",zIndex:200,display:"flex",flexDirection:"column",gap:14 }}>
            {[
              { icon:<IoLogoGithub />,         href:"https://github.com/duwineza24",                           title:"GitHub" },
              { icon:<IoLogoLinkedin />,        href:"https://www.linkedin.com/in/devothe-uwineza-20055b376/", title:"LinkedIn" },
              { icon:<IoDocumentTextOutline />, href:"/resume.pdf",                                             title:"Resume" },
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}
                style={{ width:44,height:44,borderRadius:"50%",backgroundColor:"rgba(20,16,50,0.8)",border:"1px solid rgba(99,102,241,0.45)",display:"flex",alignItems:"center",justifyContent:"center",color:"#93c5fd",fontSize:18,textDecoration:"none",transition:"all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor="rgba(76,29,149,0.9)";e.currentTarget.style.borderColor="#a855f7";e.currentTarget.style.color="#f3e8ff";e.currentTarget.style.boxShadow="0 0 14px rgba(168,85,247,0.55)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor="rgba(20,16,50,0.8)";e.currentTarget.style.borderColor="rgba(99,102,241,0.45)";e.currentTarget.style.color="#93c5fd";e.currentTarget.style.boxShadow="none"; }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Bottom hover label */}
          <div style={{ position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:20,pointerEvents:"none",textAlign:"center" }}>
            <p style={{ fontSize:12,color:"rgba(147,197,253,0.85)",letterSpacing:"0.12em",margin:0,fontFamily:"'Segoe UI',Roboto,sans-serif" }}>
              {hoveredMenuItem ? hoveredMenuItem : "hover the nodes · click to navigate"}
            </p>
          </div>
        </>
      )}

      {/* ── GLASS OVERLAY ─────────────────────────────────────────────────── */}
      <div style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(10,15,30,0.4)",backdropFilter:"blur(2px)",zIndex:0,pointerEvents:"none" }} />

      {/* ── THREE.JS CANVAS ───────────────────────────────────────────────── */}
      <Canvas camera={{ position:[0,0,12], fov:45 }} style={{ position:"relative",zIndex:1 }}>
        <fog attach="fog" args={["#0a0f1e", 8, 20]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10,10,10]} intensity={3} />
        <pointLight position={[-10,-10,-10]} intensity={2} color="#a855f7" />
        <Stars radius={40} depth={50} count={1200} factor={4} speed={1.5} />
        <TinyFloatingDust />

        {/* Spinning star sits at center position */}
        <SpinningStarCrest />

        <group position={[0,0,0]}>
          <OrbitingMenu onNavigate={setActivePage} onHoverChange={setHoveredMenuItem} />
        </group>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* ── KEYFRAMES ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes floatY {
          0%,100% { transform: translate(-50%,-50%) translateY(0px); }
          50%      { transform: translate(-50%,-50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
