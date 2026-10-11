'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

function SmokeParticles() {
  const ref = useRef<THREE.Group>(null);

  const [sphere] = useState(() => {
    const coords = new Float32Array(1200 * 3);
    for (let i = 0; i < coords.length; i++) {
      coords[i] = (Math.random() - 0.5) * 5;
    }
    return coords;
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 14;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <SmokeParticles />
      </Canvas>
    </div>
  );
}