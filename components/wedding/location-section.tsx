"use client";

import { useEffect, useRef } from "react";
import { MapPin, Car, Train, Bus, ParkingCircle, Phone } from "lucide-react";

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
        <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
          오시는 길
        </h2>

        <div className="w-full max-w-sm flex flex-col gap-4">
          {/* Venue info */}
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
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
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 shrink-0" />
                <span>더S웨딩홀 051.711.0777</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 shrink-0" />
                <span>더파티 문현점 051.711.0222</span>
              </div>
            </div>

            {/* Map embed - Kakao Map */}
            <div className="mt-4 w-full aspect-[16/9] rounded-xl overflow-hidden bg-muted relative">
              <KakaoMap />
            </div>

            {/* Map links */}
            <div className="mt-4 flex gap-2">
              <a
                href="https://naver.me/xSFkOZZd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
              >
                네이버 지도
              </a>
              <a
                href="https://kko.to/ZC4scFN4U5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
              >
                카카오맵
              </a>
            </div>
          </div>

          {/* Transportation */}
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col gap-5">
            <TransportItem
              icon={<Train className="w-4 h-4" />}
              title="지하철 이용시"
              lines={[
                "2호선 문현역 2번 출구, 4번 출구",
                "부산역에서 오실 경우: 1호선 탑승 -> 서면역 하차 -> 2호선 환승 -> 문현역 하차",
              ]}
            />
            <TransportItem
              icon={<Bus className="w-4 h-4" />}
              title="시내버스 이용시"
              lines={[
                "24번 -> 문현 삼성아파트 하차",
                "10, 22, 24, 27, 40, 41, 42, 68, 83, 83-1, 101, 108, 138, 168번 -> 문현교차로 하차 도보 300m",
              ]}
            />
            <TransportItem
              icon={<Car className="w-4 h-4" />}
              title="승용차 이용시"
              desc="서울, 대구 출발 -> 부산 도시고속도로 -> 문현램프에서 내려 우회전후 50m 직진"
            />
            <TransportItem
              icon={<ParkingCircle className="w-4 h-4" />}
              title="주차장 이용시"
              desc="삼성힐타워 아파트 지하1층 주차장 (지하철 4번 출구 지나서 우회전)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TransportItem({
  icon,
  title,
  desc,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  lines?: string[];
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {desc && (
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
            {desc}
          </p>
        )}
        {lines && (
          <div className="flex flex-col gap-1 mt-1">
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from "react";
import { Heart } from "lucide-react";

function KakaoMap() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const address = "부산 남구 전포대로 26 삼성힐타워상가 1층";

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao || !kakao.maps) return;

    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setPosition({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
        }
      });
    });
  }, []);

  if (!position) {
    return (
      <div className="w-full aspect-[16/9] bg-muted rounded-xl flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        위치 정보 로드 중...
      </div>
    );
  }

  return (
    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden relative shadow-inner">
      <Map
        center={position}
        style={{ width: "100%", height: "100%" }}
        level={3} // 조금 더 확대해서 상세히 보이게 수정
      >
        <CustomOverlayMap position={position} yAnchor={1}>
          <div className="flex flex-col items-center">
            {/* Integrated Seamless Pin Shape */}
            <div className="relative flex flex-col items-center group">
              {/* Ping animation effect */}
              <div className="absolute top-2 w-8 h-8 bg-rose-400 rounded-full animate-ping opacity-25" />

              <div className="relative z-10">
                {/* SVG Pin Shape (Integrated) */}
                <svg
                  width="30"
                  height="38"
                  viewBox="0 0 36 44"
                  className="drop-shadow-lg"
                >
                  <path
                    d="M18 0C8.05882 0 0 8.05882 0 18C0 23.5 6 32 18 44C30 32 36 23.5 36 18C36 8.05882 27.9412 0 18 0Z"
                    fill="#f27489ff" // rose-500
                    stroke="white"
                    strokeWidth="2"
                  />
                  <foreignObject x="10" y="10" width="20" height="20">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </foreignObject>
                </svg>
              </div>
            </div>

            {/* Label - More compact and clean */}
            <div className="bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-lg mt-1 text-[10px] font-medium border-2 border-rose-200 whitespace-nowrap">
              더 S 웨딩홀
            </div>
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
}
