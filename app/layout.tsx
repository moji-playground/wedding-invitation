import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "현모 & 은지의 결혼식에 초대합니다",
  description: "2026년 6월 6일 토요일 오후 12시 30분, 더 S 웨딩홀",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        className={`${_notoSerif.variable} ${_notoSans.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />{" "}
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2e881768d76c32426bc22b208b480679&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
