"use client";

import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (
        id: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: YTEvent) => void;
            onStateChange?: (e: YTEvent) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
  }
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "Mxqoxg7dUGY",
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: "Mxqoxg7dUGY",
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
          },
          onStateChange: (e) => {
            setPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    const handleSplashPlay = () => {
      if (playerRef.current) {
        playerRef.current.setVolume(60);
        playerRef.current.playVideo();
      }
    };
    window.addEventListener("splash-play-music", handleSplashPlay);

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
      window.removeEventListener("splash-play-music", handleSplashPlay);
    };
  }, []);

  const toggle = () => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.setVolume(60);
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* 숨겨진 유튜브 플레이어 */}
      <div className="fixed -top-full -left-full w-1 h-1 overflow-hidden">
        <div id="yt-player" />
      </div>

      {/* 플레이어 버튼 */}
      <button
        onClick={toggle}
        disabled={!ready}
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2 px-2.5 py-1.5 bg-white/15 backdrop-blur-md shadow-sm hover:bg-white/25 transition-all active:scale-95 disabled:opacity-40"
        aria-label={playing ? "음악 정지" : "음악 재생"}
      >
        <Music
          className={`w-3 h-3 text-foreground/60 shrink-0 ${playing ? "animate-bounce" : ""}`}
        />
        <span className="text-[11px] text-foreground/60 tracking-wide whitespace-nowrap">
          Flower — 오반
        </span>
        {/* 재생 중 파형 애니메이션 */}
        {playing && (
          <div className="flex items-end gap-px h-3">
            <span
              className="w-px bg-muted-foreground/60 animate-[wave_0.8s_ease-in-out_infinite]"
              style={{ height: "40%" }}
            />
            <span
              className="w-px bg-muted-foreground/60 animate-[wave_0.8s_ease-in-out_0.15s_infinite]"
              style={{ height: "100%" }}
            />
            <span
              className="w-px bg-muted-foreground/60 animate-[wave_0.8s_ease-in-out_0.3s_infinite]"
              style={{ height: "60%" }}
            />
            <span
              className="w-px bg-muted-foreground/60 animate-[wave_0.8s_ease-in-out_0.45s_infinite]"
              style={{ height: "80%" }}
            />
          </div>
        )}
      </button>
    </>
  );
}
