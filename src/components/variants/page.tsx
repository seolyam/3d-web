"use client";

import { motion } from "framer-motion";
import { VariantSelector } from "@/components/VariantSelector";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";

export function Variants() {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section
      id="variants"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <VariantSelector />
        </motion.div>
      </div>
    </section>
  );
}
