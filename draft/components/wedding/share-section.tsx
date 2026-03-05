"use client"

import { useState, useEffect, useRef } from "react"
import { Share2, Link, Check } from "lucide-react"

export function ShareSection() {
  const [copied, setCopied] = useState(false)
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "현모 & 은지의 결혼식에 초대합니다",
          text: "2026년 6월 6일 토요일 오후 12시 30분, 더 S 웨딩홀",
          url: window.location.href,
        })
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-6 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-md"
          >
            <Share2 className="w-4 h-4" />
            공유하기
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card text-foreground text-sm font-medium border border-border/50 hover:bg-secondary transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
            {copied ? "복사됨" : "링크 복사"}
          </button>
        </div>
      </div>
    </section>
  )
}
