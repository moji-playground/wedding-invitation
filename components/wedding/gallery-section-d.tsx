"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// photo1, photo3, photo6: 세로 (2:3)
// photo2, photo4, photo5: 가로 (3:2)
const photos = [
  {
    src: "/images/photo1.jpeg",
    alt: "커플 사진 1",
    position: "object-center",
    ratio: "portrait",
  },
  {
    src: "/images/photo2.jpeg",
    alt: "커플 사진 2",
    position: "object-center",
    ratio: "landscape",
  },
  {
    src: "/images/photo3.jpeg",
    alt: "커플 사진 3",
    position: "object-center",
    ratio: "portrait",
  },
  {
    src: "/images/photo4.jpeg",
    alt: "커플 사진 4",
    position: "object-center",
    ratio: "landscape",
  },
  {
    src: "/images/photo5.jpeg",
    alt: "커플 사진 5",
    position: "object-right",
    ratio: "landscape",
  },
  {
    src: "/images/photo6.jpeg",
    alt: "커플 사진 6",
    position: "object-center",
    ratio: "portrait",
  },
];

export function GallerySectionD() {
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
            {/* Row 1: 세로(1) 크게 왼쪽 + 가로(2) 위 / 세로(3) 아래 오른쪽 */}
            <div className="flex gap-1" style={{ height: 280 }}>
              {/* photo1: 세로, 2/3 너비 */}
              <button
                onClick={() => open(0)}
                className="relative overflow-hidden group"
                style={{ flex: 2 }}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[0].position}`}
                />
              </button>
              {/* 오른쪽 열: 가로(photo2) 위 + 세로(photo6) 아래 */}
              <div className="flex flex-col gap-1" style={{ flex: 1.2 }}>
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
              </div>
            </div>

            {/* Row 2: 가로(photo4) 풀 width — 실제 3:2 비율로 */}
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

            {/* Row 3: 세로(photo3) + 가로(photo5) — 실제 비율 반영 */}
            <div className="flex gap-1" style={{ height: 220 }}>
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
              <button
                onClick={() => open(4)}
                className="relative overflow-hidden group"
                style={{ flex: 1.5 }}
              >
                <Image
                  src={photos[4].src}
                  alt={photos[4].alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photos[4].position}`}
                />
              </button>
            </div>
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
            className="relative w-full max-w-sm overflow-hidden"
            style={{
              aspectRatio:
                photos[lightboxIndex].ratio === "portrait" ? "2/3" : "3/2",
            }}
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
