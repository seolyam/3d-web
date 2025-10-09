"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useRepeatingScrollAnimation } from "@/hooks/useScrollAnimation";

export function Lifestyle() {
  const { ref: leftRef, isInView: leftInView } = useRepeatingScrollAnimation();
  const { ref: rightRef, isInView: rightInView } =
    useRepeatingScrollAnimation();

  return (
    <section id="lifestyle" className="min-h-screen bg-black flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -50 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-light tracking-tight">
                Silence the world.
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                Step into a world of pure audio bliss. The WH-1000XM5 creates an
                immersive listening experience that lets you focus on what
                matters most.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
              >
                Explore Features
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </Button>
            </div>
          </motion.div>

          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 50 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/man-with-xm5.png"
                alt="Person wearing WH-1000XM5 headphones"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
