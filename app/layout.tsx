import type { Metadata, Viewport } from "next";
import {
  Noto_Serif_KR,
  Noto_Sans_KR,
  Cormorant_Garamond,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { SplashScreen } from "@/components/wedding/splash-screen";
import "./globals.css";

const _notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const _notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

const _cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "현모 & 은지의 결혼식에 초대합니다",
  description: "2026년 6월 6일 토요일 오후 12시 30분, 더 S 웨딩홀 1층 컨벤션홀",
  icons: {
    icon: "/images/wedding-hero.jpg",
    apple: "/images/wedding-hero.jpg",
  },
  openGraph: {
    title: "현모 & 은지의 결혼식에 초대합니다",
    description:
      "2026년 6월 6일 토요일 오후 12시 30분, 더 S 웨딩홀 1층 컨벤션홀",
    images: [
      {
        url: "https://wedding-invitation-gules.vercel.app/images/thumbnail-v2.jpeg",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5ebe0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const line1 = "We're getting married";
const line2 = "celebrate with us";

const charStyle = (i: number, isLine2 = false) => ({
  animationDelay: `${isLine2 ? 1.3 + i * 0.055 : i * 0.055}s`,
  fontFamily: '"Cormorant Garamond",Georgia,serif',
  fontWeight: 300,
  fontSize: isLine2 ? "0.85rem" : "1.5rem",
  letterSpacing: isLine2 ? "0.25em" : "0.12em",
  fontStyle: isLine2 ? ("italic" as const) : ("normal" as const),
  color: isLine2 ? "rgba(60,50,45,0.5)" : "rgba(60,50,45,0.85)",
});

const btnDelay = 1.3 + line2.length * 0.055 + 0.6;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${_notoSerif.variable} ${_notoSans.variable} ${_cormorant.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div
          id="splash-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#faf8f5",
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          {/* line 1 */}
          <div style={{ display: "flex", marginBottom: 14 }}>
            {line1.split("").map((char, i) => (
              <span key={i} className="splash-char" style={charStyle(i)}>
                {char}
              </span>
            ))}
          </div>
          {/* line 2 */}
          <div style={{ display: "flex" }}>
            {line2.split("").map((char, i) => (
              <span key={i} className="splash-char" style={charStyle(i, true)}>
                {char}
              </span>
            ))}
          </div>
          {/* 버튼 */}
          <div
            id="splash-btn-wrap"
            className="splash-btn-wrap"
            style={{
              display: "flex",
              gap: 16,
              marginTop: 48,
              animationDelay: `${btnDelay}s`,
            }}
          >
            <button
              id="splash-btn-music"
              style={{
                fontFamily: '"Cormorant Garamond",Georgia,serif',
                fontSize: "0.8rem",
                fontWeight: 300,
                letterSpacing: "0.2em",
                padding: "10px 20px",
                border: "1px solid rgba(60,50,45,0.25)",
                background: "transparent",
                cursor: "pointer",
                color: "rgba(60,50,45,0.6)",
              }}
            >
              ♪{"  "}음악과 함께
            </button>
            <button
              id="splash-btn-silent"
              style={{
                fontFamily: '"Cormorant Garamond",Georgia,serif',
                fontSize: "0.8rem",
                fontWeight: 300,
                letterSpacing: "0.2em",
                padding: "10px 20px",
                border: "1px solid rgba(60,50,45,0.25)",
                background: "transparent",
                cursor: "pointer",
                color: "rgba(60,50,45,0.6)",
              }}
            >
              조용히 보기
            </button>
          </div>
        </div>
        <SplashScreen />
        {children}
        <Analytics />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
