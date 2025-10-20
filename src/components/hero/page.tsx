"use client";

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Equalizer } from "@/components/ui/equalizer";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";
import { LoadingSequenceState } from "@/hooks/useLoadingSequence";

interface HeroProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  volume: number;
  showVolumeSlider: boolean;
  distanceRatio: number;
  analyzerNode: AnalyserNode | null;
  loadingSequence: LoadingSequenceState;
  onTogglePlayPause: () => void;
  onVolumeMouseEnter: () => void;
  onVolumeMouseLeave: () => void;
  onVolumeChange: (volume: number) => void;
  onModelVisibilityChange?: (isVisible: boolean) => void;
}

export function Hero({
  audioRef, // Marked as optional, not used in component
  isPlaying,
  volume,
  showVolumeSlider,
  distanceRatio,
  analyzerNode,
  loadingSequence,
  onTogglePlayPause,
  onVolumeMouseEnter,
  onVolumeMouseLeave,
  onVolumeChange,
  onModelVisibilityChange,
}: HeroProps) {
  // Use a no-op to prevent unused variable warning
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  audioRef;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Scroll animation hooks
  const { ref: badgeRef } = useRepeatingScrollAnimation();
  const { ref: titleRef } = useRepeatingScrollAnimation();
  const { ref: subtitleRef } = useRepeatingScrollAnimation();
  const { ref: descriptionRef } = useRepeatingScrollAnimation();
  const { ref: modelRef, isInView: modelInView } = useRepeatingScrollAnimation();
  
  // Notify parent when the model visibility changes
  useEffect(() => {
    if (onModelVisibilityChange) {
      onModelVisibilityChange(!!modelInView);
    }
  }, [modelInView, onModelVisibilityChange]);
  
  const { ref: equalizerRef } = useRepeatingScrollAnimation();

  const gradient1X = useMotionValue(30);
  const gradient1Y = useMotionValue(20);
  const gradient2X = useMotionValue(70);
  const gradient2Y = useMotionValue(60);
  const gradient3X = useMotionValue(50);
  const gradient3Y = useMotionValue(100);

  const gradientBackground = useMotionTemplate`radial-gradient(circle at ${gradient1X}% ${gradient1Y}%, rgba(59,130,246,0.2), transparent 40%), radial-gradient(circle at ${gradient2X}% ${gradient2Y}%, rgba(168,85,247,0.18), transparent 45%), radial-gradient(circle at ${gradient3X}% ${gradient3Y}%, rgba(236,72,153,0.12), transparent 50%)`;

  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    if (!analyzerNode) {
      dataArrayRef.current = null;
      return;
    }

    dataArrayRef.current = new Uint8Array<ArrayBuffer>(
      analyzerNode.frequencyBinCount || 0
    );
  }, [analyzerNode]);

  useAnimationFrame((_, delta) => {
    const analyzer = analyzerNode;
    const dataArray = dataArrayRef.current;
    const deltaFactor = Math.min(delta / 160, 0.15);

    let energy = 0;

    if (isPlaying) {
      if (analyzer && dataArray && dataArray.length > 0) {
        analyzer.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i += 1) {
          sum += dataArray[i];
        }
        energy = sum / (dataArray.length * 255);
      } else {
        energy = 0.35;
      }

      phaseRef.current += delta * (0.0006 + energy * 0.02);
      const phase = phaseRef.current;
      const strength = 4 + energy * 14;

      gradient1X.set(30 + Math.sin(phase) * strength);
      gradient1Y.set(20 + Math.cos(phase * 0.7) * strength * 0.55);
      gradient2X.set(70 + Math.sin(phase * 1.1 + 1) * strength * 0.7);
      gradient2Y.set(60 + Math.cos(phase * 0.9 + 0.3) * strength * 0.5);
      gradient3X.set(50 + Math.sin(phase * 0.95 + 2) * strength * 0.9);
      gradient3Y.set(100 + Math.cos(phase * 1.05 + 0.7) * strength * 0.6);
    } else {
      phaseRef.current = 0;

      const resetToBase = (value: typeof gradient1X, base: number) => {
        const current = value.get();
        value.set(current + (base - current) * deltaFactor);
      };

      resetToBase(gradient1X, 30);
      resetToBase(gradient1Y, 20);
      resetToBase(gradient2X, 70);
      resetToBase(gradient2Y, 60);
      resetToBase(gradient3X, 50);
      resetToBase(gradient3Y, 100);
    }
  });

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center pt-40"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 transition-[background-position] duration-200"
        style={{ background: gradientBackground }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 z-10"
      >
        <motion.div
          ref={badgeRef}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{
            opacity:
              loadingSequence.stage === "navbar" ||
              loadingSequence.stage === "title" ||
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 1
                : 0,
            scale:
              loadingSequence.stage === "navbar" ||
              loadingSequence.stage === "title" ||
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 1
                : 0.8,
            y:
              loadingSequence.stage === "navbar" ||
              loadingSequence.stage === "title" ||
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 0
                : 10,
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          <Badge
            variant="secondary"
            className="w-fit bg-white/10 text-white border-white/20 mb-3"
          >
            New Release
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity:
              loadingSequence.stage === "title" ||
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 1
                : 0,
            y:
              loadingSequence.stage === "title" ||
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 0
                : 20,
          }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-2"
        >
          <motion.span
            ref={titleRef}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{
              opacity:
                loadingSequence.stage === "title" ||
                loadingSequence.stage === "text" ||
                loadingSequence.stage === "model" ||
                loadingSequence.stage === "complete"
                  ? 1
                  : 0,
              x:
                loadingSequence.stage === "title" ||
                loadingSequence.stage === "text" ||
                loadingSequence.stage === "model" ||
                loadingSequence.stage === "complete"
                  ? 0
                  : -30,
              scale:
                loadingSequence.stage === "title" ||
                loadingSequence.stage === "text" ||
                loadingSequence.stage === "model" ||
                loadingSequence.stage === "complete"
                  ? 1
                  : 0.9,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 15,
            }}
          >
            <span className="animated-gradient-text">WH‑1000XM5</span>
          </motion.span>
          <motion.span
            ref={subtitleRef}
            className="block font-medium"
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{
              opacity:
                loadingSequence.stage === "title" ||
                loadingSequence.stage === "text" ||
                loadingSequence.stage === "model" ||
                loadingSequence.stage === "complete"
                  ? 1
                  : 0,
              x:
                loadingSequence.stage === "title" ||
                loadingSequence.stage === "text" ||
                loadingSequence.stage === "model" ||
                loadingSequence.stage === "complete"
                  ? 0
                  : 30,
              scale:
                loadingSequence.stage === "title" ||
                loadingSequence.stage === "text" ||
                loadingSequence.stage === "model" ||
                loadingSequence.stage === "complete"
                  ? 1
                  : 0.9,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: 0.2,
            }}
          >
            <span className="glowing-text">Premium Noise Canceling</span>
          </motion.span>
        </motion.h1>

        <motion.p
          ref={descriptionRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity:
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 1
                : 0,
            y:
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 0
                : 20,
            scale:
              loadingSequence.stage === "text" ||
              loadingSequence.stage === "model" ||
              loadingSequence.stage === "complete"
                ? 1
                : 0.95,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Flagship noise canceling with Hi‑Res Audio, LDAC, and Edge‑AI
          upscaling.
        </motion.p>
      </motion.div>

      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{
          opacity:
            loadingSequence.stage === "model" ||
            loadingSequence.stage === "complete"
              ? 1
              : 0,
          scale:
            loadingSequence.stage === "model" ||
            loadingSequence.stage === "complete"
              ? 1
              : 0.8,
          y:
            loadingSequence.stage === "model" ||
            loadingSequence.stage === "complete"
              ? 0
              : 100,
        }}
        transition={{
          duration: 1.2,
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
        className="relative w-full max-w-3xl mx-auto px-6 gpu-hack"
        style={{ y }}
      >
        <div className="aspect-[4/3] relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl scale-110"
            animate={{
              scale: [1.1, 1.2, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative bg-black/30 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-white/10 h-full shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
            style={{
              filter: `blur(${distanceRatio * 2}px) brightness(${
                1 - distanceRatio * 0.3
              })`,
              transform: `scale(${1 - distanceRatio * 0.05})`,
            }}
            animate={{
              boxShadow: [
                "0 0 0 1px rgba(255,255,255,0.06)",
                "0 0 20px rgba(59,130,246,0.1), 0 0 0 1px rgba(255,255,255,0.08)",
                "0 0 0 1px rgba(255,255,255,0.06)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
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

            <motion.div
              className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onTogglePlayPause}
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                >
                  <motion.div
                    animate={isPlaying ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isPlaying ? Infinity : 0,
                    }}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    onMouseEnter={onVolumeMouseEnter}
                    onMouseLeave={onVolumeMouseLeave}
                    className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                  >
                    <motion.div
                      animate={volume > 0 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{
                        duration: 0.3,
                        repeat: volume > 0 ? Infinity : 0,
                      }}
                    >
                      {volume === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </motion.div>
                  </Button>
                </motion.div>

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
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={equalizerRef}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{
          opacity:
            loadingSequence.stage === "model" ||
            loadingSequence.stage === "complete"
              ? 1
              : 0,
          y:
            loadingSequence.stage === "model" ||
            loadingSequence.stage === "complete"
              ? 0
              : 30,
          scale:
            loadingSequence.stage === "model" ||
            loadingSequence.stage === "complete"
              ? 1
              : 0.9,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="w-full max-w-3xl mx-auto px-6 mt-4 z-10"
      >
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-2"
          animate={{
            boxShadow: [
              "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              "0 25px 50px -12px rgba(59, 130, 246, 0.1)",
              "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Equalizer analyzerNode={analyzerNode} isPlaying={isPlaying} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: loadingSequence.stage === "complete" ? 1 : 0,
          y: loadingSequence.stage === "complete" ? 0 : 20,
        }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="mt-6 flex flex-wrap justify-center gap-3 z-10"
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
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: loadingSequence.stage === "complete" ? 1 : 0,
              scale: loadingSequence.stage === "complete" ? 1 : 0.8,
              y: loadingSequence.stage === "complete" ? 0 : 10,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 120,
            }}
            className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
          >
            {chip}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
