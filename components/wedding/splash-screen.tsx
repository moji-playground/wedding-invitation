"use client";

import { useEffect } from "react";

export function SplashScreen() {
  useEffect(() => {
    if (document.getElementById("splash-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "splash-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#faf8f5;transition:opacity 1.2s ease-in-out;";

    const line1Text = "We're getting married";
    const line2Text = "celebrate with us";

    const l1 = document.createElement("div");
    l1.style.cssText = "display:flex;margin-bottom:14px;";

    const l2 = document.createElement("div");
    l2.style.cssText = "display:flex;";

    const fontBase =
      'font-family:"Cormorant Garamond",Georgia,serif;display:inline-block;opacity:0;transform:translateY(6px);transition:opacity 0.45s ease-out,transform 0.45s ease-out;white-space:pre;';

    line1Text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.cssText =
        fontBase +
        "font-size:1.5rem;font-weight:300;letter-spacing:0.12em;color:rgba(60,50,45,0.85);";
      span.style.transitionDelay = `${0.3 + i * 0.055}s`;
      l1.appendChild(span);
    });

    line2Text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.cssText =
        fontBase +
        "font-size:0.85rem;font-weight:300;letter-spacing:0.25em;font-style:italic;color:rgba(60,50,45,0.5);";
      span.style.transitionDelay = `${1.6 + i * 0.055}s`;
      l2.appendChild(span);
    });

    // 버튼 영역 (텍스트 애니메이션 끝난 후 등장)
    const btnWrap = document.createElement("div");
    btnWrap.style.cssText =
      "display:flex;gap:16px;margin-top:48px;opacity:0;transition:opacity 0.6s ease-in-out;";

    const btnBase =
      'font-family:"Cormorant Garamond",Georgia,serif;font-size:0.8rem;font-weight:300;letter-spacing:0.2em;padding:10px 20px;border:1px solid rgba(60,50,45,0.25);background:transparent;cursor:pointer;color:rgba(60,50,45,0.6);transition:all 0.2s;';

    const btnMusic = document.createElement("button");
    btnMusic.textContent = "♪  음악과 함께";
    btnMusic.style.cssText = btnBase;

    const btnSilent = document.createElement("button");
    btnSilent.textContent = "조용히 보기";
    btnSilent.style.cssText = btnBase;

    const dismiss = (withMusic: boolean) => {
      if (withMusic) {
        window.dispatchEvent(new CustomEvent("splash-play-music"));
      }
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 1300);
    };

    btnMusic.addEventListener("click", () => dismiss(true));
    btnSilent.addEventListener("click", () => dismiss(false));

    btnWrap.appendChild(btnMusic);
    btnWrap.appendChild(btnSilent);

    overlay.appendChild(l1);
    overlay.appendChild(l2);
    overlay.appendChild(btnWrap);
    document.body.prepend(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        [...l1.children, ...l2.children].forEach((span) => {
          (span as HTMLElement).style.opacity = "1";
          (span as HTMLElement).style.transform = "translateY(0)";
        });
      });
    });

    // 텍스트 애니메이션 끝난 후 버튼 등장
    const btnDelay = 1.6 + line2Text.length * 0.055 + 0.6;
    setTimeout(() => {
      btnWrap.style.opacity = "1";
    }, btnDelay * 1000);
  }, []);

  return null;
}
