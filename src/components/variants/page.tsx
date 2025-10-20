"use client";

import { motion } from "framer-motion";
import { VariantSelector } from "@/components/VariantSelector";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";
import { floatingGlowVariants } from "@/lib/audioVariants";

interface VariantsProps {
  isPlaying?: boolean;
}

export function Variants({ isPlaying = false }: VariantsProps) {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section
      id="variants"
      className="relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_50%,rgba(236,72,153,0.2),transparent_60%),linear-gradient(120deg,rgba(17,24,39,0.85),rgba(17,24,39,0.6))]"
        variants={floatingGlowVariants}
        initial="idle"
        animate={isPlaying ? "playing" : "idle"}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <VariantSelector isPlaying={isPlaying} />
        </motion.div>
      </div>
    </section>
  );
}
