import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPostBySlug, getPostsByCategory } from "@/lib/api";
import {
  PostHeader,
  PostContent,
  RelatedPosts,
} from "@/components";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return {
        title: "포스트를 찾을 수 없습니다",
      };
    }

    return {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        images: post.cover ? [{ url: post.cover }] : [],
        type: "article",
        publishedTime: post.createdAt,
        authors: ["My Notion Blog"],
      },
    };
  } catch (error) {
    return {
      title: "오류가 발생했습니다",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    // 관련 포스트 조회 (같은 카테고리)
    let relatedPosts = [];
    if (post.category) {
      relatedPosts = await getPostsByCategory(post.category);
      // 현재 포스트 제외 및 3개만 표시
      relatedPosts = relatedPosts
        .filter((p) => p.id !== post.id)
        .slice(0, 3);
    }

    return (
      <div className="max-w-4xl mx-auto">
        <article>
          <PostHeader post={post} />
          <PostContent content={post.content} />
          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}
        </article>

        {/* 돌아가기 버튼 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a
            href="/blog"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← 블로그 목록으로 돌아가기
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("포스트 로드 오류:", error);
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          오류가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-6">포스트를 불러오는 중에 문제가 발생했습니다.</p>
        <a
          href="/blog"
          className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
        >
          블로그 목록으로 돌아가기
        </a>
      </div>
    );
  }
}
