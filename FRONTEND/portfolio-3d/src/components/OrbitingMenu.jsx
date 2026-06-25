import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  IoHomeOutline, IoPersonOutline, IoCodeOutline, IoMailOutline,
  IoLogoGithub, IoLogoLinkedin, IoBriefcaseOutline, IoDocumentTextOutline,
} from "react-icons/io5";

const items = [
  { name: "Home",     icon: IoHomeOutline },
  { name: "About",    icon: IoPersonOutline },
  { name: "Skills",   icon: IoCodeOutline },
  { name: "Contact",  icon: IoMailOutline },
  { name: "GitHub",   icon: IoLogoGithub,         url: "https://github.com/duwineza24" },
  { name: "LinkedIn", icon: IoLogoLinkedin,        url: "https://www.linkedin.com/in/devothe-uwineza-20055b376/" },
  { name: "Projects", icon: IoBriefcaseOutline },
  { name: "Resume",   icon: IoDocumentTextOutline, url: "/resume.pdf" },
];

export default function OrbitingMenu({ onNavigate, onHoverChange }) {
  const groupRef   = useRef();
  const resumeTimeout = useRef(null);
  const { camera } = useThree();
  const [hovered, setHovered] = useState(null);
  const [paused,  setPaused]  = useState(false);
  const radius = 3.8;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!paused) groupRef.current.rotation.z -= delta * 0.12;
    groupRef.current.children.forEach((child) => {
      child.lookAt(camera.position);
    });
  });

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current);
        resumeTimeout.current = null;
      }
    };
  }, []);

  return (
    <group ref={groupRef}>
      {items.map((item, i) => {
        const angle   = (i / items.length) * Math.PI * 2;
        const x       = Math.cos(angle) * radius;
        const y       = Math.sin(angle) * radius;
        const isHover = hovered === i;
        const Icon    = item.icon;

        return (
          <group
            key={item.name}
            position={[x, y, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (resumeTimeout.current) { clearTimeout(resumeTimeout.current); resumeTimeout.current = null; }
              setHovered(i);
              setPaused(true);
              if (onHoverChange) onHoverChange(item.name);
            }}
            onPointerOut={(e)  => {
              e.stopPropagation();
              setHovered(null);
              if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
              resumeTimeout.current = setTimeout(() => {
                setPaused(false);
                if (onHoverChange) onHoverChange(null);
                resumeTimeout.current = null;
              }, 180);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              setPaused(true);
              try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch (err) { console.warn('setPointerCapture failed:', err); }
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              try { e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId); } catch (err) { console.warn('releasePointerCapture failed:', err); }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
              else if (onNavigate) onNavigate(item.name);
            }}
          >
            {/* Invisible hit-box */}
            <mesh visible={false}>
              <sphereGeometry args={[0.9, 16, 16]} />
              <meshBasicMaterial />
            </mesh>

            {/* Glowing sphere node */}
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color={isHover ? "#6b4bbd" : "#1e1b4b"}
                emissive={isHover ? "#a855f7" : "#312e81"}
                emissiveIntensity={isHover ? 1.8 : 0.5}
                roughness={0.1} metalness={0.8}
              />
            </mesh>

            {/* Icon overlay */}
            <Html center distanceFactor={12}>
              <div style={{
                color: isHover ? "#f3e8ff" : "#93c5fd",
                pointerEvents: "none",
                display: "flex", justifyContent: "center", alignItems: "center",
                fontSize: "18px", transition: "all 0.15s ease",
                transform: isHover ? "scale(1.2)" : "scale(1)",
              }}>
                {Icon && <Icon />}
              </div>
            </Html>

            {/* Hover glow ring */}
            {isHover && (
              <mesh>
                <torusGeometry args={[0.42, 0.03, 8, 32]} />
                <meshBasicMaterial color="#c084fc" transparent opacity={0.8} />
              </mesh>
            )}

          </group>
        );
      })}
    </group>
  );
}