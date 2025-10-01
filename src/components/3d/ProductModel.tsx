"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useProductStore } from "@/hooks/useProductStore";
import { Mesh, Group } from "three";
import * as THREE from "three";

export function ProductModel() {
  const groupRef = useRef<Group>(null);
  const caseRef = useRef<Mesh>(null);
  const leftEarbudRef = useRef<Mesh>(null);
  const rightEarbudRef = useRef<Mesh>(null);
  const { selectedVariant, product } = useProductStore();
  const variant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0];

  const caseMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: variant.color,
      metalness: 0.8,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      transmission: 0.1,
    });
  }, [variant.color]);

  const earbudMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: variant.color,
      metalness: 0.9,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });
  }, [variant.color]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
    }

    if (caseRef.current) {
      caseRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
    }

    if (leftEarbudRef.current && rightEarbudRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.02;
      leftEarbudRef.current.scale.setScalar(scale);
      rightEarbudRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={caseRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 1.4, 1.2]} />
          <primitive object={caseMaterial} />
        </mesh>

        <mesh position={[0, 0.7, 0]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[2.2, 0.3, 1.2]} />
          <primitive object={caseMaterial} />
        </mesh>

        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[2, 0.8, 1]} />
          <meshStandardMaterial
            color="#000000"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>

      <group>
        <mesh
          ref={leftEarbudRef}
          position={[-0.8, 0.4, 0]}
          rotation={[0, 0, 0.1]}
        >
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <primitive object={earbudMaterial} />
        </mesh>

        <mesh position={[-0.8, 0.1, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.15, 0.12, 0.4, 8]} />
          <primitive object={earbudMaterial} />
        </mesh>

        <mesh
          ref={rightEarbudRef}
          position={[0.8, 0.4, 0]}
          rotation={[0, 0, -0.1]}
        >
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <primitive object={earbudMaterial} />
        </mesh>

        <mesh position={[0.8, 0.1, 0]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.15, 0.12, 0.4, 8]} />
          <primitive object={earbudMaterial} />
        </mesh>
      </group>

      <mesh position={[0, -0.4, 0.65]}>
        <planeGeometry args={[0.4, 0.12]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial
          color={variant.color}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
