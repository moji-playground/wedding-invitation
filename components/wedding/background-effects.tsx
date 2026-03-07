"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function BackgroundEffects() {
  useEffect(() => {
    let animationFrameId: number;
    // Elegant, soft summer pastel colors: White, very pale mint, very pale yellow
    const colors = ["#ffffff", "#f1f8e9", "#e0f2f1", "#fffde7"];
    let lastTime = Date.now();

    (function frame() {
      // Fire only 1 particle every 600ms to ensure it's extremely subtle and not busy
      if (Date.now() - lastTime > 600) {
        confetti({
          particleCount: 1,
          startVelocity: 0, // Fall gently downwards without shooting up
          origin: { x: Math.random(), y: -0.1 }, // Random position across the top slightly offscreen
          colors: [colors[Math.floor(Math.random() * colors.length)]], // Individual particle color
          zIndex: 10,
          disableForReducedMotion: true,
          gravity: 0.2, // Very slow, graceful fall
          scalar: 0.3 + Math.random() * 0.2, // Extremely small size (0.3 to 0.5)
          drift: Math.random() * 2 - 1, // Random slight horizontal breeze
          ticks: 800, // Keep particle on screen longer
          shapes: ["circle"], // Soft, petal-like circular shapes rather than harsh rectangles
        });

        lastTime = Date.now();
      }

      animationFrameId = requestAnimationFrame(frame);
    })();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
}
