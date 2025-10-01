"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { ProductDetails } from "@/components/ProductDetails";
import { VariantSelector } from "@/components/VariantSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Volume2 } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl font-medium tracking-tight">Audionix</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-8"
          >
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Products
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Support
            </Button>
            <Button className="bg-white text-black hover:bg-white/90">
              Shop Now
            </Button>
          </motion.div>
        </div>
      </header>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 z-10"
        >
          <Badge
            variant="secondary"
            className="w-fit bg-white/10 text-white border-white/20 mb-6"
          >
            New Release
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight mb-4">
            Premium
            <span className="block font-medium">Wireless Earbuds</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Experience the future of wireless audio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full max-w-4xl mx-auto px-6"
          style={{ y }}
        >
          <div className="aspect-square relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl scale-110" />

            <div className="relative bg-black/30 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-white/10 h-full">
              <ProductViewer className="w-full h-full" />

              <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Play className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
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

      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ProductDetails />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-16"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-light tracking-tight">
                Advanced Technology
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Engineered for perfection with state-of-the-art audio technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Intelligent Noise Control",
                  description:
                    "Advanced algorithms that adapt to your environment in real-time",
                  icon: "🎯",
                },
                {
                  title: "Extended Battery Life",
                  description:
                    "All-day performance with intelligent power management",
                  icon: "⚡",
                },
                {
                  title: "Spatial Audio Experience",
                  description:
                    "Immersive 3D sound that surrounds you from every direction",
                  icon: "🎵",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-black">
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
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/50">
          <p>&copy; 2025 Audionix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
