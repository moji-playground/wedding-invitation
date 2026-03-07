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
          startVelocity: 5, // give it a little initial push downwards
          origin: { x: Math.random(), y: 0 }, // Start exactly at the top
          colors: [colors[Math.floor(Math.random() * colors.length)]], // Individual particle color
          zIndex: 100, // Ensure it is above the main layout background
          disableForReducedMotion: true,
          gravity: 0.4, // Fall slightly faster so it enters the screen
          scalar: 0.8 + Math.random() * 0.4, // Make it big enough to be visible (0.8 to 1.2)
          drift: Math.random() * 2 - 1, // Random slight horizontal breeze
          ticks: 600, // Keep particle on screen longer
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
