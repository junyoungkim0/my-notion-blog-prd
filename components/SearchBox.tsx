"use client";

import { useState, useCallback } from "react";

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBox({
  placeholder = "검색할 내용을 입력하세요...",
  onSearch,
  isLoading = false,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        disabled={isLoading}
        className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
      />

      {/* 검색 아이콘 */}
      <svg
        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* 초기화 버튼 */}
      {query && (
        <button
          onClick={handleClear}
          disabled={isLoading}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          aria-label="검색 초기화"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
