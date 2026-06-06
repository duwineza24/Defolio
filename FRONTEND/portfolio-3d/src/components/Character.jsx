import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const initialGlowParticles = Array.from({ length: 40 }, (_, i) => {
  const t = i / 39; // Normalize 0 to 1 for 40 points
  const y = (t - 0.5) * 3.5;
  const angle = t * Math.PI * 8;
  const radius = 0.15 + Math.sin(t * Math.PI) * 0.15;
  return {
    pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
    scale: 0.05 + Math.random() * 0.08,
    speedOffset: Math.random() * Math.PI,
  };
});

export default function Character() {
  const coreRef = useRef();
  const cageRef1 = useRef();
  const cageRef2 = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 🌊 Smooth global levitation (breathing effect)
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 1.2) * 0.2;
    }

    // 🔄 Dynamic, counter-rotating outer energy threads
    if (cageRef1.current) {
      cageRef1.current.rotation.y = time * 0.3;
      cageRef1.current.rotation.x = Math.sin(time * 0.5) * 0.15;
    }
    if (cageRef2.current) {
      cageRef2.current.rotation.y = -time * 0.4;
      cageRef2.current.rotation.z = Math.cos(time * 0.5) * 0.15;
    }
  });

  // Use a stable precomputed particle array so randomness does not run during render
  const positions = initialGlowParticles;

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      
      {/* 🌀 OUTER GEOMETRIC THREAD 1 (Tall, elongated diamond outline) */}
      <mesh ref={cageRef1}>
        {/* args: [radius, height, radialSegments, heightSegments, openEnded] */}
        <cylinderGeometry args={[0.6, 0.05, 4.0, 4, 1, true]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={2.5}
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* 🌀 OUTER GEOMETRIC THREAD 2 (Rotated slightly to create an intricate lattice) */}
      <mesh ref={cageRef2} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.05, 0.6, 4.0, 4, 1, true]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#818cf8"
          emissiveIntensity={2.0}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* ✨ CASCADING LIQUID LIGHT CORE (Floating inside only) */}
      <group>
        {positions.map((p, index) => (
          <InternalGlowNode key={index} data={p} />
        ))}
      </group>

      {/* 🔮 THE ETHEREAL ANCHORS (Top and bottom glowing caps) */}
      <mesh position={[0, 2.0, 0]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -2.0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

    </group>
  );
}

// 💎 Tiny sub-component to animate each piece of the shimmering light core individually
function InternalGlowNode({ data }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle pulsing effect for a shifting, magical atmosphere
      const pulse = Math.sin(time * 3 + data.speedOffset) * 0.2 + 1.0;
      meshRef.current.scale.setScalar(data.scale * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={data.pos}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#3b82f6"
        emissiveIntensity={3.0}
        roughness={0}
      />
    </mesh>
  );
}