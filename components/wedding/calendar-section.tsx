"use client";

import { useEffect, useRef } from "react";
import { CalendarPlus } from "lucide-react";

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

  const blanks = Array.from({ length: JUNE_2026.startDay }, (_, i) => i);
  const days = Array.from({ length: JUNE_2026.totalDays }, (_, i) => i + 1);

  return (
    <section className="px-6 py-16">
      <div ref={ref} className="flex flex-col items-center gap-8">
        <div
          data-animate
          className="flex flex-col items-center gap-2 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          <p className="font-serif text-primary text-sm tracking-widest uppercase">
            Calendar
          </p>
          <h2 className="font-serif text-xl tracking-wide text-foreground">
            {JUNE_2026.year}년 {JUNE_2026.month}월
          </h2>
        </div>

        <div
          data-animate
          className="w-full max-w-sm opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
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
                    className={`flex items-center justify-center w-9 h-9 text-sm rounded-full transition-all duration-700 shadow-sm ${
                      isWedding
                        ? "bg-primary text-primary-foreground font-serif text-base font-bold scale-110"
                        : isSunday
                          ? "text-primary/80 font-serif"
                          : isSaturday
                            ? "text-accent-foreground/80 font-serif"
                            : "text-foreground font-serif"
                    }`}
                  >
                    {day}
                  </div>
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
            <div className="flex gap-2 mt-3">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=현모+%26+은지+결혼식&dates=20260606T033000Z/20260606T043000Z&details=더+S+웨딩홀+1층+컨벤션홀&location=W웨딩+더S웨딩홀%2C+대한민국+부산광역시+남구+전포대로+26"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground border border-border/60 hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                <CalendarPlus className="w-3 h-3" />
                구글 캘린더
              </a>
              <button
                onClick={() => {
                  const ics = [
                    "BEGIN:VCALENDAR",
                    "VERSION:2.0",
                    "BEGIN:VEVENT",
                    "DTSTART:20260606T123000",
                    "DTEND:20260606T133000",
                    "SUMMARY:현모 & 은지 결혼식",
                    "LOCATION:부산광역시 남구 전포대로 26 더 S 웨딩홀 1층 컨벤션홀",
                    "DESCRIPTION:현모 & 은지의 결혼식에 초대합니다.",
                    "END:VEVENT",
                    "END:VCALENDAR",
                  ].join("\r\n");
                  const blob = new Blob([ics], { type: "text/calendar" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "wedding.ics";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground border border-border/60 hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                <CalendarPlus className="w-3 h-3" />
                애플 캘린더
              </button>
            </div>
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
    <p className="text-xl font-serif text-primary font-bold mt-2 tracking-tighter">
      D-{daysLeft}
    </p>
  );
}
