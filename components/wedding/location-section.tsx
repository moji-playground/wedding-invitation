"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Car,
  Train,
  Bus,
  ParkingCircle,
  Phone,
  ChevronDown,
  Info,
} from "lucide-react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Heart } from "lucide-react";

export function LocationSection() {
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

  return (
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Location
          </p>
          <h2 className="font-serif text-xl tracking-wide text-foreground font-medium">
            오시는 길
          </h2>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          {/* Venue info */}
          <div className="bg-card p-6 border border-border/50">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <h3 className="font-serif text-base font-medium text-foreground mb-1">
                  더 S 웨딩홀 1층 컨벤션홀
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  부산광역시 남구 전포대로 26
                  <br />
                  삼성힐타워 1층 (문현동 383-1번지)
                </p>
              </div>
            </div>

            {/* Contact numbers */}
            <div className="mt-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3 h-3 shrink-0" />
                <span>더S웨딩홀 051.711.0777</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3 h-3 shrink-0" />
                <span>더파티 문현점 051.711.0222</span>
              </div>
            </div>

            {/* Map embed */}
            <div className="mt-4 w-full aspect-[16/9] overflow-hidden bg-muted relative">
              <KakaoMap />
            </div>

            {/* Map links */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              <a
                href="https://tmap.life/8855801c"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center [outline:1px_solid_hsl(var(--border)/0.4)] justify-center group-hover:-translate-y-1 transition-transform overflow-hidden">
                  <Image
                    src="/images/icons/tmap.png"
                    alt="티맵"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  티맵
                </span>
              </a>
              <button
                onClick={() => {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const kakao = (window as any).Kakao;
                    if (kakao) {
                      if (!kakao.isInitialized()) {
                        kakao.init("2e881768d76c32426bc22b208b480679");
                      }

                      const isMobile = /iPhone|iPad|iPod|Android/i.test(
                        navigator.userAgent,
                      );

                      if (isMobile && kakao.Navi) {
                        kakao.Navi.share({
                          name: "더 S 웨딩홀",
                          x: 129.0664,
                          y: 35.1432,
                          coordType: "wgs84",
                        });
                      } else {
                        window.open(
                          "https://map.kakao.com/link/to/더%20S%20웨딩홀,35.1432,129.0664",
                          "_blank",
                        );
                      }
                    } else {
                      window.open(
                        "https://map.kakao.com/link/to/더%20S%20웨딩홀,35.1432,129.0664",
                        "_blank",
                      );
                    }
                  } catch (error) {
                    console.error("카카오내비 실행 오류:", error);
                    window.open(
                      "https://map.kakao.com/link/to/더%20S%20웨딩홀,35.1432,129.0664",
                      "_blank",
                    );
                  }
                }}
                type="button"
                className="cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center [outline:1px_solid_hsl(var(--border)/0.4)] justify-center group-hover:-translate-y-1 transition-transform overflow-hidden">
                  <Image
                    src="/images/icons/kakaonavi.png"
                    alt="카카오내비"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  카카오내비
                </span>
              </button>
              <a
                href="https://naver.me/xSFkOZZd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center [outline:1px_solid_hsl(var(--border)/0.4)] justify-center group-hover:-translate-y-1 transition-transform overflow-hidden">
                  <Image
                    src="/images/icons/navermap.png"
                    alt="네이버지도"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  네이버지도
                </span>
              </a>
              <a
                href="https://kko.to/ZC4scFN4U5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center [outline:1px_solid_hsl(var(--border)/0.4)] justify-center group-hover:-translate-y-1 transition-transform overflow-hidden">
                  <Image
                    src="/images/icons/kakaomap.png"
                    alt="카카오맵"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  카카오맵
                </span>
              </a>
            </div>
          </div>

          {/* Transportation */}
          <p className="flex items-center justify-center gap-1.5 text-sm text-foreground/60 text-center">
            <Info className="w-3.5 h-3.5 shrink-0 text-amber-400 -translate-y-[1.5px]" />
            주차 공간이 넉넉하지 않아 대중교통을 추천드려요.
          </p>
          <TransportAccordion />
        </div>
      </div>
    </section>
  );
}

