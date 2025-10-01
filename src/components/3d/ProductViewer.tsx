"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import { ProductModel } from "./ProductModel";
import { Loader } from "./Loader";
import { useProductStore } from "@/hooks/useProductStore";
import * as THREE from "three";

interface ProductViewerProps {
  className?: string;
}

function Scene() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { selectedVariant } = useProductStore();

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />

      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <directionalLight
        position={[-5, 2, -5]}
        intensity={0.8}
        color="#4f46e5"
      />
      <directionalLight position={[5, -2, 5]} intensity={0.6} color="#06b6d4" />

      <pointLight position={[0, 3, 0]} intensity={0.5} color="#f59e0b" />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#8b5cf6" />

      <Environment preset="studio" environmentIntensity={0.8} />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <ProductModel />
      </PresentationControls>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        dampingFactor={0.05}
        enableDamping
        autoRotate={false}
      />

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.025}
          mipmapBlur
        />
        <ChromaticAberration
          offset={[0.001, 0.001]}
          radialModulation={false}
          modulationOffset={0}
        />
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.05}
          bokehScale={3}
          height={480}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

export function ProductViewer({ className }: ProductViewerProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          antialias: true,
        }}
        shadows
        className="bg-transparent"
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Suspense fallback={<Loader />}>
          <div className="opacity-0" />
        </Suspense>
      </div>
    </div>
  );
}
