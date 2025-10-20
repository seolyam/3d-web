import { Variants } from "framer-motion";

export const gradientHeadingVariants: Variants = {
  idle: {
    backgroundPosition: "50% 50%",
    textShadow: "0 0 0 rgba(168,85,247,0)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  playing: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    textShadow: [
      "0 0 0 rgba(168,85,247,0)",
      "0 0 24px rgba(168,85,247,0.45)",
      "0 0 0 rgba(168,85,247,0)",
    ],
    transition: { duration: 6, repeat: Infinity, ease: "linear" },
  },
};

export const taglinePulseVariants: Variants = {
  idle: {
    color: "rgba(255,255,255,0.7)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  playing: {
    color: [
      "rgba(255,255,255,0.65)",
      "rgba(255,255,255,0.9)",
      "rgba(255,255,255,0.65)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatingGlowVariants: Variants = {
  idle: {
    opacity: 0.12,
    scale: 1,
    backgroundPosition: "50% 50%",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  playing: {
    opacity: [0.1, 0.3, 0.1],
    scale: [1, 1.03, 1],
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 10, repeat: Infinity, ease: "linear" },
  },
};

export const accentUnderlineVariants: Variants = {
  idle: {
    scaleX: 1,
    opacity: 0.3,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  playing: {
    scaleX: [1, 1.4, 1],
    opacity: [0.3, 0.7, 0.3],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};
