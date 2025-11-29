import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Logo3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotate the entire group slowly
    groupRef.current.rotation.y += 0.003;
    
    // Animate individual spheres
    spheresRef.current.forEach((sphere, i) => {
      if (sphere) {
        const time = state.clock.elapsedTime;
        sphere.position.y = Math.sin(time + i) * 0.5;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      }
    });
  });

  const colors = ["#FBBF24", "#F87171", "#34D399"];
  const positions: [number, number, number][] = [
    [0, 0, 0],
    [2, 1, -1],
    [-2, -1, 1],
    [0, 2, -2],
  ];

  return (
    <group ref={groupRef}>
      {positions.map((position, i) => (
        <mesh
          key={i}
          position={position}
          ref={(el) => {
            if (el) spheresRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            metalness={0.7}
            roughness={0.3}
            emissive={colors[i % colors.length]}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

