import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { formatDate, truncateText } from "@/lib/utils";
import Tag from "./Tag";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* 커버 이미지 */}
      {post.cover && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* 콘텐츠 */}
      <div className="p-5">
        {/* 카테고리 */}
        {post.category && (
          <span className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            {post.category}
          </span>
        )}

        {/* 제목 */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h2>
        </Link>

        {/* 요약 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(post.excerpt || post.content, 150)}
        </p>

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* 메타 정보 */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <time className="text-xs text-gray-500">{formatDate(post.createdAt)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            더보기 →
          </Link>
        </div>
      </div>
    </article>
  );
}
