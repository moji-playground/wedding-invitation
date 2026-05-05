"use client";

import { useState, useEffect } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Heart } from "lucide-react";

export function KakaoMap() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [level, setLevel] = useState(3);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const address = "부산 남구 전포대로 26 삼성힐타워상가 1층";

  useEffect(() => {
    let cancelled = false;

    const tryInit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const kakao = (window as any).kakao;
      if (!kakao || !kakao.maps) return;
      kakao.maps.load(() => {
        if (cancelled) return;
        const geocoder = new kakao.maps.services.Geocoder();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.addressSearch(address, (result: any, status: any) => {
          if (cancelled) return;
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
    };

    // SDK가 이미 로드됐으면 바로 초기화, 아니면 폴링으로 대기
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).kakao?.maps) {
      tryInit();
    } else {
      const interval = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).kakao?.maps) {
          clearInterval(interval);
          tryInit();
        }
      }, 200);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    return () => {
      cancelled = true;
    };
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
            <div className="relative mb-2">
              <div className="bg-foreground text-background text-[10px] font-medium px-2.5 py-1 whitespace-nowrap shadow-md">
                더 S 웨딩홀
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-foreground" />
            </div>
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
