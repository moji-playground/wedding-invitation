"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden max-w-lg mx-auto"
    >
      {/* Full-bleed parallax image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[35%]"
      >
        <Image
          src="/images/photo3.jpeg"
          alt="웨딩 사진"
          fill
          className="object-cover scale-125"
          priority
        />
      </motion.div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.05) 70%, transparent 100%)",
        }}
      />

      {/* Text overlay at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-10 text-white"
      >
        <p className="text-xs tracking-[0.35em] text-white/70 font-light uppercase">
          Wedding Invitation
        </p>

        <div className="flex items-center gap-4">
          <span className="font-serif text-3xl font-medium drop-shadow-sm">
            정현모
          </span>
          <span className="text-white/60 text-xl font-serif">&</span>
          <span className="font-serif text-3xl font-medium drop-shadow-sm">
            김은지
          </span>
        </div>

        <div className="w-10 h-px bg-white/40 my-1" />

        <p className="font-serif text-base text-white/80 leading-relaxed">
          2026년 6월 6일 토요일 오후 12시 30분
        </p>
        <p className="text-xs text-white/60 tracking-wide">
          더 S 웨딩홀 1층 컨벤션홀
        </p>
      </motion.div>
    </section>
  );
}
