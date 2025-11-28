import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Logo3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.y += 0.005;
    
    // Float effect
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.8, 16, 100]} />
      <meshStandardMaterial
        color="#F87171"
        metalness={0.8}
        roughness={0.2}
        emissive="#F87171"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};