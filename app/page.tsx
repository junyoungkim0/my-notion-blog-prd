import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 영웅 섹션 */}
      <section className="text-center py-12">
        <div className="space-y-4 mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            My Notion Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notion을 기반으로 한 현대적인 블로그 플랫폼입니다. 당신의 생각과 아이디어를 공유하세요.
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            블로그 둘러보기
          </Link>
          <Link
            href="/categories"
            className="inline-block px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            카테고리 탐색
          </Link>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          주요 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 기능 1 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              빠른 로딩
            </h3>
            <p className="text-gray-600">
              Next.js로 만들어진 초고속 블로그 플랫폼
            </p>
          </div>

          {/* 기능 2 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              쉬운 관리
            </h3>
            <p className="text-gray-600">
              Notion에서 바로 콘텐츠를 작성하고 관리
            </p>
          </div>

          {/* 기능 3 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-4l-8 8"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              반응형 디자인
            </h3>
            <p className="text-gray-600">
              모든 디바이스에서 완벽하게 표시됩니다
            </p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
        <p className="text-lg mb-8 opacity-90">
          최신 블로그 포스트를 지금 확인해보세요
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          블로그 방문
        </Link>
      </section>
    </div>
  );
}
