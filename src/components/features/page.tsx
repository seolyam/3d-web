"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";

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

function FeatureSection({ section }: { section: FeatureSectionProps }) {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section
      id={section.id}
      className="min-h-screen bg-black flex items-center"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-orange-500"
          >
            {section.category}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight"
          >
            {section.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-white/70 max-w-3xl mx-auto"
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

export function Features() {
  return (
    <>
      {featureSections.map((section) => (
        <FeatureSection key={section.id} section={section} />
      ))}
    </>
  );
}
