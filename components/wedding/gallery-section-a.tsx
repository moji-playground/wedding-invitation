"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/photo1.jpeg", alt: "커플 사진 1", position: "object-center" },
  { src: "/images/photo2.jpeg", alt: "커플 사진 2", position: "object-center" },
  { src: "/images/photo3.jpeg", alt: "커플 사진 3", position: "object-center" },
  { src: "/images/photo4.jpeg", alt: "커플 사진 4", position: "object-center" },
  { src: "/images/photo5.jpeg", alt: "커플 사진 5", position: "object-right" },
  { src: "/images/photo6.jpeg", alt: "커플 사진 6", position: "object-center" },
];

export function GallerySectionA() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <>
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
              A — 타일
            </h2>
          </div>

          {/* Zero-gap tile grid */}
          <div className="w-full max-w-sm grid grid-cols-3 overflow-hidden">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-square overflow-hidden group"
                aria-label={`사진 ${i + 1} 크게 보기`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photo.position}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (i) => ((i ?? 0) - 1 + photos.length) % photos.length,
              );
            }}
            className="absolute left-3 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-sm aspect-[4/5] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              className={`object-cover ${photos[lightboxIndex].position}`}
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => ((i ?? 0) + 1) % photos.length);
            }}
            className="absolute right-3 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="absolute bottom-6 text-white/50 text-xs">
            {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
