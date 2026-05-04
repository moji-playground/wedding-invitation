"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/photo1.jpeg", alt: "커플 사진 1", position: "object-center" },
  { src: "/images/photo2.jpeg", alt: "커플 사진 2", position: "object-center" },
  { src: "/images/photo3.jpeg", alt: "커플 사진 3", position: "object-center" },
  { src: "/images/photo4.jpeg", alt: "커플 사진 4", position: "object-center" },
  { src: "/images/photo5.jpeg", alt: "커플 사진 5", position: "object-right" },
  { src: "/images/photo6.jpeg", alt: "커플 사진 6", position: "object-center" },
];

export function GallerySectionC() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -120px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="flex flex-col items-center gap-1 px-6">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Gallery
          </p>
          <h2 className="font-serif text-lg tracking-wide text-foreground font-medium">
            C — 가로 스크롤
          </h2>
        </div>

        {/* Horizontal scroll film roll */}
        <div
          ref={scrollRef}
          className="w-full flex gap-1.5 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-6"
          style={{ scrollbarWidth: "none" }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative shrink-0 w-[72vw] max-w-xs aspect-[4/5] snap-center overflow-hidden first:ml-0"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={`object-cover ${photo.position}`}
              />
            </div>
          ))}
          {/* trailing padding */}
          <div className="shrink-0 w-6" />
        </div>

        <p className="text-xs text-muted-foreground tracking-widest">
          ← 옆으로 넘겨보세요 →
        </p>
      </div>
    </section>
  );
}
