"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/hooks/useProductStore";
import {
  gradientHeadingVariants,
  taglinePulseVariants,
} from "@/lib/audioVariants";

interface VariantSelectorProps {
  isPlaying?: boolean;
}

export function VariantSelector({ isPlaying = false }: VariantSelectorProps) {
  const { product, selectedVariant, setSelectedVariant } = useProductStore();

  return (
    <div className="space-y-10 text-center pt-40">
      <div className="space-y-3">
        <motion.h3
          className={`text-4xl md:text-5xl font-light tracking-tight ${
            isPlaying
              ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              : "text-white"
          }`}
          variants={gradientHeadingVariants}
          initial="idle"
          animate={isPlaying ? "playing" : "idle"}
          style={{ backgroundSize: isPlaying ? "200% 200%" : undefined }}
        >
          Choose Your Style
        </motion.h3>
        <motion.p
          className="text-white/70 text-lg"
          variants={taglinePulseVariants}
          initial="idle"
          animate={isPlaying ? "playing" : "idle"}
        >
          Three stunning finishes to match your look
        </motion.p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {product.variants.map((variant) => (
          <motion.div
            key={variant.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedVariant === variant.id ? "default" : "outline"}
              onClick={() => setSelectedVariant(variant.id)}
              className={`flex flex-col items-center p-6 h-auto min-w-[180px] rounded-2xl ${
                selectedVariant === variant.id
                  ? "bg-white text-black hover:bg-white/90 hover:text-black shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                  : "border-white/30 text-white hover:bg-white/10 hover:text-white bg-white/5"
              }`}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-white/30 mb-3 shadow-lg"
                style={{ backgroundColor: variant.color }}
              />
              <span className="text-sm font-medium mb-1 tracking-wide">
                {variant.name}
              </span>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  selectedVariant === variant.id
                    ? "bg-black/10 text-black"
                    : "bg-white/10 text-white border-white/20"
                }`}
              >
                {variant.price === 0 ? "Coming Soon" : `$${variant.price}`}
              </Badge>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
