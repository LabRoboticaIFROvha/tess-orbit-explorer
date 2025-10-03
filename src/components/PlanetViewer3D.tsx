import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface PlanetViewer3DProps {
  planetData: {
    radius: number;
    color: string;
    orbitRadius: number;
  };
}

const Planet = ({ radius, color }: { radius: number; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Sphere ref={meshRef} args={[radius, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.7}
        metalness={0.3}
      />
    </Sphere>
  );
};

const Star = ({ radius }: { radius: number }) => {
  return (
    <Sphere args={[radius, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#FDB813" 
        emissive="#FDB813"
        emissiveIntensity={1.5}
      />
    </Sphere>
  );
};

const OrbitingPlanet = ({ planetData }: PlanetViewer3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      <group position={[planetData.orbitRadius, 0, 0]}>
        <Planet radius={planetData.radius} color={planetData.color} />
        <pointLight color={planetData.color} intensity={0.5} distance={5} />
      </group>
    </group>
  );
};

export const PlanetViewer3D = ({ planetData }: PlanetViewer3DProps) => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden glass-panel">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Star radius={1.5} />
        <OrbitingPlanet planetData={planetData} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
};
