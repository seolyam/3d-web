"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  floatingGlowVariants,
  gradientHeadingVariants,
  taglinePulseVariants,
} from "@/lib/audioVariants";

interface FeatureSectionProps {
  id: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const featureSections: FeatureSectionProps[] = [
  {
    id: "feature-sensors",
    category: "Technology",
    title: "Multi‑Noise Sensor technology.",
    description:
      "Four microphones on each earcup capture ambient sound with higher precision to dramatically reduce high‑frequency noise. Auto NC Optimizer continuously tunes performance based on wearing conditions and atmospheric pressure.",
    imageSrc: "/images/Components 1.png",
    imageAlt: "Multi‑Noise Sensor technology",
  },
  {
    id: "feature-processors",
    category: "Processors",
    title: "Incomparable noise canceling.",
    description:
      "The Integrated Processor V1 unlocks the full potential of our HD Noise Canceling Processor QN1. Together they control eight microphones for unprecedented noise‑canceling quality.",
    imageSrc: "/images/processor.png",
    imageAlt: "Integrated Processor V1 and QN1",
  },
  {
    id: "feature-drivers",
    category: "Drivers",
    title: "Specially designed 30‑mm driver unit.",
    description:
      "A soft‑edge 30 mm driver enhances noise canceling and precision. The carbon fiber composite dome is light yet rigid, improving clarity — especially at high frequencies.",
    imageSrc: "/images/30mm-driver.png",
    imageAlt: "30mm driver unit",
  },
  {
    id: "feature-hires",
    category: "Audio",
    title: "Enjoy High‑Resolution Audio with and without wires.",
    description:
      "The WH-1000XM5 supports High-Resolution Audio and High-Resolution Audio Wireless, thanks to LDAC, our industry-adopted audio coding technology. LDAC transmits approximately three times more data than conventional Bluetooth® audio for exceptional High-Resolution Audio quality.",
    imageSrc: "/images/hires-audio.png",
    imageAlt: "Hi-Res Audio Wireless",
  },
  {
    id: "feature-dsee",
    category: "Edge‑AI",
    title: "Real‑time restoration for compressed music.",
    description:
      "DSEE Extreme uses AI to analyze instrumentation and genre in real time, restoring high‑range detail lost during compression.",
    imageSrc: "/images/DSEE.png",
    imageAlt: "DSEE Extreme",
  },
  {
    id: "feature-wireless",
    category: "Wireless",
    title: "Wireless freedom, redefined.",
    description:
      "Experience true wireless freedom with multipoint connection, allowing you to connect to two devices simultaneously. Seamlessly switch between your phone and laptop without missing a beat.",
    imageSrc: "/images/hires-audio-wireless.png",
    imageAlt: "Wireless Freedom",
  },
  {
    id: "feature-design",
    category: "Design",
    title: "Crafted for comfort, built for performance.",
    description:
      "Premium materials and thoughtful design come together in the WH-1000XM5. Soft-fit leather earcups and an adjustable headband ensure all-day comfort, while the foldable design makes it perfect for travel.",
    imageSrc: "/images/SonyWH-1000XM5_Silver_Side_2048x 1.png",
    imageAlt: "WH-1000XM5 Silver Design",
  },
];

interface FeatureSectionComponentProps {
  section: FeatureSectionProps;
  isPlaying: boolean;
}

function FeatureSection({
  section,
  isPlaying,
}: FeatureSectionComponentProps) {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section
      id={section.id}
      className="relative min-h-screen bg-black flex items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(236,72,153,0.18),transparent_60%),linear-gradient(160deg,rgba(0,0,0,0.9),rgba(0,0,0,0.65))]"
        variants={floatingGlowVariants}
        initial="idle"
        animate={isPlaying ? "playing" : "idle"}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <motion.p
            className="uppercase tracking-[0.3em] text-xs"
            animate={
              isPlaying
                ? {
                    letterSpacing: ["0.3em", "0.45em", "0.3em"],
                    opacity: [0.6, 1, 0.6],
                    color: ["#22d3ee", "#a855f7", "#ec4899"],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : {
                    letterSpacing: "0.3em",
                    opacity: 0.85,
                    color: "rgba(255,255,255,0.75)",
                    transition: { duration: 0.4, ease: "easeOut" },
                  }
            }
          >
            {section.category}
          </motion.p>
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
            {section.title}
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-3xl mx-auto"
            variants={taglinePulseVariants}
            initial="idle"
            animate={isPlaying ? "playing" : "idle"}
          >
            {section.description}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
          className={`relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center ${
            section.id === "feature-dsee" ? "bg-white" : "bg-black/20"
          }`}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    "0 0 0 rgba(59,130,246,0)",
                    "0 24px 50px rgba(59,130,246,0.18)",
                    "0 0 0 rgba(59,130,246,0)",
                  ],
                  transition: {
                    boxShadow: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                }
              : {
                  boxShadow: "0 0 0 rgba(59,130,246,0)",
                  transition: {
                    boxShadow: { duration: 0.6, ease: "easeInOut" },
                  },
                }
          }
        >
          <Image
            src={section.imageSrc}
            alt={section.imageAlt}
            fill
            className="object-contain p-8 md:p-10"
          />
        </motion.div>
      </div>
    </section>
  );
}

interface FeaturesProps {
  isPlaying?: boolean;
}

export function Features({ isPlaying = false }: FeaturesProps) {
  return (
    <>
      {featureSections.map((section) => (
        <FeatureSection
          key={section.id}
          section={section}
          isPlaying={isPlaying}
        />
      ))}
    </>
  );
}
