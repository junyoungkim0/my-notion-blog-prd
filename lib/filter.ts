import { BlogPost } from "./types";

export interface FilterOptions {
  searchQuery?: string;
  category?: string;
  tags?: string[];
  sortBy?: "latest" | "oldest" | "title";
}

// 포스트를 필터링합니다
export const filterPosts = (
  posts: BlogPost[],
  options: FilterOptions
): BlogPost[] => {
  let filtered = [...posts];

  // 검색 쿼리 필터
  if (options.searchQuery?.trim()) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // 카테고리 필터
  if (options.category) {
    filtered = filtered.filter((post) => post.category === options.category);
  }

  // 태그 필터 (모든 태그를 포함하는 포스트)
  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter((post) =>
      options.tags!.every((tag) => post.tags.includes(tag))
    );
  }

  // 정렬
  if (options.sortBy) {
    switch (options.sortBy) {
      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }

  return filtered;
};

// 모든 유니크한 카테고리를 추출합니다
export const extractCategories = (posts: BlogPost[]): string[] => {
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories).sort();
};

// 모든 유니크한 태그를 추출합니다
export const extractTags = (posts: BlogPost[]): string[] => {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};
