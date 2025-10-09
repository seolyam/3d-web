"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Center, Html } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import { ProductModel } from "./ProductModel";
import { Loader } from "./Loader";
import * as THREE from "three";

interface ProductViewerProps {
  className?: string;
}

function Scene() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

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

      <Environment
        preset="studio"
        environmentIntensity={isMobile ? 0.6 : 0.8}
      />

      <Center>
        <ProductModel />
      </Center>

      <OrbitControls
        makeDefault
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        enableRotate
        minDistance={3}
        maxDistance={3}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(5 * Math.PI) / 6}
        rotateSpeed={0.9}
        dampingFactor={0.08}
        enableDamping
        autoRotate={true}
        autoRotateSpeed={2}
      />

      <EffectComposer enabled={!isMobile}>
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

function CanvasLoader() {
  return (
    <Html center>
      <Loader />
    </Html>
  );
}

export function ProductViewer({ className }: ProductViewerProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows
        className="bg-transparent"
        dpr={[1, 2]}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
