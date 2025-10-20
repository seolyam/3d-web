"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  floatingGlowVariants,
  gradientHeadingVariants,
  taglinePulseVariants,
} from "@/lib/audioVariants";

interface CTAProps {
  isPlaying?: boolean;
}

export function CTA({ isPlaying = false }: CTAProps) {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section id="cta" className="relative py-32 bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.18),transparent_60%),linear-gradient(200deg,rgba(0,0,0,0.9),rgba(0,0,0,0.65))]"
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
          className="text-center space-y-12 relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"
            animate={
              isPlaying
                ? {
                    opacity: [0.2, 0.45, 0.2],
                    scale: [1, 1.05, 1],
                  }
                : { opacity: 0.2, scale: 1 }
            }
            transition={{
              duration: isPlaying ? 6 : 0.6,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10">
            <motion.h2
              className={`text-5xl font-light tracking-tight mb-6 ${
                isPlaying
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "text-white"
              }`}
              variants={gradientHeadingVariants}
              initial="idle"
              animate={isPlaying ? "playing" : "idle"}
              style={{ backgroundSize: isPlaying ? "200% 200%" : undefined }}
            >
              Experience Premium Audio
            </motion.h2>
            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
              variants={taglinePulseVariants}
              initial="idle"
              animate={isPlaying ? "playing" : "idle"}
            >
              Join thousands of users who have elevated their audio experience
              to new heights.
            </motion.p>
            <div className="flex gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
