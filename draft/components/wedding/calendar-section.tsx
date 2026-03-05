"use client"

import { useEffect, useRef } from "react"

const JUNE_2026 = {
  year: 2026,
  month: "6",
  days: ["일", "월", "화", "수", "목", "금", "토"],
  // June 2026 starts on Monday (index 1)
  startDay: 1,
  totalDays: 30,
  weddingDay: 6,
}

export function CalendarSection() {
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

  const blanks = Array.from({ length: JUNE_2026.startDay }, (_, i) => i)
  const days = Array.from({ length: JUNE_2026.totalDays }, (_, i) => i + 1)

  return (
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
          예식 일시
        </h2>

        <div className="bg-card rounded-2xl p-6 w-full max-w-sm border border-border/50 shadow-sm">
          {/* Month header */}
          <div className="text-center mb-4">
            <p className="font-serif text-xl text-foreground font-medium">
              {JUNE_2026.year}년 {JUNE_2026.month}월
            </p>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {JUNE_2026.days.map((day, i) => (
              <div
                key={day}
                className={`text-center text-xs font-medium py-1 ${
                  i === 0 ? "text-primary" : i === 6 ? "text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {blanks.map((i) => (
              <div key={`blank-${i}`} />
            ))}
            {days.map((day) => {
              const isWedding = day === JUNE_2026.weddingDay
              const dayOfWeek = (JUNE_2026.startDay + day - 1) % 7
              const isSunday = dayOfWeek === 0
              const isSaturday = dayOfWeek === 6

              return (
                <div
                  key={day}
                  className={`text-center text-sm py-2 rounded-full transition-all duration-300 ${
                    isWedding
                      ? "bg-primary text-primary-foreground font-bold scale-110 shadow-md"
                      : isSunday
                        ? "text-primary/70"
                        : isSaturday
                          ? "text-accent-foreground/70"
                          : "text-foreground/70"
                  }`}
                >
                  {day}
                </div>
              )
            })}
          </div>

          {/* Wedding info */}
          <div className="mt-6 pt-4 border-t border-border/50 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-medium">2026년 6월 6일 토요일</span>
            </div>
            <p className="text-sm text-muted-foreground">오후 12시 30분</p>
          </div>
        </div>

        {/* D-day counter */}
        <DdayCounter />
      </div>
    </section>
  )
}

function DdayCounter() {
  const weddingDate = new Date(2026, 5, 6, 12, 30, 0) // June is month 5 (0-indexed)
  const now = new Date()
  const diff = weddingDate.getTime() - now.getTime()
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))

  return (
    <div className="flex items-center gap-6 bg-card rounded-xl px-6 py-4 border border-border/50">
      <div className="text-center">
        <p className="text-2xl font-serif font-bold text-primary">{daysLeft}</p>
        <p className="text-xs text-muted-foreground mt-1">일 남음</p>
      </div>
    </div>
  )
}
