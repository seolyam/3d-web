"use client";

import { useState, useEffect } from "react";

export interface LoadingSequenceState {
  isLoaded: boolean;
  stage: "initial" | "navbar" | "title" | "text" | "model" | "complete";
  progress: number;
}

export function useLoadingSequence() {
  const [state, setState] = useState<LoadingSequenceState>({
    isLoaded: false,
    stage: "initial",
    progress: 0,
  });

  useEffect(() => {
    const sequence = async () => {
      // Stage 1: Navbar slides in (0.8s delay, 0.6s duration)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setState((prev) => ({ ...prev, stage: "navbar", progress: 20 }));

      // Stage 2: Title animates (0.4s delay after navbar)
      await new Promise((resolve) => setTimeout(resolve, 400));
      setState((prev) => ({ ...prev, stage: "title", progress: 40 }));

      // Stage 3: Text below title animates (0.6s delay after title)
      await new Promise((resolve) => setTimeout(resolve, 600));
      setState((prev) => ({ ...prev, stage: "text", progress: 60 }));

      // Stage 4: 3D model slides in (0.8s delay after text)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setState((prev) => ({ ...prev, stage: "model", progress: 80 }));

      // Complete loading (0.6s delay after model)
      await new Promise((resolve) => setTimeout(resolve, 600));
      setState((prev) => ({
        ...prev,
        stage: "complete",
        progress: 100,
        isLoaded: true,
      }));
    };

    sequence();
  }, []);

  return state;
}
