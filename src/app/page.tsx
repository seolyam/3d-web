"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { ProductDetails } from "@/components/ProductDetails";
import { VariantSelector } from "@/components/VariantSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const heroSectionRef = useRef<HTMLElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerNodeRef = useRef<StereoPannerNode | null>(null);

  // Set up audio processing for distance effects
  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
        const source = audioContextRef.current.createMediaElementSource(
          audioRef.current
        );
        gainNodeRef.current = audioContextRef.current.createGain();
        pannerNodeRef.current = audioContextRef.current.createStereoPanner();

        source.connect(gainNodeRef.current);
        gainNodeRef.current.connect(pannerNodeRef.current);
        pannerNodeRef.current.connect(audioContextRef.current.destination);

        if (audioContextRef.current.state === "suspended") {
          const resumeAudio = () => {
            if (audioContextRef.current) {
              audioContextRef.current.resume();
            }
          };
          document.addEventListener("touchstart", resumeAudio, { once: true });
          document.addEventListener("click", resumeAudio, { once: true });
        }
      } catch {
        console.log(
          "Web Audio API not supported, falling back to basic controls"
        );
      }
    }
  }, []);

  useEffect(() => {
    const updateScrollDistance = () => {
      if (heroSectionRef.current) {
        const distance = Math.max(0, window.scrollY);
        setScrollDistance(distance);
      }
    };

    window.addEventListener("scroll", updateScrollDistance);
    updateScrollDistance();

    return () => window.removeEventListener("scroll", updateScrollDistance);
  }, []);

  const maxDistance = 3000;
  const distanceRatio = Math.min(scrollDistance / maxDistance, 1);
  const distanceVolume = Math.max(0.15, Math.pow(1 - distanceRatio, 1.5));
  const panValue = distanceRatio * 0.8;

  useEffect(() => {
    if (gainNodeRef.current && pannerNodeRef.current) {
      const baseVolume = (volume / 100) * distanceVolume;
      gainNodeRef.current.gain.setValueAtTime(
        baseVolume,
        audioContextRef.current?.currentTime || 0
      );
      pannerNodeRef.current.pan.setValueAtTime(
        panValue,
        audioContextRef.current?.currentTime || 0
      );
    } else if (audioRef.current) {
      const baseVolume = (volume / 100) * distanceVolume;
      audioRef.current.volume = baseVolume;
    }
  }, [volume, distanceVolume, panValue]);

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          if (
            audioContextRef.current &&
            audioContextRef.current.state === "suspended"
          ) {
            await audioContextRef.current.resume();
          }

          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Audio play failed:", error);

          if (audioRef.current) {
            audioRef.current.load();
            try {
              await audioRef.current.play();
              setIsPlaying(true);
            } catch (fallbackError) {
              console.log("Fallback audio play failed:", fallbackError);
            }
          }
        }
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeSlider(true);
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <audio
        ref={audioRef}
        src="/audio/audio-xm5.mp3"
        loop
        preload="auto"
        playsInline
        webkit-playsinline="true"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
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
        ref={heroSectionRef}
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

            <motion.div
              className="relative bg-black/30 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-white/10 h-full shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              style={{
                filter: `blur(${distanceRatio * 2}px) brightness(${
                  1 - distanceRatio * 0.3
                })`,
                transform: `scale(${1 - distanceRatio * 0.05})`,
              }}
            >
              <ProductViewer className="w-full h-full" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: distanceRatio > 0.1 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/50" />
                  <span className="text-xs text-white/70">
                    {Math.round(distanceRatio * 100)}% away
                  </span>
                </div>
              </motion.div>

              <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={togglePlayPause}
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>

                <div className="relative">
                  <Button
                    size="sm"
                    variant="secondary"
                    onMouseEnter={handleVolumeMouseEnter}
                    onMouseLeave={handleVolumeMouseLeave}
                    className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>

                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg p-3 min-w-[120px]"
                      onMouseEnter={handleVolumeMouseEnter}
                      onMouseLeave={handleVolumeMouseLeave}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-white/70">Volume</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) =>
                            handleVolumeChange(Number(e.target.value))
                          }
                          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #fff 0%, #fff ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`,
                          }}
                        />
                        <span className="text-xs text-white/50">{volume}%</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-wrap justify-center gap-3 z-10"
        >
          {[
            "Multi‑Noise Sensor",
            "V1 + QN1 Processors",
            "30‑mm Driver",
            "Hi‑Res / LDAC",
            "DSEE Extreme",
          ].map((chip, index) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
              className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>
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
                  className="bg-white text-black hover:bg-white/90"
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

      <section id="details" className="py-32 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
                  Lightweight at just 250g with soft-fit leather earcups.
                  Foldable design includes a premium carry case.
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

      <section
        id="feature-sensors"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-4"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-orange-500"
            >
              Technology
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-light tracking-tight"
            >
              Multi‑Noise Sensor technology.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-3xl mx-auto"
            >
              Four microphones on each earcup capture ambient sound with higher
              precision to dramatically reduce high‑frequency noise. Auto NC
              Optimizer continuously tunes performance based on wearing
              conditions and atmospheric pressure.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center"
          >
            <Image
              src="/images/Components 1.png"
              alt="Multi‑Noise Sensor technology"
              fill
              className="object-contain p-8 md:p-10"
            />
          </motion.div>
        </div>
      </section>

      <section
        id="feature-processors"
        className="min-h-screen bg-black flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-4"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-orange-500"
            >
              Processors
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-light tracking-tight"
            >
              Incomparable noise canceling.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-3xl mx-auto"
            >
              The Integrated Processor V1 unlocks the full potential of our HD
              Noise Canceling Processor QN1. Together they control eight
              microphones for unprecedented noise‑canceling quality.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center"
          >
            <Image
              src="/images/processor.png"
              alt="Integrated Processor V1 and QN1"
              fill
              className="object-contain p-8 md:p-10"
            />
          </motion.div>
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
          <div className="relative mt-10 aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-white flex items-center justify-center">
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
                  className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg"
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
