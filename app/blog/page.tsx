"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { BlogPost } from "@/lib/types";
import { getAllPosts } from "@/lib/api";
import { BlogList, SearchBox, FilterBar } from "@/components";
import {
  filterPosts,
  extractCategories,
  extractTags,
  FilterOptions,
} from "@/lib/filter";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터 상태
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: searchParams.get("search") || "",
    category: searchParams.get("category") || undefined,
    tags: searchParams.get("tags")?.split(",").filter(Boolean) || [],
    sortBy: (searchParams.get("sort") as any) || "latest",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // 초기 로드
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPosts();
        setPosts(data);
        setCategories(extractCategories(data));
        setTags(extractTags(data));
      } catch (err) {
        setError("블로그 포스트를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 필터링 적용
  useEffect(() => {
    const filtered = filterPosts(posts, filters);
    setFilteredPosts(filtered);

    // URL 업데이트
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set("search", filters.searchQuery);
    if (filters.category) params.set("category", filters.category);
    if (filters.tags?.length) params.set("tags", filters.tags.join(","));
    if (filters.sortBy !== "latest") params.set("sort", filters.sortBy);

    const queryString = params.toString();
    const newUrl = queryString
      ? `/blog?${queryString}`
      : "/blog";
    window.history.replaceState({}, "", newUrl);
  }, [filters, posts]);

  // 검색 처리
  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  // 필터 변경 처리
  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters({
      searchQuery: filters.searchQuery,
      ...newFilters,
    });
  }, [filters.searchQuery]);

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

      {/* 필터 바 */}
      {!error && posts.length > 0 && (
        <FilterBar
          categories={categories}
          tags={tags}
          onFilterChange={handleFilterChange}
          selectedCategory={filters.category}
          selectedTags={filters.tags}
          sortBy={filters.sortBy as "latest" | "oldest" | "title"}
        />
      )}

      {/* 블로그 목록 */}
      <BlogList
        posts={filteredPosts}
        isLoading={isLoading}
        isEmpty={posts.length === 0}
        emptyMessage="아직 발행된 블로그 포스트가 없습니다."
      />

      {/* 필터 결과 없음 */}
      {!isLoading &&
        !error &&
        posts.length > 0 &&
        filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              현재 필터 조건에 맞는 포스트가 없습니다.
            </p>
            <button
              onClick={() =>
                setFilters({
                  searchQuery: "",
                  category: undefined,
                  tags: [],
                  sortBy: "latest",
                })
              }
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              필터 초기화
            </button>
          </div>
        )}
    </div>
  );
}
