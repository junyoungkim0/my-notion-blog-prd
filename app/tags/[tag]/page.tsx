"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { getPostsByTag } from "@/lib/api";
import { BlogList } from "@/components";
import Link from "next/link";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tagName = decodeURIComponent(params.tag);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getPostsByTag(tagName);
        setPosts(data);
      } catch (err) {
        setError("포스트를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [tagName]);

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
        >
          ← 블로그로 돌아가기
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          #{tagName}
        </h1>
        <p className="text-lg text-gray-600">
          총 {posts.length}개의 포스트
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 블로그 목록 */}
      <BlogList
        posts={posts}
        isLoading={isLoading}
        isEmpty={posts.length === 0}
        emptyMessage={`'${tagName}' 태그의 포스트가 없습니다.`}
      />
    </div>
  );
}
