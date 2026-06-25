// import { Suspense, useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";

// import OrbitingMenu from "../components/OrbitingMenu";
// import Contact from "../components/Contact";
// import About from "../components/About";
// import SkillsPage from "../components/SkillsPage";
// import ProjectsPage from "../components/ProjectsPage";
// import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

// // ── Floating dust particles around the orbit ────────────────────────────────
// const initialDustPositions = (() => {
//   const count = 150;
//   const arr = new Float32Array(count * 3);
//   for (let i = 0; i < count; i++) {
//     arr[i * 3]     = Math.sin(i * 0.95) * 5.5;
//     arr[i * 3 + 1] = Math.cos(i * 1.42) * 5.5;
//     arr[i * 3 + 2] = Math.sin(i * 2.11) * 4.0;
//   }
//   return arr;
// })();

// function TinyFloatingDust() {
//   const pointsRef = useRef();
//   useFrame((state) => {
//     if (pointsRef.current) {
//       const time = state.clock.getElapsedTime();
//       pointsRef.current.rotation.y = time * 0.18;
//       pointsRef.current.rotation.x = Math.sin(time * 0.12) * 0.15;
//     }
//   });
//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute attach="attributes-position" args={[initialDustPositions, 3]} />
//       </bufferGeometry>
//       <pointsMaterial color="#ffffff" size={0.06} sizeAttenuation transparent opacity={0.8} />
//     </points>
//   );
// }

// // ── Main scene ───────────────────────────────────────────────────────────────
// export default function PortfolioScene() {
//   const [isPlaying,  setIsPlaying]  = useState(false);
//   const [showModal,  setShowModal]  = useState(true);
//   const [activePage, setActivePage] = useState("Home");
//   const audioRef = useRef(null);

//   useEffect(() => {
//     audioRef.current = new Audio("/birds.mp3");
//     audioRef.current.loop   = true;
//     audioRef.current.volume = 0.4;
//     return () => { if (audioRef.current) audioRef.current.pause(); };
//   }, []);

//   const handleModalChoice = (playMusic) => {
//     setShowModal(false);
//     if (playMusic && audioRef.current) {
//       audioRef.current.play()
//         .then(() => setIsPlaying(true))
//         .catch((err) => console.log("Audio block:", err));
//     }
//   };

//   const toggleSound = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) audioRef.current.pause();
//     else audioRef.current.play().catch((err) => console.log("Playback block:", err));
//     setIsPlaying(!isPlaying);
//   };

//   const isHome = activePage === "Home";

//   return (
//     <div style={{ width:"100vw", height:"100vh", position:"fixed", top:0, left:0, overflow:"hidden" }}>

//       {/* ── MUSIC MODAL ───────────────────────────────────────────────────── */}
//       {showModal && (
//         <div style={{
//           position:"absolute", top:0, left:0, width:"100vw", height:"100vh",
//           backgroundColor:"rgba(6,6,14,0.9)", backdropFilter:"blur(10px)",
//           zIndex:1000, display:"flex", justifyContent:"center", alignItems:"center"
//         }}>
//           <div style={{
//             backgroundColor:"rgba(15,23,42,0.4)", border:"1px solid #eab308",
//             borderRadius:6, padding:"32px 48px", textAlign:"center", maxWidth:460, width:"90%"
//           }}>
//             <h3 style={{ color:"#ffffff", fontFamily:"sans-serif", fontSize:20, fontWeight:400, margin:"0 0 24px" }}>
//               Do you like to play the background music?
//             </h3>
//             <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
//               <button onClick={() => handleModalChoice(true)}  style={{ backgroundColor:"transparent", border:"1px solid #eab308", color:"#fff", padding:"8px 24px", borderRadius:4, cursor:"pointer" }}>Yes</button>
//               <button onClick={() => handleModalChoice(false)} style={{ backgroundColor:"transparent", border:"1px solid #eab308", color:"#fff", padding:"8px 24px", borderRadius:4, cursor:"pointer" }}>No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── SOUND TOGGLE BUTTON ───────────────────────────────────────────── */}
//       {!showModal && (
//         <button onClick={toggleSound} style={{
//           position:"absolute", top:24, right:24, zIndex:100,
//           width:48, height:48, borderRadius:"50%",
//           backgroundColor: isPlaying ? "rgba(30,27,75,0.85)" : "rgba(15,23,42,0.5)",
//           border: isPlaying ? "1px solid #eab308" : "1px solid rgba(255,255,255,0.2)",
//           color: isPlaying ? "#eab308" : "#ffffff",
//           display:"flex", justifyContent:"center", alignItems:"center",
//           cursor:"pointer", fontSize:22
//         }}>
//           {isPlaying ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
//         </button>
//       )}

