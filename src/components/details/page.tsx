"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";

export function Details() {
  const { ref, isInView } = useRepeatingScrollAnimation();

  return (
    <section id="details" className="py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-16"
        >
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Every detail, perfected.
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Industry-leading noise canceling meets premium craftsmanship in
              every component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-left space-y-4"
            >
              <h3 className="text-2xl font-medium tracking-tight">
                Battery Life
              </h3>
              <div className="w-12 h-px bg-white/30"></div>
              <p className="text-white/70 text-lg leading-relaxed">
                Up to 30 hours with noise canceling on, up to 40 hours with it
                off. Fast charging gives you 3 hours of playback in just 3
                minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-left space-y-4"
            >
              <h3 className="text-2xl font-medium tracking-tight">
                Connectivity
              </h3>
              <div className="w-12 h-px bg-white/30"></div>
              <p className="text-white/70 text-lg leading-relaxed">
                Bluetooth 5.2 with LDAC, AAC, and SBC codecs. Multipoint
                connection lets you connect to two devices simultaneously.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-left space-y-4"
            >
              <h3 className="text-2xl font-medium tracking-tight">
                Weight & Design
              </h3>
              <div className="w-12 h-px bg-white/30"></div>
              <p className="text-white/70 text-lg leading-relaxed">
                Lightweight at just 250g with soft-fit leather earcups. Foldable
                design includes a premium carry case.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-3xl font-light tracking-tight mb-12">
              Key Features
            </h3>
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
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"></div>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
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
