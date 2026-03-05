"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Check } from "lucide-react"

export function RsvpSection() {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null)
  const [name, setName] = useState("")
  const [guests, setGuests] = useState("1")
  const [meal, setMeal] = useState<"yes" | "no">("yes")
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="px-6 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-serif text-lg text-foreground font-medium">
            감사합니다
          </h3>
          <p className="text-sm text-muted-foreground">
            참석 여부가 전달되었습니다.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
          참석 여부
        </h2>

        <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-xs">
          축하의 마음으로 참석해 주시는 모든 분들을
          <br />
          소중히 모실 수 있도록 회신 부탁드립니다.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rsvp-name" className="text-sm font-medium text-foreground">
              성함
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="성함을 입력해 주세요"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              required
            />
          </div>

          {/* Attending */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">참석 여부</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAttending("yes")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                  attending === "yes"
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border/50 hover:border-primary/30"
                }`}
              >
                참석
              </button>
              <button
                type="button"
                onClick={() => setAttending("no")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                  attending === "no"
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border/50 hover:border-primary/30"
                }`}
              >
                불참
              </button>
            </div>
          </div>

          {/* Number of guests */}
          {attending === "yes" && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="rsvp-guests" className="text-sm font-medium text-foreground">
                  동행 인원 (본인 포함)
                </label>
                <select
                  id="rsvp-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}명
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-foreground">식사 여부</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setMeal("yes")}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                      meal === "yes"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card text-foreground border-border/50 hover:border-primary/30"
                    }`}
                  >
                    식사함
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeal("no")}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                      meal === "no"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card text-foreground border-border/50 hover:border-primary/30"
                    }`}
                  >
                    식사 안함
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!name || !attending}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            전송하기
          </button>
        </form>
      </div>
    </section>
  )
}
