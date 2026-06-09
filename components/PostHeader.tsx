import { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Tag from "./Tag";
import Link from "next/link";

interface PostHeaderProps {
  post: BlogPost;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-8">
      {/* 커버 이미지 */}
      {post.cover && (
        <div className="relative w-full h-96 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 overflow-hidden rounded-lg">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 카테고리 */}
      {post.category && (
        <div className="mb-4">
          <Link
            href={`/categories/${encodeURIComponent(post.category)}`}
            className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full hover:bg-blue-200 transition-colors"
          >
            {post.category}
          </Link>
        </div>
      )}

      {/* 제목 */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      {/* 메타 정보 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <time className="text-gray-600">
            {formatDate(post.createdAt)}
          </time>
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <span className="text-sm text-gray-500">
              (수정: {formatDate(post.updatedAt)})
            </span>
          )}
        </div>
      </div>

      {/* 요약 */}
      {post.excerpt && (
        <p className="mt-6 text-xl text-gray-600">{post.excerpt}</p>
      )}

      {/* 태그 */}
      {post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </header>
  );
}
