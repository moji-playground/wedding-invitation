"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function BackgroundEffects() {
  useEffect(() => {
    let animationFrameId: number;
    const colors = [
      "#a1e285",
      "#70c1b3",
      "#ffe066",
      "#ffffff",
      "#b2f5ea",
      "#ff9a9e",
    ];

    (function frame() {
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 50,
        disableForReducedMotion: true,
        gravity: 0.6,
        scalar: 1.2,
        drift: 1,
        ticks: 300,
      });
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 50,
        disableForReducedMotion: true,
        gravity: 0.6,
        scalar: 1.2,
        drift: -1,
        ticks: 300,
      });

      animationFrameId = requestAnimationFrame(frame);
    })();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
}
