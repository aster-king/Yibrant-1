import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MarchingCubes, MarchingCube } from "@react-three/drei";
import * as THREE from "three";

export const MetaballsAnimation = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Configuration for the metaballs
    const config = useMemo(() => ({
        resolution: 60,
        strength: 0.8,
        subtract: 12,
    }), []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Gentle rotation of the entire group
        groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
    });

    // Generate random blobs with varied properties
    const blobs = useMemo(() => {
        const colors = ["#51bb7a", "#f58981", "#ffd54f"];
        return Array.from({ length: 15 }).map((_, i) => ({
            index: i,
            speed: 0.3 + Math.random() * 0.5,
            radius: 0.4 + Math.random() * 1.0,
            color: colors[i % colors.length],
            initialPos: new THREE.Vector3(
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
            ),
            // Random phase for sine wave movement
            phase: Math.random() * Math.PI * 2
        }));
    }, []);

    return (
        <group ref={groupRef}>
            <MarchingCubes
                resolution={config.resolution}
                enableUvs={false}
                enableColors={true}
                scale={1.8}
            >
                <meshStandardMaterial
                    roughness={0.2}
                    metalness={0.1}
                    vertexColors
                />

                {blobs.map((blob) => (
                    <OrganicBlob key={blob.index} {...blob} />
                ))}
            </MarchingCubes>
        </group>
    );
};

const OrganicBlob = ({
    speed,
    radius,
    color,
    initialPos,
    phase
}: {
    speed: number;
    radius: number;
    color: string;
    initialPos: THREE.Vector3;
    phase: number;
}) => {
    const ref = useRef<any>(null);

    // Center attraction point
    const center = new THREE.Vector3(0, 0, 0);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() * speed + phase;

        // Organic movement using sine waves
        const x = initialPos.x + Math.sin(t) * 2;
        const y = initialPos.y + Math.cos(t * 0.7) * 1.5;
        const z = initialPos.z + Math.sin(t * 0.5) * 1.5;

        const currentPos = new THREE.Vector3(x, y, z);

        // Center attraction - relaxed radius to fill more space
        const dist = currentPos.distanceTo(center);
        if (dist > 8) {
            currentPos.lerp(center, 0.02 * (dist - 8));
        }

        ref.current.position.copy(currentPos);
    });

    return (
        <MarchingCube
            ref={ref}
            strength={radius}
            subtract={0}
            color={new THREE.Color(color)}
        />
    );
};
