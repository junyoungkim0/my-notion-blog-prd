import { MetadataRoute } from "next";
import { getAllPosts, getPostsByCategory } from "@/lib/api";
import { extractCategories } from "@/lib/filter";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await getAllPosts();
    const categories = extractCategories(posts);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

    const sitemap: MetadataRoute.Sitemap = [
      // 홈페이지
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      // 블로그 목록
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      // 카테고리 목록
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },

      // 개별 포스트
      ...posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),

      // 카테고리별 페이지
      ...categories.map((category) => ({
        url: `${baseUrl}/categories/${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];

    return sitemap;
  } catch (error) {
    console.error("Sitemap 생성 오류:", error);
    // 에러 발생 시 기본 sitemap 반환
    return [
      {
        url: "https://yourdomain.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
