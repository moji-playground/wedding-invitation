"use client"

import { useEffect, useRef } from "react"
import { Camera } from "lucide-react"

export function PhotoboothSection() {
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

  return (
    <section className="px-6 py-14">
      <div
        ref={ref}
        className="flex flex-col items-center gap-6 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Camera className="w-6 h-6 text-primary" />
        </div>

        <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
          Photo Booth
        </h2>

        <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm max-w-sm w-full text-center flex flex-col gap-4">
          <p className="font-serif text-base text-foreground/80 leading-relaxed">
            결혼식장에 포토부스가 준비되어 있습니다.
            <br />
            소중한 순간을 사진으로 남겨주세요!
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground tracking-wide">이용 시간</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="bg-secondary/60 rounded-xl py-4 px-6">
            <p className="text-2xl font-serif font-medium text-foreground tracking-wide">
              11:30 ~ 12:30
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              예식 시작 1시간 전부터 이용 가능합니다
            </p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            하객 여러분 모두 자유롭게 이용해 주세요
          </p>
        </div>
      </div>
    </section>
  )
}
