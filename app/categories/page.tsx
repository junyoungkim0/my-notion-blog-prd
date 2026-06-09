"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";

interface Category {
  name: string;
  count: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const posts = await getAllPosts();

        // 카테고리 집계
        const categoryMap = new Map<string, number>();
        posts.forEach((post) => {
          if (post.category) {
            categoryMap.set(
              post.category,
              (categoryMap.get(post.category) || 0) + 1
            );
          }
        });

        // 배열로 변환 및 정렬
        const categoryArray: Category[] = Array.from(categoryMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setCategories(categoryArray);
      } catch (err) {
        setError("카테고리를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      {/* 제목 */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          카테고리
        </h1>
        <p className="text-lg text-gray-600">
          총 {categories.length}개의 카테고리
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      )}

      {/* 카테고리 그리드 */}
      {!isLoading && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border border-blue-100 h-full flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h2>
                <p className="text-4xl font-bold text-blue-600">
                  {category.count}
                </p>
                <p className="text-sm text-gray-600 mt-2">포스트</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 빈 상태 */}
      {!isLoading && !error && categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            아직 카테고리가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
