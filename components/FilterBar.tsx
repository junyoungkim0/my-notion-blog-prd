"use client";

import { useState } from "react";
import { FilterOptions } from "@/lib/filter";

interface FilterBarProps {
  categories: string[];
  tags: string[];
  onFilterChange: (options: FilterOptions) => void;
  selectedCategory?: string;
  selectedTags?: string[];
  sortBy?: "latest" | "oldest" | "title";
}

export default function FilterBar({
  categories,
  tags,
  onFilterChange,
  selectedCategory,
  selectedTags = [],
  sortBy = "latest",
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? undefined : category;
    onFilterChange({
      category: newCategory,
      tags: selectedTags,
      sortBy: sortBy as "latest" | "oldest" | "title",
    });
  };

  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onFilterChange({
      category: selectedCategory,
      tags: newTags,
      sortBy: sortBy as "latest" | "oldest" | "title",
    });
  };

  const handleSortChange = (newSort: string) => {
    onFilterChange({
      category: selectedCategory,
      tags: selectedTags,
      sortBy: newSort as "latest" | "oldest" | "title",
    });
  };

  const handleReset = () => {
    onFilterChange({
      category: undefined,
      tags: [],
      sortBy: "latest",
    });
    setIsOpen(false);
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) + selectedTags.length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* 필터 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-semibold text-gray-900">필터</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* 필터 패널 */}
      {isOpen && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          {/* 정렬 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              정렬
            </label>
            <div className="space-y-2">
              {[
                { value: "latest", label: "최신순" },
                { value: "oldest", label: "오래된순" },
                { value: "title", label: "제목순" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 카테고리 */}
          {categories.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                카테고리
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 태그 */}
          {tags.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                태그
              </label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 초기화 버튼 */}
          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              필터 초기화
            </button>
          )}
        </div>
      )}
    </div>
  );
}
