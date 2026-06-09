interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  // 마크다운 또는 HTML 콘텐츠를 처리하는 기본 구현
  // Notion 데이터는 일반적으로 plain text이므로 줄바꿈을 처리
  const paragraphs = content.split("\n").filter((para) => para.trim());

  return (
    <article className="prose prose-lg max-w-none">
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
