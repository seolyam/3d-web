"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10">
            <h2 className="text-5xl font-light tracking-tight mb-6">
              Experience Premium Audio
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of users who have elevated their audio experience
              to new heights.
            </p>
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
