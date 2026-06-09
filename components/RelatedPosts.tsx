import { BlogPost } from "@/lib/types";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  posts: BlogPost[];
  maxPosts?: number;
}

export default function RelatedPosts({
  posts,
  maxPosts = 3,
}: RelatedPostsProps) {
  const displayPosts = posts.slice(0, maxPosts);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        관련 포스트
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