//       {/* ── PAGE OVERLAYS ─────────────────────────────────────────────────── */}
//       {!showModal && activePage === "Contact"  && <Contact      onClose={() => setActivePage("Home")} />}
//       {!showModal && activePage === "About"    && <About        onClose={() => setActivePage("Home")} />}
//       {!showModal && activePage === "Skills"   && <SkillsPage   onClose={() => setActivePage("Home")} />}
//       {!showModal && activePage === "Projects" && <ProjectsPage onClose={() => setActivePage("Home")} />}

//       {/* ── CENTER PHOTO + NAME (only on Home) ────────────────────────────── */}
//       {!showModal && isHome && (
//         <div style={{
//           position:"absolute", inset:0, zIndex:10,
//           display:"flex", alignItems:"center", justifyContent:"center",
//           pointerEvents:"none"
//         }}>
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>

//             {/* Profile photo */}
//             <div style={{
//               width:130, height:130, borderRadius:"50%", overflow:"hidden",
//               border:"2px solid rgba(168,85,247,0.7)",
//               boxShadow:"0 0 30px rgba(168,85,247,0.45), 0 0 60px rgba(56,189,248,0.15)",
//               animation:"float 3.5s ease-in-out infinite"
//             }}>
//               {/* ✅ CHANGE THIS PATH to wherever your photo is in /public */}
//               <img
//                 src="/images/devothe.jpg"
//                 alt="Devothe Uwineza"
//                 style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
//               />
//             </div>

//             {/* Name + role */}
//             <div style={{ textAlign:"center", marginTop:8 }}>
//               <h1 style={{
//                 fontSize:15, fontWeight:500, color:"#e2e8f0",
//                 letterSpacing:"0.14em", textTransform:"uppercase", margin:0,
//                 fontFamily:"'Segoe UI', Roboto, sans-serif"
//               }}>
//                 Devothe Uwineza
//               </h1>
//               <p style={{
//                 fontSize:11, color:"rgba(168,85,247,0.9)",
//                 letterSpacing:"0.2em", marginTop:4,
//                 textTransform:"uppercase",
//                 fontFamily:"'Segoe UI', Roboto, sans-serif"
//               }}>
//                 Software Developer
//               </p>
//             </div>

//           </div>
//         </div>
//       )}

//       {/* ── BACKGROUND GLASS OVERLAY ──────────────────────────────────────── */}
//       <div style={{
//         position:"absolute", top:0, left:0, width:"100%", height:"100%",
//         backgroundColor:"rgba(10,15,30,0.4)", backdropFilter:"blur(2px)",
//         zIndex:0, pointerEvents:"none"
//       }} />

//       {/* ── THREE.JS CANVAS ───────────────────────────────────────────────── */}
//       <Canvas camera={{ position:[0,0,12], fov:45 }} style={{ position:"relative", zIndex:1 }}>
//         <fog attach="fog" args={["#0a0f1e", 8, 20]} />
//         <ambientLight intensity={1.5} />
//         <directionalLight position={[10,10,10]} intensity={3} />
//         <pointLight position={[-10,-10,-10]} intensity={2} color="#a855f7" />
//         <Stars radius={40} depth={50} count={1200} factor={4} speed={1.5} />

//         <TinyFloatingDust />

//         <group position={[0,0,0]}>
//           <OrbitingMenu onNavigate={setActivePage} />
//         </group>

//         <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
//       </Canvas>

//       {/* ── FLOAT KEYFRAME ────────────────────────────────────────────────── */}
//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-8px); }
//         }
//       `}</style>

//     </div>
//   );
// }