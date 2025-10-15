"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Hero } from "@/components/hero/page";
import { Variants } from "@/components/variants/page";
import { Details } from "@/components/details/page";
import { Features } from "@/components/features/page";
import { Lifestyle } from "@/components/lifestyle/page";
import { CTA } from "@/components/cta/page";
import { useLoadingSequence } from "@/hooks/useLoadingSequence";

export default function Home() {
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
  const analyzerNodeRef = useRef<AnalyserNode | null>(null);
  const loadingSequence = useLoadingSequence();

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

  // Track how far we've scrolled from the top
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
          { id: "variants", label: "Style" },
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

      <Hero
        isPlaying={isPlaying}
        volume={volume}
        showVolumeSlider={showVolumeSlider}
        distanceRatio={distanceRatio}
        analyzerNode={analyzerNodeRef.current}
        onTogglePlayPause={togglePlayPause}
        onVolumeMouseEnter={handleVolumeMouseEnter}
        onVolumeMouseLeave={handleVolumeMouseLeave}
        onVolumeChange={handleVolumeChange}
        loadingSequence={loadingSequence}
      />

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
