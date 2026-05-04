"use client";

import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";

export function PhotoboothSection() {
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

  return (
    <section className="px-6 py-14">
      <div ref={ref} className="flex flex-col items-center gap-6">
        <div
          data-animate
          className="flex flex-col items-center gap-3 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          <Camera className="w-5 h-5 text-muted-foreground" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Photobooth
            </p>
            <h2 className="font-serif text-xl tracking-wide text-foreground font-medium">
              포토 부스
            </h2>
          </div>
        </div>

        <div
          data-animate
          className="bg-card border border-border/50 max-w-sm w-full flex flex-col opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          {/* 이용 시간 */}
          <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground tracking-wide">
              이용 시간
            </p>
            <div className="text-right">
              <p className="font-serif text-xl font-medium text-foreground tracking-wide">
                11:30 ~ 12:30
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                예식 시작 1시간 전부터 이용 가능합니다
              </p>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="px-6 py-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              추억을 나누고 싶어 포토부스를 준비했습니다.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 break-keep">
              사진은 두 장이 출력되며, 한 장은 오늘의 기억으로 간직하실 수 있고,
              포토 방명록도 옆에 마련되어 있으니 사진 한 장과 함께 축하의 메시지
              남겨주시면 더없이 감사하겠습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
