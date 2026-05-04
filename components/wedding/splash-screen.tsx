"use client";

import { useEffect } from "react";

export function SplashScreen() {
  useEffect(() => {
    const overlay = document.getElementById("splash-overlay");
    if (!overlay || overlay.dataset.initialized) return;
    overlay.dataset.initialized = "true";

    const dismiss = (withMusic: boolean) => {
      if (withMusic) {
        window.dispatchEvent(new CustomEvent("splash-play-music"));
      }
      window.scrollTo(0, 0);
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 1300);
    };

    document
      .getElementById("splash-btn-music")
      ?.addEventListener("click", () => dismiss(true));
    document
      .getElementById("splash-btn-silent")
      ?.addEventListener("click", () => dismiss(false));
  }, []);

  return null;
}
