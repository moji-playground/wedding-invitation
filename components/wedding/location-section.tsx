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

function KakaoMap() {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
        .root_daum_roughmap { width: 100% !important; height: 100% !important; }
        .wrap_map { width: 100% !important; height: 100% !important; }
      </style>
    </head>
    <body>
      <div id="daumRoughmapContainer1772794998650" class="root_daum_roughmap root_daum_roughmap_landing"></div>
      <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
      <script charset="UTF-8">
        new daum.roughmap.Lander({
          "timestamp" : "1772794998650",
          "key" : "ihjaszgf92x",
          "mapWidth" : "100%",
          "mapHeight" : "100%"
        }).render();
      </script>
    </body>
    </html>
  `;

  return (
    <iframe
      srcDoc={htmlContent}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title="더 S 웨딩홀 카카오맵 위치"
    />
  );
}
