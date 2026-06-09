import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["*.notion.so", "notion.so"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
    ],
  },

  // 성능 최적화
  compress: true,
  poweredByHeader: false,

  // 보안 헤더
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      // RSS 피드 캐싱
      {
        source: "/feed.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  // 리다이렉트
  async redirects() {
    return [
      // /index.html → /
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // 재작성 규칙
  async rewrites() {
    return {
      beforeFiles: [
        // RSS 피드 별칭
        {
          source: "/rss.xml",
          destination: "/feed.xml",
        },
      ],
    };
  },
};

export default nextConfig;
