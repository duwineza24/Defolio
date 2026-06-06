import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";

import { 
  IoHomeOutline, 
  IoPersonOutline, 
  IoCodeOutline, 
  IoMailOutline, 
  IoLogoGithub, 
  IoLogoLinkedin, 
  IoBriefcaseOutline, 
  IoDocumentTextOutline 
} from "react-icons/io5";

const items = [
  { name: "Home", icon: IoHomeOutline },
  { name: "About", icon: IoPersonOutline },
  { name: "Skills", icon: IoCodeOutline }, 
  { name: "Contact", icon: IoMailOutline },
  { name: "GitHub", icon: IoLogoGithub, url: "https://github.com/duwineza24" }, 
  { name: "LinkedIn", icon: IoLogoLinkedin, url: "https://www.linkedin.com/in/devothe-uwineza-20055b376/" },
  { name: "Projects", icon: IoBriefcaseOutline },
  /* 📄 Keeps the same path pointing to public/resume.pdf */
  { name: "Resume", icon: IoDocumentTextOutline, url: "/resume.pdf" },
];

export default function OrbitingMenu({ onNavigate }) {
  const groupRef = useRef();
  const { camera } = useThree();

  const [hovered, setHovered] = useState(null);
  const [paused, setPaused] = useState(false);

  const radius = 4.2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (paused) return; 

    groupRef.current.rotation.z -= delta * 0.15;

    groupRef.current.children.forEach((child) => {
      child.lookAt(camera.position);
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHover = hovered === i;
        
        const IconComponent = item.icon;

        return (
          <group
            key={item.name}
            position={[x, y, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(i);
              setPaused(true); 
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(null);
              setPaused(false); 
            }}
            onClick={(e) => {
              e.stopPropagation(); 

              /* 🌐 CHECKS ALL EXTERNAL LINKS & PDF VIEWS */
              if (item.url) {
                // This will safely open GitHub, LinkedIn, or view your resume.pdf inside a new tab!
                window.open(item.url, "_blank", "noopener,noreferrer");
              } else if (onNavigate) {
                // Handles page layouts like Contact panel state toggles
                onNavigate(item.name);
              }
            }}
          >
            {/* Invisible Hitbox area for easy targeting */}
            <mesh visible={false} style={{ cursor: "pointer" }}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshBasicMaterial />
            </mesh>

            {/* Visual Node Base Sphere */}
            <mesh style={{ cursor: "pointer" }}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color={isHover ? "#6b4bbd" : "#1e1b4b"} 
                emissive={isHover ? "#a855f7" : "#312e81"}
                emissiveIntensity={isHover ? 1.8 : 0.5}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>

            {/* Icons Layer */}
            <Html center distanceFactor={12}>
              <div style={{
                color: isHover ? '#f3e8ff' : '#93c5fd',
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px', 
                transition: 'all 0.15s ease',
                transform: isHover ? 'scale(1.2)' : 'scale(1)',
              }}>
                {IconComponent && <IconComponent />}
              </div>
            </Html>

            {/* Outer Ring */}
            {isHover && (
              <mesh>
                <torusGeometry args={[0.42, 0.03, 8, 32]} />
                <meshBasicMaterial color="#c084fc" transparent opacity={0.8} />
              </mesh>
            )}

            {/* Hover Typography Text */}
            {isHover && (
              <Text
                position={[0.7, 0, 0]} 
                fontSize={0.24}
                color="#ffffff"
                anchorX="left"        
                anchorY="middle"
              >
                {item.name}
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
}