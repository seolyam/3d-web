"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  accentUnderlineVariants,
  floatingGlowVariants,
  gradientHeadingVariants,
  taglinePulseVariants,
} from "@/lib/audioVariants";

interface DetailsProps {
  isPlaying?: boolean;
}

export function Details({ isPlaying = false }: DetailsProps) {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section
      id="details"
      className="relative py-32 bg-black overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.18),transparent_60%),linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.6))]"
        variants={floatingGlowVariants}
        initial="idle"
        animate={isPlaying ? "playing" : "idle"}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-16"
        >
          <div className="space-y-6">
            <motion.h2
              className={`text-5xl md:text-7xl font-light tracking-tight ${
                isPlaying
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "text-white"
              }`}
              variants={gradientHeadingVariants}
              initial="idle"
              animate={isPlaying ? "playing" : "idle"}
              style={{ backgroundSize: isPlaying ? "200% 200%" : undefined }}
            >
              Every detail, perfected.
            </motion.h2>
            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
              variants={taglinePulseVariants}
              initial="idle"
              animate={isPlaying ? "playing" : "idle"}
            >
              Industry-leading noise canceling meets premium craftsmanship in
              every component.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: "Battery Life",
                description:
                  "Up to 30 hours with noise canceling on, up to 40 hours with it off. Fast charging gives you 3 hours of playback in just 3 minutes.",
              },
              {
                title: "Connectivity",
                description:
                  "Bluetooth 5.2 with LDAC, AAC, and SBC codecs. Multipoint connection lets you connect to two devices simultaneously.",
              },
              {
                title: "Weight & Design",
                description:
                  "Lightweight at just 250g with soft-fit leather earcups. Foldable design includes a premium carry case.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                viewport={{ once: false, amount: 0.2 }}
                className="text-left space-y-4"
              >
                <motion.h3
                  className="text-2xl font-medium tracking-tight text-white"
                  animate={
                    isPlaying
                      ? {
                          color: [
                            "rgba(255,255,255,0.95)",
                            "rgba(209,213,255,1)",
                            "rgba(255,255,255,0.95)",
                          ],
                        }
                      : { color: "rgba(255,255,255,0.95)" }
                  }
                  transition={{
                    duration: isPlaying ? 3 : 0.4,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  {item.title}
                </motion.h3>
                <motion.div
                  className="w-12 h-px bg-white/30"
                  style={{ transformOrigin: "left center" }}
                  variants={accentUnderlineVariants}
                  initial="idle"
                  animate={isPlaying ? "playing" : "idle"}
                />
                <p className="text-white/70 text-lg leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
            className="mt-20"
          >
            <motion.h3
              className={`text-3xl font-light tracking-tight mb-12 ${
                isPlaying
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "text-white"
              }`}
              variants={gradientHeadingVariants}
              initial="idle"
              animate={isPlaying ? "playing" : "idle"}
              style={{ backgroundSize: isPlaying ? "200% 200%" : undefined }}
            >
              Key Features
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Industry-Leading Noise Canceling (8 Microphones)",
                "Integrated Processor V1 + HD NC Processor QN1",
                "30mm Driver with Carbon Fiber Dome",
                "Hi-Res Audio & LDAC Codec Support",
                "DSEE Extreme AI Upscaling",
                "Speak-to-Chat & Quick Attention",
                "Multipoint Connection (2 Devices)",
                "360 Reality Audio Support",
                "Precise Voice Pickup Technology",
                "Fast Charging (3 min = 3 hours)",
                "Soft-Fit Leather Earcups",
                "Foldable Design with Carry Case",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"
                    animate={
                      isPlaying
                        ? {
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6],
                          }
                        : { scale: 1, opacity: 0.6 }
                    }
                    transition={{
                      duration: isPlaying ? 1.8 : 0.4,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex gap-6 justify-center mt-16"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
            >
              Try in Store
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
