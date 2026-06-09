export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 소개 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">소개</h3>
            <p className="text-sm text-gray-600">
              Notion 기반의 현대적인 블로그 플랫폼입니다.
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">링크</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  홈
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  블로그
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  카테고리
                </a>
              </li>
            </ul>
          </div>

          {/* 소셜 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">소셜</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} My Notion Blog. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  );
}
