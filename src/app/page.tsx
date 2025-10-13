"use client";

import { motion } from "framer-motion";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Hero } from "@/components/hero/page";
import { Variants } from "@/components/variants/page";
import { Details } from "@/components/details/page";
import { Features } from "@/components/features/page";
import { Lifestyle } from "@/components/lifestyle/page";
import { CTA } from "@/components/cta/page";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerNodeRef = useRef<StereoPannerNode | null>(null);
  const analyzerNodeRef = useRef<AnalyserNode | null>(null);
  const [isHeroModelVisible, setIsHeroModelVisible] = useState(true);

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
        analyzerNodeRef.current = audioContextRef.current.createAnalyser();
        analyzerNodeRef.current.fftSize = 512;
        analyzerNodeRef.current.smoothingTimeConstant = 0.8;

        source.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyzerNodeRef.current);
        analyzerNodeRef.current.connect(pannerNodeRef.current);
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

  // Make audio quieter and more distant as you scroll down
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
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Centered mini model overlay */}
          {!isHeroModelVisible && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="hidden md:block w-20 h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden">
                <ProductViewer className="w-full h-full" />
              </div>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-2xl font-medium tracking-tight">Audionix</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                Products
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                Support
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                  "0 0 20px rgba(255, 255, 255, 0.1)",
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Button className="bg-white text-black hover:bg-white/90">
                Shop Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <motion.nav
        className="sticky-nav fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {[
          { id: "hero", label: "Top" },
          { id: "variants", label: "Style" },
          { id: "details", label: "Details" },
          { id: "feature-sensors", label: "Tech" },
          { id: "cta", label: "CTA" },
        ].map((item, index) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className="sticky-nav-item px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
            aria-label={`Jump to ${item.label}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{
              scale: 1.1,
              x: -5,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.a>
        ))}
      </motion.nav>

      <div ref={heroSectionRef}>
        <Hero
          audioRef={audioRef}
          isPlaying={isPlaying}
          volume={volume}
          showVolumeSlider={showVolumeSlider}
          distanceRatio={distanceRatio}
          analyzerNode={analyzerNodeRef.current}
          onTogglePlayPause={togglePlayPause}
          onVolumeMouseEnter={handleVolumeMouseEnter}
          onVolumeMouseLeave={handleVolumeMouseLeave}
          onVolumeChange={handleVolumeChange}
          onModelVisibilityChange={setIsHeroModelVisible}
        />
      </div>

      <Variants />

      <Lifestyle />

      <Details />

      <Features />

      <CTA />

      <footer className="border-t border-white/10 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/50">
          <p>&copy; 2025 Audionix. All rights reserved.</p>
        </div>
      </footer>
      <motion.a
        href="#hero"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label="Back to top"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -5, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 1 },
          scale: { duration: 0.5, delay: 1 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.1,
          rotate: 360,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.a>
    </div>
  );
}
