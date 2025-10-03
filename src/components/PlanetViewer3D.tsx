import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Line } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

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

const OrbitRing = ({ radius }: { radius: number }) => {
  const points: [number, number, number][] = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
  }

  return (
    <Line
      points={points}
      color="#4a9eff"
      lineWidth={1}
      opacity={0.3}
      transparent
    />
  );
};

interface OrbitingPlanetProps extends PlanetViewer3DProps {
  speed: number;
  isPlaying: boolean;
}

const OrbitingPlanet = ({ planetData, speed, isPlaying }: OrbitingPlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && isPlaying) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <>
      <OrbitRing radius={planetData.orbitRadius} />
      <group ref={groupRef}>
        <group position={[planetData.orbitRadius, 0, 0]}>
          <Planet radius={planetData.radius} color={planetData.color} />
          <pointLight color={planetData.color} intensity={0.5} distance={5} />
        </group>
      </group>
    </>
  );
};

export const PlanetViewer3D = ({ planetData }: PlanetViewer3DProps) => {
  const [speed, setSpeed] = useState([0.5]);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="w-full space-y-4">
      <div className="w-full h-[600px] rounded-xl overflow-hidden glass-panel">
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Star radius={1.5} />
          <OrbitingPlanet planetData={planetData} speed={speed[0]} isPlaying={isPlaying} />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
          />
        </Canvas>
      </div>
      
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Controles de Órbita</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pausar
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Iniciar
              </>
            )}
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Velocidade Orbital</span>
            <span className="text-foreground font-medium">{speed[0].toFixed(1)}x</span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={0.1}
            max={3}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Lento</span>
            <span>Rápido</span>
          </div>
        </div>
      </div>
    </div>
  );
};
