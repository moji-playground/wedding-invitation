"use client";

import { useState, useEffect, useRef } from "react";
import { Share2, Link, Check, MoreHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export function ShareSection() {
  const [copied, setCopied] = useState(false);
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleKakaoShare = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("2e881768d76c32426bc22b208b480679");
      }

      const imageUrl = window.location.origin + "/images/wedding-hero.jpg";
      const currentUrl = window.location.href;

      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "현모 & 은지의 결혼식에 초대합니다",
          description:
            "2026년 6월 6일 토요일 오후 12시 30분\n더 S 웨딩홀 1층 컨벤션홀",
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 브라우저 SDK를 불러오지 못했습니다.");
    }
  };

  const handleMoreShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "현모 & 은지의 결혼식에 초대합니다",
          text: "2026년 6월 6일 토요일 오후 12시 30분, 더 S 웨딩홀",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <section className="px-6 py-10">
      <div
        ref={ref}
        className="flex flex-col items-center gap-4 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <Drawer>
          <DrawerTrigger asChild>
            <button className="w-full max-w-sm flex items-center justify-center gap-2.5 py-4 rounded-2xl border border-foreground/20 text-foreground/80 hover:border-foreground/40 hover:text-foreground hover:bg-foreground/[0.03] transition-all active:scale-[0.98]">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium tracking-widest">
                초대장 공유하기
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="text-center pb-2">
                <DrawerTitle className="font-serif text-xl tracking-wide">
                  공유하기
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-6 pb-12 flex items-start justify-center gap-8">
                {/* Kakao Share */}
                <button
                  onClick={handleKakaoShare}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FEE500] flex items-center justify-center shadow-sm group-hover:-translate-y-1 transition-transform group-active:scale-95 duration-200">
                    <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#000000]">
                      <path
                        fill="currentColor"
                        d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.52 5.6c-.16.56.48 1.04.96.72l6.8-4.48c.24 0 .48.08.72.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z"
                      />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                    카카오톡
                  </span>
                </button>

                {/* Link Copy */}
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-sm group-hover:-translate-y-1 transition-transform group-active:scale-95 duration-200">
                    {copied ? (
                      <Check className="w-6 h-6 text-foreground/70" />
                    ) : (
                      <Link className="w-6 h-6 text-foreground/70" />
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                    {copied ? "복사완료" : "링크 복사"}
                  </span>
                </button>

                {/* More / Native Share */}
                <button
                  onClick={handleMoreShare}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-sm group-hover:-translate-y-1 transition-transform group-active:scale-95 duration-200">
                    <MoreHorizontal className="w-6 h-6 text-foreground/70" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                    더보기
                  </span>
                </button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
