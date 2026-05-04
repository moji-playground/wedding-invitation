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
  description: "2026년 6월 6일 토요일 오후 12시 30분, 더 S 웨딩홀",
  generator: "v0.app",
  icons: {
    icon: "/images/wedding-hero.jpg",
    apple: "/images/wedding-hero.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5ebe0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
        />
        <SplashScreen />
        {children}
        <Analytics />
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2e881768d76c32426bc22b208b480679&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
