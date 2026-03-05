"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    requestAnimationFrame(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
  }, [])

  return (
    <section className="relative flex flex-col items-center px-6 pt-12 pb-8">
      {/* Floral hero image */}
      <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden mb-8">
        <Image
          src="/images/wedding-hero.jpg"
          alt="웨딩 플로럴 장식"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div ref={ref} className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm tracking-[0.3em] text-muted-foreground font-light uppercase">
          Wedding Invitation
        </p>

        <div className="flex items-center gap-4">
          <span className="font-serif text-3xl font-medium text-foreground">현모</span>
          <span className="text-primary text-2xl font-serif">&</span>
          <span className="font-serif text-3xl font-medium text-foreground">은지</span>
        </div>

        <div className="w-12 h-px bg-primary/40 my-2" />

        <p className="font-serif text-base text-muted-foreground leading-relaxed">
          2026년 6월 6일 토요일 오후 12시 30분
        </p>
        <p className="text-sm text-muted-foreground">
          더 S 웨딩홀 1층 컨벤션홀
        </p>
      </div>
    </section>
  )
}
