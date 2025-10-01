"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeroProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  volume: number;
  showVolumeSlider: boolean;
  distanceRatio: number;
  onTogglePlayPause: () => void;
  onVolumeMouseEnter: () => void;
  onVolumeMouseLeave: () => void;
  onVolumeChange: (volume: number) => void;
}

export function Hero({
  audioRef,
  isPlaying,
  volume,
  showVolumeSlider,
  distanceRatio,
  onTogglePlayPause,
  onVolumeMouseEnter,
  onVolumeMouseLeave,
  onVolumeChange,
}: HeroProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.12),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 z-10"
      >
        <Badge
          variant="secondary"
          className="w-fit bg-white/10 text-white border-white/20 mb-6"
        >
          New Release
        </Badge>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight mb-4">
          WH‑1000XM5
          <span className="block font-medium">Premium Noise Canceling</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Flagship noise canceling with Hi‑Res Audio, LDAC, and Edge‑AI
          upscaling.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full max-w-4xl mx-auto px-6"
        style={{ y }}
      >
        <div className="aspect-square relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl scale-110" />

          <motion.div
            className="relative bg-black/30 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-white/10 h-full shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
            style={{
              filter: `blur(${distanceRatio * 2}px) brightness(${
                1 - distanceRatio * 0.3
              })`,
              transform: `scale(${1 - distanceRatio * 0.05})`,
            }}
          >
            <ProductViewer className="w-full h-full" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: distanceRatio > 0.1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <span className="text-xs text-white/70">
                  {Math.round(distanceRatio * 100)}% away
                </span>
              </div>
            </motion.div>

            <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={onTogglePlayPause}
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>

              <div className="relative">
                <Button
                  size="sm"
                  variant="secondary"
                  onMouseEnter={onVolumeMouseEnter}
                  onMouseLeave={onVolumeMouseLeave}
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>

                {showVolumeSlider && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg p-3 min-w-[120px]"
                    onMouseEnter={onVolumeMouseEnter}
                    onMouseLeave={onVolumeMouseLeave}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-white/70">Volume</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #fff 0%, #fff ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`,
                        }}
                      />
                      <span className="text-xs text-white/50">{volume}%</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-10 flex flex-wrap justify-center gap-3 z-10"
      >
        {[
          "Multi‑Noise Sensor",
          "V1 + QN1 Processors",
          "30‑mm Driver",
          "Hi‑Res / LDAC",
          "DSEE Extreme",
        ].map((chip, index) => (
          <motion.span
            key={chip}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
            className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
          >
            {chip}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
