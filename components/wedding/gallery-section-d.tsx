"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    src: "/images/photo7.jpeg",
    alt: "커플 사진 1",
    position: "object-top",
    ratio: "portrait",
  },
  {
    src: "/images/photo1.jpeg",
    alt: "커플 사진 2",
    position: "object-top",
    ratio: "landscape",
  },
  {
    src: "/images/photo9.jpeg",
    alt: "커플 사진 3",
    position: "object-top",
    ratio: "portrait",
  },
  {
    src: "/images/photo2.jpeg",
    alt: "커플 사진 4",
    position: "object-center scale-180",
    ratio: "landscape",
  },
  {
    src: "/images/photo5.jpeg",
    alt: "커플 사진 5",
    position: "object-right",
    ratio: "landscape",
  },
  {
    src: "/images/photo8.jpeg",
    alt: "커플 사진 6",
    position: "object-center",
    ratio: "portrait",
  },
  {
    src: "/images/photo6.jpeg",
    alt: "커플 사진 7",
    position: "object-center",
    ratio: "portrait",
  },
  {
    src: "/images/photo4.jpeg",
    alt: "커플 사진 8",
    position: "object-center",
    ratio: "portrait",
  },
];

export function GallerySectionD() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
  const next = () => setLightboxIndex((i) => ((i ?? 0) + 1) % photos.length);

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
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [lightboxIndex]);

  const open = (i: number) => setLightboxIndex(i);

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
          </div>

          <div className="w-full max-w-sm px-4 flex flex-col gap-1">
            {/* Row 1: 세로 2분할 */}
            <div className="flex gap-1" style={{ height: 180 }}>
              <button
                onClick={() => open(0)}
                className="relative overflow-hidden group"
                style={{ flex: 1 }}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[0].position}`}
                />
              </button>
              <button
                onClick={() => open(2)}
                className="relative overflow-hidden group"
                style={{ flex: 1 }}
              >
                <Image
                  src={photos[2].src}
                  alt={photos[2].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[2].position}`}
                />
              </button>
            </div>

            {/* Row 2: 가로 풀 width */}
            <button
              onClick={() => open(3)}
              className="relative w-full overflow-hidden group"
              style={{ aspectRatio: "3/2" }}
            >
              <Image
                src={photos[3].src}
                alt={photos[3].alt}
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[3].position}`}
              />
            </button>

            {/* Row 3: 가로 2분할 */}
            <div className="flex gap-1" style={{ height: 180 }}>
              <button
                onClick={() => open(1)}
                className="relative overflow-hidden group"
                style={{ flex: 1 }}
              >
                <Image
                  src={photos[1].src}
                  alt={photos[1].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[1].position}`}
                />
              </button>
              <button
                onClick={() => open(4)}
                className="relative overflow-hidden group"
                style={{ flex: 1 }}
              >
                <Image
                  src={photos[4].src}
                  alt={photos[4].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[4].position}`}
                />
              </button>
            </div>

            {/* Row 4: 세로 크게 + 세로 2장 스택 */}
            <div className="flex gap-1" style={{ height: 320 }}>
              <button
                onClick={() => open(5)}
                className="relative overflow-hidden group"
                style={{ flex: 1.5 }}
              >
                <Image
                  src={photos[5].src}
                  alt={photos[5].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[5].position}`}
                />
              </button>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <button
                  onClick={() => open(6)}
                  className="relative overflow-hidden group"
                  style={{ flex: 1 }}
                >
                  <Image
                    src={photos[6].src}
                    alt={photos[6].alt}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[6].position}`}
                  />
                </button>
                <button
                  onClick={() => open(7)}
                  className="relative overflow-hidden group"
                  style={{ flex: 1 }}
                >
                  <Image
                    src={photos[7].src}
                    alt={photos[7].alt}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[7].position}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => {
            e.stopPropagation();
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) {
              if (dx < 0) next();
              else prev();
            }
            touchStartX.current = null;
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors drop-shadow-md"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors drop-shadow-md"
            aria-label="이전"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="relative max-w-sm w-full max-h-[80vh] flex items-center justify-center">
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              width={800}
              height={1200}
              className="object-contain max-h-[80vh] w-auto"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors drop-shadow-md"
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
