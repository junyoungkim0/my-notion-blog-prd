import Link from "next/link";

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
    >
      #{tag}
    </Link>
  );
}
