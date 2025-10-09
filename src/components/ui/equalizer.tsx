"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface EqualizerProps {
  analyzerNode: AnalyserNode | null;
  isPlaying: boolean;
}

export function Equalizer({ analyzerNode, isPlaying }: EqualizerProps) {
  const [barHeights, setBarHeights] = useState<number[]>(Array(20).fill(0.1));
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!analyzerNode || !isPlaying) {
      // Smoothly decay to minimum when not playing
      const decayInterval = setInterval(() => {
        setBarHeights((prev) =>
          prev.map((height) => Math.max(0.1, height * 0.95))
        );
      }, 50);

      return () => {
        clearInterval(decayInterval);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    const bufferLength = analyzerNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barCount = 20;

    const updateBars = () => {
      analyzerNode.getByteFrequencyData(dataArray);

      const newHeights = Array.from({ length: barCount }, (_, i) => {
        const startIndex = Math.floor((i * bufferLength) / barCount);
        const endIndex = Math.floor(((i + 1) * bufferLength) / barCount);
        const slice = dataArray.slice(startIndex, endIndex);
        const average = slice.reduce((a, b) => a + b, 0) / slice.length;

        // Normalize to 0-1 range and add some minimum height
        const normalized = Math.max(0.1, (average / 255) * 1.2);

        // Apply center-peaked weighting (middle bars are tallest)
        const centerPosition = Math.abs((i / (barCount - 1)) * 2 - 1); // 0 at center, 1 at edges
        const centerWeight = 1 + (1 - centerPosition) * 0.8; // Higher weight in center

        return Math.min(1, normalized * centerWeight);
      });

      setBarHeights(newHeights);
      animationFrameRef.current = requestAnimationFrame(updateBars);
    };

    updateBars();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyzerNode, isPlaying]);

  return (
    <div className="flex items-end justify-center gap-[3px] h-24 md:h-32 px-6 py-2">
      {barHeights.map((height, index) => (
        <motion.div
          key={index}
          className="flex-1 min-w-[3px] max-w-[10px] rounded-t-full bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 shadow-lg"
          style={{
            height: `${height * 100}%`,
            opacity: isPlaying ? 0.9 : 0.3,
          }}
          animate={{
            scaleY: isPlaying ? [0.8, 1.1, 0.8] : 1,
            scaleX: isPlaying ? [0.9, 1.05, 0.9] : 1,
            boxShadow: isPlaying
              ? [
                  "0 0 10px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 10px rgba(59, 130, 246, 0.3)",
                ]
              : "0 0 5px rgba(0, 0, 0, 0.2)",
          }}
          transition={{
            duration: 0.4,
            delay: index * 0.02,
            repeat: isPlaying ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          whileHover={{
            scaleY: 1.2,
            scaleX: 1.1,
            transition: { duration: 0.2 },
          }}
        />
      ))}
    </div>
  );
}
