"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import photo7 from "@/public/images/photo7.jpeg";
import photo1 from "@/public/images/photo1.jpeg";
import photo9 from "@/public/images/photo9.jpeg";
import photo2 from "@/public/images/photo2.jpeg";
import photo5 from "@/public/images/photo5.jpeg";
import photo8 from "@/public/images/photo8.jpeg";
import photo6 from "@/public/images/photo6.jpeg";
import photo4 from "@/public/images/photo4.jpeg";

interface Photo {
  src: StaticImageData;
  alt: string;
  position: string;
}

const photos: Photo[] = [
  { src: photo7, alt: "커플 사진 1", position: "object-top" },
  { src: photo1, alt: "커플 사진 2", position: "object-top" },
  { src: photo9, alt: "커플 사진 3", position: "object-top" },
  { src: photo2, alt: "커플 사진 4", position: "object-center scale-180" },
  { src: photo5, alt: "커플 사진 5", position: "object-right" },
  { src: photo8, alt: "커플 사진 6", position: "object-center" },
  { src: photo6, alt: "커플 사진 7", position: "object-center" },
  { src: photo4, alt: "커플 사진 8", position: "object-center" },
];

function LightboxImage({ photo, visible }: { photo: Photo; visible: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={visible ? "contents" : "hidden"}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={800}
        height={1200}
        placeholder="blur"
        onLoad={() => setLoaded(true)}
        className={`object-contain max-h-[80vh] w-auto transition-all duration-500 ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"}`}
      />
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  position,
  onClick,
}: Photo & { onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden group w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-all duration-700 group-hover:scale-105 ${position} ${loaded ? "blur-0" : "blur-lg"}`}
      />
    </button>
  );
}

export function GallerySectionD() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(
    () =>
      setLightboxIndex(
        ((lightboxIndex ?? 0) - 1 + photos.length) % photos.length,
      ),
    [lightboxIndex],
  );
  const next = useCallback(
    () => setLightboxIndex(((lightboxIndex ?? 0) + 1) % photos.length),
    [lightboxIndex],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const children =
          ref.current?.querySelectorAll<HTMLElement>("[data-animate]");
        children?.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-6");
          }, i * 120);
        });
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
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
  }, [lightboxIndex, next, prev]);

  const open = (i: number) => setLightboxIndex(i);

  return (
    <>
      <section className="py-16">
        <div ref={ref} className="flex flex-col items-center gap-8">
          <div
            data-animate
            className="flex flex-col items-center gap-1 px-6 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
          >
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
              Gallery
            </p>
          </div>

          <div className="w-full max-w-sm px-4 flex flex-col gap-1">
            {/* Row 1 */}
            <div
              data-animate
              className="flex gap-1 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
              style={{ height: 180 }}
            >
              <div style={{ flex: 1 }}>
                <GalleryImage {...photos[0]} onClick={() => open(0)} />
              </div>
              <div style={{ flex: 1 }}>
                <GalleryImage {...photos[2]} onClick={() => open(2)} />
              </div>
            </div>

            {/* Row 2 */}
            <div
              data-animate
              className="w-full opacity-0 translate-y-6 transition-all duration-1000 ease-out"
              style={{ aspectRatio: "3/2" }}
            >
              <GalleryImage {...photos[3]} onClick={() => open(3)} />
            </div>

            {/* Row 3 */}
            <div
              data-animate
              className="flex gap-1 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
              style={{ height: 180 }}
            >
              <div style={{ flex: 1 }}>
                <GalleryImage {...photos[1]} onClick={() => open(1)} />
              </div>
              <div style={{ flex: 1 }}>
                <GalleryImage {...photos[4]} onClick={() => open(4)} />
              </div>
            </div>

            {/* Row 4 */}
            <div
              data-animate
              className="flex gap-1 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
              style={{ height: 320 }}
            >
              <div style={{ flex: 1.5 }}>
                <GalleryImage {...photos[5]} onClick={() => open(5)} />
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <GalleryImage {...photos[6]} onClick={() => open(6)} />
                </div>
                <div style={{ flex: 1 }}>
                  <GalleryImage {...photos[7]} onClick={() => open(7)} />
                </div>
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
            if (Math.abs(dx) > 70) {
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
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="relative max-w-sm w-full max-h-[80vh] flex items-center justify-center">
            {photos.map((photo, i) => (
              <LightboxImage
                key={photo.src.src}
                photo={photo}
                visible={i === lightboxIndex}
              />
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
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
