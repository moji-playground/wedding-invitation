"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";

const JUNE_2026 = {
  year: 2026,
  month: "6",
  days: ["일", "월", "화", "수", "목", "금", "토"],
  // June 2026 starts on Monday (index 1)
  startDay: 1,
  totalDays: 30,
  weddingDay: 6,
};

export function CalendarSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const blanks = Array.from({ length: JUNE_2026.startDay }, (_, i) => i);
  const days = Array.from({ length: JUNE_2026.totalDays }, (_, i) => i + 1);

  return (
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="font-serif text-primary text-sm tracking-widest uppercase">
            Calendar
          </p>
          <h2 className="font-serif text-xl tracking-wide text-foreground">
            {JUNE_2026.year}년 {JUNE_2026.month}월
          </h2>
        </div>

        <div className="w-full max-w-sm">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-4 border-y border-border/50 py-3">
            {JUNE_2026.days.map((day, i) => (
              <div
                key={day}
                className={`text-center text-xs tracking-widest ${
                  i === 0
                    ? "text-primary/80"
                    : i === 6
                      ? "text-accent-foreground/80"
                      : "text-muted-foreground/80"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-4 gap-x-1">
            {blanks.map((i) => (
              <div key={`blank-${i}`} />
            ))}
            {days.map((day) => {
              const isWedding = day === JUNE_2026.weddingDay;
              const dayOfWeek = (JUNE_2026.startDay + day - 1) % 7;
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;

              return (
                <div
                  key={day}
                  className="relative flex items-center justify-center"
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 text-sm rounded-full transition-all duration-500 ${
                      isWedding
                        ? "bg-primary text-primary-foreground font-serif text-base"
                        : isSunday
                          ? "text-primary/80 font-serif"
                          : isSaturday
                            ? "text-accent-foreground/80 font-serif"
                            : "text-foreground font-serif"
                    }`}
                  >
                    {day}
                  </div>
                  {isWedding && (
                    <div className="absolute -top-3 flex justify-center w-full animate-bounce">
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Wedding info details below calendar */}
          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col items-center gap-2">
            <p className="font-serif text-lg text-foreground">
              6월 6일 토요일 오후 12시 30분
            </p>
            <DdayText />
          </div>
        </div>
      </div>
    </section>
  );
}

function DdayText() {
  const weddingDate = new Date(2026, 5, 6, 12, 30, 0); // June is month 5 (0-indexed)
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

  return (
    <p className="text-sm text-muted-foreground mt-1">
      현모와 은지의 결혼식이{" "}
      <span className="text-primary font-medium">{daysLeft}일</span> 남았습니다.
    </p>
  );
}
