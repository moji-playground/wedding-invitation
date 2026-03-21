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

  // Parallax slowly moves the image down as user scrolls down
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center px-6 pt-12 pb-8 overflow-hidden"
    >
      {/* Floral hero image with Parallax */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden mb-8"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/images/wedding-hero.jpg"
            alt="웨딩 플로럴 장식"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <p className="text-sm tracking-[0.3em] text-muted-foreground font-light uppercase">
          Wedding Invitation
        </p>

        <div className="flex items-center gap-4">
          <span className="font-serif text-3xl font-medium text-foreground sm:text-4xl transition-all duration-700">
            정현모
          </span>
          <span className="text-primary text-2xl font-serif animate-pulse">
            &
          </span>
          <span className="font-serif text-3xl font-medium text-foreground sm:text-4xl transition-all duration-700">
            김은지
          </span>
        </div>

        <div className="w-12 h-px bg-primary/40 my-2" />

        <p className="font-serif text-base text-muted-foreground leading-relaxed sm:text-lg">
          2026년 6월 6일 토요일 오후 12시 30분
        </p>
        <p className="text-sm text-muted-foreground tracking-wide opacity-80">
          더 S 웨딩홀 1층 컨벤션홀
        </p>
      </motion.div>
    </section>
  );
}
