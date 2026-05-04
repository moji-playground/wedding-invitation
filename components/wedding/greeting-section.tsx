"use client";

import { useEffect, useRef } from "react";

export function GreetingSection() {
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
    <section className="px-6 py-16">
      <div ref={ref} className="flex flex-col items-center gap-8 text-center">
        <h2
          data-animate
          className="font-serif text-lg tracking-wide text-primary font-medium opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          초대합니다
        </h2>

        <div className="font-serif text-base text-foreground/80 leading-[2] max-w-sm flex flex-col gap-0">
          <p
            data-animate
            className="opacity-0 translate-y-6 transition-all duration-1000 ease-out"
          >
            함께여서 더 빛났던 시간들이
            <br />
            이제 하나의 약속이 되었습니다.
          </p>
          <p
            data-animate
            className="opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-6"
          >
            2021년 겨울, 저희 둘은 처음 만나
            <br />
            인연을 맺었습니다.
            <br />
            함께한 시간이 쌓여 어느새 지금에 이르렀고,
            <br />
            이제 평생을 함께하기로 했습니다.
          </p>
          <p
            data-animate
            className="opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-6"
          >
            이 소중한 여정에 특별한 당신을 초대합니다.
            <br />
            귀한 걸음으로 자리를 빛내주세요.
          </p>
        </div>

        <div
          data-animate
          className="grid grid-cols-[auto_auto_auto] gap-x-2 gap-y-3 text-sm text-muted-foreground mt-4 items-baseline *:text-left opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          <span className="text-foreground font-medium whitespace-nowrap">
            정원봉 · 임금미
          </span>
          <span className="whitespace-nowrap">의 아들</span>
          <span className="text-foreground font-semibold whitespace-nowrap">
            정현모
          </span>
          <span className="text-foreground font-medium whitespace-nowrap">
            김태훈 · 박인숙
          </span>
          <span className="whitespace-nowrap">의 딸</span>
          <span className="text-foreground font-semibold whitespace-nowrap">
            김은지
          </span>
        </div>
      </div>
    </section>
  );
}
