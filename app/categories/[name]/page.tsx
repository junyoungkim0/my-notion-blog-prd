"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { getPostsByCategory } from "@/lib/api";
import { BlogList } from "@/components";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    name: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = decodeURIComponent(params.name);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getPostsByCategory(categoryName);
        setPosts(data);
      } catch (err) {
        setError("포스트를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName]);

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <Link
          href="/categories"
          className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
        >
          ← 카테고리로 돌아가기
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {categoryName}
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
        emptyMessage={`'${categoryName}' 카테고리의 포스트가 없습니다.`}
      />
    </div>
  );
}
