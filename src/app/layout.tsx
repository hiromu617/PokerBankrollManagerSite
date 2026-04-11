import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pokerbankrollmanager.app"),
  title: "Poker Bankroll Manager - ポーカー収支管理アプリ",
  description:
    "ポーカーセッションの収支を記録・分析するiOSアプリ。バンクロール推移、損益チャート、時給計算など。",
  openGraph: {
    title: "Poker Bankroll Manager - ポーカー収支管理アプリ",
    description:
      "ポーカーセッションの収支を記録・分析するiOSアプリ。バンクロール推移、損益チャート、時給計算など。",
    url: "https://pokerbankrollmanager.app",
    siteName: "Poker Bankroll Manager",
    images: [
      {
        url: "/appicon.png",
        width: 1024,
        height: 1024,
        alt: "Poker Bankroll Manager App Icon",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Poker Bankroll Manager - ポーカー収支管理アプリ",
    description:
      "ポーカーセッションの収支を記録・分析するiOSアプリ。バンクロール推移、損益チャート、時給計算など。",
    images: ["/appicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
