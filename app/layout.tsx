import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

export const metadata: Metadata = {
  title: "My Notion Blog",
  description: "Notion 기반의 현대적인 블로그 플랫폼입니다. 프로그래밍, 개발, 기술 관련 콘텐츠를 공유합니다.",
  keywords: ["블로그", "Notion", "프로그래밍", "개발", "기술"],
  authors: [{ name: "블로그 작성자" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: baseUrl,
    siteName: "My Notion Blog",
    title: "My Notion Blog",
    description: "Notion 기반의 현대적인 블로그 플랫폼",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "My Notion Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Notion Blog",
    description: "Notion 기반의 현대적인 블로그 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
