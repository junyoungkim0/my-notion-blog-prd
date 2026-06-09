"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { getAllPosts } from "@/lib/api";
import { BlogList, SearchBox } from "@/components";
import { searchInText } from "@/lib/utils";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 초기 로드
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError("블로그 포스트를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 검색 처리
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(
      (post) =>
        searchInText(post.title, query) ||
        searchInText(post.excerpt, query) ||
        searchInText(post.content, query) ||
        post.tags.some((tag) => searchInText(tag, query))
    );

    setFilteredPosts(filtered);
  };

  return (
    <div className="space-y-8">
      {/* 제목 */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          블로그
        </h1>
        <p className="text-lg text-gray-600">
          총 {posts.length}개의 포스트 중 {filteredPosts.length}개를 표시합니다.
        </p>
      </div>

      {/* 검색 박스 */}
      <div className="max-w-md mx-auto w-full">
        <SearchBox
          placeholder="포스트 검색..."
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <p className="text-sm text-red-600 mt-2">
            Notion API 설정을 확인하세요. .env.local 파일에 올바른 API 키와
            데이터베이스 ID가 설정되어 있는지 확인하세요.
          </p>
        </div>
      )}

      {/* 블로그 목록 */}
      <BlogList
        posts={filteredPosts}
        isLoading={isLoading}
        isEmpty={posts.length === 0}
        emptyMessage="아직 발행된 블로그 포스트가 없습니다."
      />

      {/* 검색 결과 없음 */}
      {!isLoading && !error && searchQuery && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            '{searchQuery}'에 대한 검색 결과가 없습니다.
          </p>
          <button
            onClick={() => handleSearch("")}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            검색 초기화
          </button>
        </div>
      )}
    </div>
  );
}
