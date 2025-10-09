"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    rootMargin,
    once: triggerOnce,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    } else if (!isInView && !triggerOnce) {
      // Reset animation when element goes out of view
      setHasAnimated(false);
    }
  }, [isInView, hasAnimated, triggerOnce]);

  return { ref, isInView: isInView || hasAnimated, hasAnimated };
}

// Hook for elements that should animate every time they come into view
export function useRepeatingScrollAnimation(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    rootMargin,
    once: false, // Always allow re-triggering
  });

  return { ref, isInView };
}

