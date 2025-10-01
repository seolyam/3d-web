"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function ProductModel(props: ThreeElements["group"]) {
  const gltf = useGLTF("/models/sony_wh-1000xm5.glb");

  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    return cloned;
  }, [gltf.scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/sony_wh-1000xm5.glb");
