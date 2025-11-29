import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const OrganicShape3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;
    
    // Main group rotation - slow and organic
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.5;
    groupRef.current.rotation.x = Math.cos(time * 0.2) * 0.3;
    
    // Animate individual blobs
    meshesRef.current.forEach((mesh, i) => {
      if (mesh) {
        const offset = i * 2.5;
        
        // Organic floating motion
        mesh.position.x = Math.sin(time * 0.5 + offset) * 1.5;
        mesh.position.y = Math.cos(time * 0.3 + offset) * 1.5;
        mesh.position.z = Math.sin(time * 0.4 + offset) * 1.5;
        
        // Pulsing scale
        const scale = 1 + Math.sin(time * 0.8 + offset) * 0.2;
        mesh.scale.set(scale, scale, scale);
        
        // Rotation
        mesh.rotation.x += delta * 0.5;
        mesh.rotation.y += delta * 0.3;
      }
    });
  });

  const colors = ["#51bb7a", "#f58981", "#ffd54f"];
  const blobCount = 8;

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
          roughness={0.2}
          emissive="#ffd54f"
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Orbiting blobs */}
      {Array.from({ length: blobCount }).map((_, i) => {
        const angle = (i / blobCount) * Math.PI * 2;
        const radius = 2.5;
        
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 1.5) * radius * 0.5,
              Math.sin(angle) * radius,
            ]}
            ref={(el) => {
              if (el) meshesRef.current[i] = el;
            }}
          >
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              metalness={0.7}
              roughness={0.3}
              emissive={colors[i % colors.length]}
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}

      {/* Connecting particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 3.5 + Math.sin(i) * 0.5;
        
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * radius * 0.3,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              emissive={colors[i % colors.length]}
              emissiveIntensity={0.6}
            />
          </mesh>
        );
      })}
      
      {/* Ambient particles floating around */}
      {Array.from({ length: 15 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 4 + Math.random() * 2;
        
        return (
          <mesh
            key={`ambient-${i}`}
            position={[
              radius * Math.sin(phi) * Math.cos(theta),
              radius * Math.sin(phi) * Math.sin(theta),
              radius * Math.cos(phi),
            ]}
          >
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial
              color={colors[Math.floor(Math.random() * colors.length)]}
              emissive={colors[Math.floor(Math.random() * colors.length)]}
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};
