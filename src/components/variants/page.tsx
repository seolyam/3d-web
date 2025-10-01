"use client";

import { motion } from "framer-motion";
import { VariantSelector } from "@/components/VariantSelector";

export function Variants() {
  return (
    <section
      id="variants"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VariantSelector />
        </motion.div>
      </div>
    </section>
  );
}
