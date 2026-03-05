"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const photos = [
  { src: "/images/couple-1.jpg", alt: "커플 사진 1" },
  { src: "/images/couple-2.jpg", alt: "커플 사진 2" },
  { src: "/images/couple-3.jpg", alt: "커플 사진 3" },
]

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0")
          entry.target.classList.remove("opacity-0", "translate-y-6")
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const nextPhoto = () => setCurrentIndex((i) => (i + 1) % photos.length)
  const prevPhoto = () => setCurrentIndex((i) => (i - 1 + photos.length) % photos.length)

  return (
    <>
      <section className="px-6 py-16">
        <div
          ref={ref}
          className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
            갤러리
          </h2>

          {/* Main carousel */}
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              className="object-cover cursor-pointer transition-transform duration-500"
              onClick={() => setIsOpen(true)}
            />

            <button
              onClick={prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:bg-background/80 transition-colors"
              aria-label="이전 사진"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:bg-background/80 transition-colors"
              aria-label="다음 사진"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  i === currentIndex
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                    : "opacity-60 hover:opacity-90"
                }`}
                aria-label={`사진 ${i + 1} 보기`}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="사진 확대 보기"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  )
}
