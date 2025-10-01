"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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

      {/* Floating in-page nav */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {[
          { id: "hero", label: "Top" },
          { id: "variants", label: "Variants" },
          { id: "details", label: "Details" },
          { id: "feature-sensors", label: "Tech" },
          { id: "cta", label: "CTA" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label={`Jump to ${item.label}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.12),transparent_50%)]" />
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
            WH‑1000XM5
            <span className="block font-medium">Premium Noise Canceling</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Flagship noise canceling with Hi‑Res Audio, LDAC, and Edge‑AI
            upscaling.
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl scale-110" />

            <div className="relative bg-black/30 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-white/10 h-full shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
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

        <div className="mt-10 flex flex-wrap justify-center gap-3 z-10">
          {[
            "Multi‑Noise Sensor",
            "V1 + QN1 Processors",
            "30‑mm Driver",
            "Hi‑Res / LDAC",
            "DSEE Extreme",
          ].map((chip) => (
            <span
              key={chip}
              className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

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

      <section className="min-h-screen bg-black flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
                Silence the world.
                <span className="block font-medium">Elevate your sound.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                Industry-leading noise canceling meets exceptional sound
                quality. Whether commuting, traveling, or focusing at work, the
                WH-1000XM5 adapts to your environment.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Explore Features
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Watch Video
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10"
            >
              <Image
                src="/images/man-with-xm5.png"
                alt="Man wearing WH-1000XM5 headphones"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="details" className="py-20 bg-gray-900">
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

      {/* One-feature-per-page sections */}
      <section
        id="feature-sensors"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Technology</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Multi‑Noise Sensor technology.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Four microphones on each earcup capture ambient sound with higher
              precision to dramatically reduce high‑frequency noise. Auto NC
              Optimizer continuously tunes performance based on wearing
              conditions and atmospheric pressure.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/Components 1.png"
              alt="Multi‑Noise Sensor technology"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

      <section
        id="feature-processors"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Processors</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Incomparable noise canceling.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              The Integrated Processor V1 unlocks the full potential of our HD
              Noise Canceling Processor QN1. Together they control eight
              microphones for unprecedented noise‑canceling quality.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/processor.png"
              alt="Integrated Processor V1 and QN1"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

      <section
        id="feature-drivers"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Drivers</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Specially designed 30‑mm driver unit.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              A soft‑edge 30 mm driver enhances noise canceling and precision.
              The carbon fiber composite dome is light yet rigid, improving
              clarity — especially at high frequencies.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/30mm-driver.png"
              alt="30mm driver unit"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

      <section
        id="feature-hires"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Audio</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              High‑Resolution Audio. Wired or wireless.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              LDAC transmits roughly three times more data than conventional
              Bluetooth, enabling exceptional High‑Resolution Audio quality —
              with or without wires.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/hires-audio.png"
              alt="High‑Resolution Audio"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

      <section
        id="feature-dsee"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Edge‑AI</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Real‑time restoration for compressed music.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              DSEE Extreme uses AI to analyze instrumentation and genre in real
              time, restoring high‑range detail lost during compression.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/DSEE.png"
              alt="DSEE Extreme"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

      <section
        id="feature-wireless"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Wireless Freedom</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Hi‑Res Audio Wireless.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Experience studio-quality sound without the cable. LDAC technology
              delivers three times more data than conventional Bluetooth for
              superior wireless fidelity.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/hires-audio-wireless.png"
              alt="Hi‑Res Audio Wireless"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

      <section
        id="feature-design"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            <p className="text-orange-500">Design</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Refined. Reengineered.
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              A completely redesigned silhouette with seamless construction.
              Soft-fit leather and reduced pressure points for all-day comfort.
            </p>
          </div>
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/images/SonyWH-1000XM5_Silver_Side_2048x 1.png"
              alt="WH-1000XM5 Silver Design"
              fill
              className="object-contain p-8 md:p-10"
            />
          </div>
        </div>
      </section>

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
      {/* Back to top */}
      <a
        href="#hero"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label="Back to top"
      >
        ↑
      </a>
    </div>
  );
}
