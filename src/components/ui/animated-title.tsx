"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gradient?: boolean;
  glow?: boolean;
}

export function AnimatedTitle({
  children,
  className = "",
  delay = 0,
  gradient = false,
  glow = false,
}: AnimatedTitleProps) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        ...(gradient && {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }),
        ...(glow && {
          textShadow: [
            "0 0 20px rgba(255, 255, 255, 0.3)",
            "0 0 30px rgba(255, 255, 255, 0.5)",
            "0 0 20px rgba(255, 255, 255, 0.3)",
          ],
        }),
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        x: { duration: 0.6, delay },
        ...(gradient && {
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.7,
          },
        }),
        ...(glow && {
          textShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 1.2,
          },
        }),
      }}
      className={`${
        gradient
          ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          : ""
      } ${className}`}
      style={gradient ? { backgroundSize: "200% 200%" } : {}}
    >
      {children}
    </motion.span>
  );
}
