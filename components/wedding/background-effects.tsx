"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function BackgroundEffects() {
  useEffect(() => {
    let animationFrameId: number;
    const duration = 15 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#a1e285", "#70c1b3", "#ffe066", "#ffffff", "#b2f5ea"], // Summer palette: green, teal, yellow, white, light teal
        zIndex: 50,
        disableForReducedMotion: true,
        gravity: 0.8,
        scalar: 1.2,
        drift: 1,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#a1e285", "#70c1b3", "#ffe066", "#ffffff", "#b2f5ea"],
        zIndex: 50,
        disableForReducedMotion: true,
        gravity: 0.8,
        scalar: 1.2,
        drift: -1,
      });

      if (Date.now() < end) {
        animationFrameId = requestAnimationFrame(frame);
      }
    })();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
}
