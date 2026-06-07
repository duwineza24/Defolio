import  { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import emailjs from "@emailjs/browser";

// --- 🌌 3D GENERATIVE PARTICLE DATA (PRE-COMPUTED) ---
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

// --- 💎 3D ANIMATED SUB-COMPONENTS ---
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

export function Character() {
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

  const positions = initialGlowParticles;

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* 🌀 OUTER GEOMETRIC THREAD 1 */}
      <mesh ref={cageRef1}>
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

      {/* 🌀 OUTER GEOMETRIC THREAD 2 */}
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

      {/* ✨ CASCADING LIQUID LIGHT CORE */}
      <group>
        {positions.map((p, index) => (
          <InternalGlowNode key={index} data={p} />
        ))}
      </group>

      {/* 🔮 THE ETHEREAL ANCHORS */}
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

// --- 📂 MAIN CONTACT COMPONENT EXPORT ---
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All communication vectors must be filled.");
      return;
    }

    setLoading(true);

    // 📦 Bundling structural arguments to match your EmailJS variables
    const templateParams = {
      from_name: formData.name,  // Maps directly to {{from_name}}
      reply_to: formData.email,   // Maps directly to {{reply_to}}
      message: formData.message,  // Maps directly to {{message}}
    };

    try {
      const result = await emailjs.send(
        "service_1htm47j",   // 👈 Paste EmailJS Service ID here
        "template_ofkyc35",  // 👈 Paste EmailJS Template ID here
        templateParams,
        "YXDk2dyHFxdhW3k4R"    // 👈 Paste EmailJS Public Key here
      );

      if (result.status === 200) {
        alert("Signal transmitted successfully! Message received.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Transmission Interrupted:", error);
      alert("Pipeline failure. Direct dashboard transmission broken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container" style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Transmit Vector Signal</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Write your transmission here..."
          value={formData.message}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Transmitting Signal..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}