function TransportAccordion() {
  const items = [
    {
      icon: <Train className="w-4 h-4" />,
      title: "지하철 이용시",
      content: (
        <div className="flex flex-col gap-3">
          <p className="text-base text-muted-foreground">
            2호선 문현역 2번 출구, 4번 출구
          </p>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">
              부산역에서 오실 경우
            </p>
            <p className="text-base text-muted-foreground">
              1호선 탑승 → 서면역 하차 → 2호선 환승 → 문현역 하차
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Bus className="w-4 h-4" />,
      title: "시내버스 이용시",
      content: (
        <div className="flex flex-col gap-3">
          <div className="text-base text-muted-foreground">
            <p>24번</p>
            <p>→ 문현 삼성아파트 하차</p>
          </div>
          <div className="text-base text-muted-foreground">
            <p>10, 22, 24, 27, 40, 41, 42,</p>
            <p>68, 83, 83-1, 101, 108, 138, 168번</p>
            <p>→ 문현교차로 하차 (도보 300m)</p>
          </div>
        </div>
      ),
    },
    {
      icon: <Car className="w-4 h-4" />,
      title: "승용차 이용시",
      content: (
        <div className="text-base text-muted-foreground">
          <p>서울·대구 출발</p>
          <p>→ 부산 도시고속도로</p>
          <p>→ 문현램프 우회전 후 50m 직진</p>
        </div>
      ),
    },
    {
      icon: <ParkingCircle className="w-4 h-4" />,
      title: "주차장 이용시",
      content: (
        <p className="text-base text-muted-foreground">
          삼성힐타워 아파트 지하1층 주차장
          <br />
          (지하철 4번 출구 지나서 우회전)
        </p>
      ),
    },
  ];

  return (
    <div className="border border-border/50 divide-y divide-border/50">
      {items.map((item) => (
        <TransportItem key={item.title} {...item} />
      ))}
    </div>
  );
}

function TransportItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 leading-relaxed">{content}</div>
        </div>
      </div>
    </div>
  );
}

function KakaoMap() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [level, setLevel] = useState(3);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const address = "부산 남구 전포대로 26 삼성힐타워상가 1층";

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).kakao;
    if (!kakao || !kakao.maps) return;

    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const pos = {
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          };
          setPosition(pos);
          setCenter(pos);
        }
      });
    });
  }, []);

  const handleReset = () => {
    if (position) {
      setCenter({ ...position });
      setLevel(3);
    }
  };

  if (!position || !center) {
    return (
      <div className="w-full aspect-3/2 bg-muted flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        위치 정보 로드 중...
      </div>
    );
  }

  return (
    <div className="w-full aspect-3/2 overflow-hidden relative">
      <Map
        center={center}
        onCenterChanged={(map) =>
          setCenter({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        }
        style={{ width: "100%", height: "100%" }}
        level={level}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <CustomOverlayMap position={position} yAnchor={1}>
          <div className="flex flex-col items-center">
            {/* 말풍선 라벨 */}
            <div className="relative mb-2">
              <div className="bg-foreground text-background text-[10px] font-medium px-2.5 py-1 whitespace-nowrap shadow-md">
                더 S 웨딩홀
              </div>
              {/* 꼬리 */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-foreground" />
            </div>
            {/* 마커 핀 */}
            <div className="relative flex flex-col items-center">
              <div className="absolute top-2 w-8 h-8 bg-neutral-400 rounded-full animate-ping opacity-25 animation-duration-[2s]" />
              <div className="relative z-10">
                <svg
                  width="30"
                  height="38"
                  viewBox="0 0 36 44"
                  className="drop-shadow-lg"
                >
                  <path
                    d="M18 0C8.05882 0 0 8.05882 0 18C0 23.5 6 32 18 44C30 32 36 23.5 36 18C36 8.05882 27.9412 0 18 0Z"
                    fill="#333333"
                    stroke="none"
                  />
                  <foreignObject x="10" y="10" width="20" height="20">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </foreignObject>
                </svg>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      </Map>
      {/* 커스텀 줌 + 초기화 버튼 */}
      <div className="absolute top-2 right-2 z-10 flex flex-col">
        <button
          onClick={() => setLevel((l) => Math.max(1, l - 1))}
          className="w-7 h-7 bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground text-sm border-b border-border/30 hover:bg-white transition-colors"
          aria-label="확대"
        >
          +
        </button>
        <button
          onClick={() => setLevel((l) => Math.min(14, l + 1))}
          className="w-7 h-7 bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground text-sm border-b border-border/30 hover:bg-white transition-colors"
          aria-label="축소"
        >
          −
        </button>
        <button
          onClick={handleReset}
          className="w-7 h-7 bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-colors"
          aria-label="위치 초기화"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
