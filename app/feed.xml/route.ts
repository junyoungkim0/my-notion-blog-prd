import { getAllPosts } from "@/lib/api";

export async function GET() {
  try {
    const posts = await getAllPosts();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Notion Blog</title>
    <link>${baseUrl}</link>
    <description>Notion을 기반으로 한 현대적인 블로그 플랫폼</description>
    <language>ko-kr</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>

    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || post.content.substring(0, 200))}</description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <category>${escapeXml(post.category || "블로그")}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("RSS 피드 생성 오류:", error);
    return new Response("RSS 피드 생성 중 오류가 발생했습니다.", {
      status: 500,
    });
  }
}

// XML 특수 문자 이스케이프
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
