"use client"

import { useEffect, useRef } from "react"

export function GreetingSection() {
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
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 text-center opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
          초대합니다
        </h2>

        <p className="font-serif text-base text-foreground/80 leading-[2] max-w-sm">
          사랑과 신뢰로 한 걸음 한 걸음
          <br />
          서로의 인생에 다가선 두 사람이
          <br />
          이제 하나가 되어
          <br />
          새로운 시작을 하려 합니다.
          <br />
          <br />
          귀한 걸음으로 오셔서
          <br />
          축복해 주시고 함께해 주세요.
        </p>

        <div className="flex flex-col gap-3 text-sm text-muted-foreground mt-4">
          <p>
            <span className="text-foreground font-medium">정원봉</span>
            {" · "}
            <span className="text-foreground font-medium">임금미</span>
            <span className="ml-1">의 아들</span>
            <span className="text-foreground font-semibold ml-2">정현모</span>
          </p>
          <p>
            <span className="text-foreground font-medium">김태훈</span>
            {" · "}
            <span className="text-foreground font-medium">박인숙</span>
            <span className="ml-1">의 딸</span>
            <span className="text-foreground font-semibold ml-2">김은지</span>
          </p>
        </div>
      </div>
    </section>
  )
}
