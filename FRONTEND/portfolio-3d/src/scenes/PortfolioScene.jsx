import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import Character from "../components/Character";
import OrbitingMenu from "../components/OrbitingMenu";
import Contact from "../components/Contact"; // 👈 Your sleek newly separated component file!
import About from "../components/About";
import SkillsPage from "../components/SkillsPage";
import ProjectsPage from "../components/ProjectsPage";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

const initialDustPositions = (() => {
  const count = 150;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = Math.sin(i * 0.95) * 5.5;     
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

export default function PortfolioScene() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(true); 
  const [activePage, setActivePage] = useState("Home"); 
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/birds.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    audioRef.current.onended = () => {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Loop block:", err));
    };

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const handleModalChoice = (playMusic) => {
    setShowModal(false); 
    if (playMusic && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio block active:", err));
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Playback block:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, overflow: "hidden" }}>
      
      {/* 📋 INTRO MUSIC WELCOME DIALOG POP-UP MODAL */}
      {showModal && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(6, 6, 14, 0.9)", backdropFilter: "blur(10px)", zIndex: 1000,
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "rgba(15, 23, 42, 0.4)", border: "1px solid #eab308",
            borderRadius: "6px", padding: "32px 48px", textAlign: "center", maxWidth: "460px", width: "90%"
          }}>
            <h3 style={{ color: "#ffffff", fontFamily: "sans-serif", fontSize: "20px", fontWeight: "400", margin: "0 0 24px 0" }}>
              Do you like to play the background music?
            </h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <button onClick={() => handleModalChoice(true)} style={{ backgroundColor: "transparent", border: "1px solid #eab308", color: "#ffffff", padding: "8px 24px", borderRadius: "4px", cursor: "pointer" }}>Yes</button>
              <button onClick={() => handleModalChoice(false)} style={{ backgroundColor: "transparent", border: "1px solid #eab308", color: "#ffffff", padding: "8px 24px", borderRadius: "4px", cursor: "pointer" }}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔊 CORNER HUD AUDIO CONTROLLER BUTTON */}
      {!showModal && (
        <button
          onClick={toggleSound}
          style={{
            position: "absolute", top: "24px", right: "24px", zIndex: 100, width: "48px", height: "48px", borderRadius: "50%",
            backgroundColor: isPlaying ? "rgba(30, 27, 75, 0.85)" : "rgba(15, 23, 42, 0.5)",
            border: isPlaying ? "1px solid #eab308" : "1px solid rgba(255, 255, 255, 0.2)",
            color: isPlaying ? "#eab308" : "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontSize: "22px"
          }}
        >
          {isPlaying ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
        </button>
      )}

      {/* 🔮 RENDER CUSTOM SEPARATE CONTACT INTERACTION VIEW LAYER */}
      {!showModal && activePage === "Contact" && (

        <Contact onClose={() => setActivePage("Home")} />
      )}
      {!showModal && activePage === "About" && (
        <About onClose={() => setActivePage("Home")} />
      )}
      {!showModal && activePage === "Skills" && (
        <SkillsPage onClose={() => setActivePage("Home")} />
      )}
      {!showModal && activePage === "Projects" && (
        <ProjectsPage onClose={() => setActivePage("Home")} />
      )}

      {/* 🌌 BASE GLASS LAYER OVERLAY */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(10, 15, 30, 0.4)", backdropFilter: "blur(2px)", zIndex: 0, pointerEvents: "none" }} />

      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} style={{ position: "relative", zIndex: 1 }}>
        <fog attach="fog" args={["#0a0f1e", 8, 20]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={3} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#a855f7" />
        <Stars radius={40} depth={50} count={1200} factor={4} speed={1.5} />

        <Suspense fallback={null}>
          <Character />
        </Suspense>

        <TinyFloatingDust />

        <group position={[0, 0, 0]}>
          <OrbitingMenu onNavigate={setActivePage} />
        </group>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}