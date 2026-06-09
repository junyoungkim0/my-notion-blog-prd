# My Notion Blog PRD

Notion을 기반으로 한 현대적인 블로그 플랫폼입니다.

## 🚀 프로젝트 로드맵

### Phase 1: 프로젝트 초기 설정 및 Notion API 연동 ✅
- [x] Next.js 프로젝트 초기화 (TypeScript, Tailwind CSS)
- [x] Notion API 클라이언트 설정
- [x] 환경 변수 설정
- [x] 타입 정의 및 API 함수

### Phase 2: 공통 API 함수 및 재사용 컴포넌트 ✅
- [x] React 컴포넌트 라이브러리
  - BlogCard: 블로그 포스트 카드
  - BlogList: 블로그 목록
  - Header: 헤더 네비게이션
  - Footer: 푸터
  - SearchBox: 검색 박스
  - Tag: 태그 컴포넌트
- [x] 공통 유틸리티 함수
  - 날짜 포맷팅
  - 상대 시간 표시
  - 텍스트 자르기
  - URL 슬러그 생성
  - 배열 중복 제거
- [x] 레이아웃 컴포넌트 (MainLayout)

### Phase 3: 블로그 목록 및 상세 페이지 ✅
- [x] 블로그 목록 페이지 (`/blog`)
  - 모든 포스트 조회
  - 실시간 검색 기능
- [x] 포스트 상세 페이지 (`/blog/[slug]`)
  - 동적 라우팅
  - SEO 메타데이터
  - 관련 포스트 표시
- [x] 카테고리 페이지
  - `/categories`: 카테고리 목록
  - `/categories/[name]`: 카테고리별 포스트
- [x] 태그 페이지 (`/tags/[tag]`)
  - 태그별 포스트 필터링

### Phase 4: 카테고리 필터 및 검색 기능 ✅
- [x] 고급 필터 바 컴포넌트 (FilterBar)
- [x] 카테고리 필터링
- [x] 태그 멀티 필터링
- [x] 정렬 옵션 (최신순, 오래된순, 제목순)
- [x] URL query params로 필터 상태 저장
- [x] 검색 + 필터 통합 기능

### Phase 5: SEO 최적화 및 Vercel 배포 ✅
- [x] SEO 메타 태그 최적화
- [x] 동적 Sitemap 생성 (`/sitemap.xml`)
- [x] RSS 피드 (`/feed.xml`, `/rss.xml`)
- [x] robots.txt 설정
- [x] Open Graph 메타데이터
- [x] JSON-LD 구조화된 데이터
- [x] 보안 헤더 설정
- [x] Vercel 배포 설정 (`vercel.json`)
- [x] Next.js 성능 최적화

## 📋 필수 설정

### 1. Notion API Key 발급
1. [Notion Developers](https://www.notion.so/my-integrations)에 접속
2. "새 통합 만들기" 클릭
3. 통합 이름 설정 및 생성
4. "내 페이지에 추가"로 데이터베이스 연동

### 2. 환경 변수 설정
```bash
cp .env.example .env.local
```

`.env.local` 파일에 다음을 설정합니다:
```
NOTION_API_KEY=your_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

### 3. Notion 데이터베이스 구조
블로그 데이터베이스는 다음 필드를 포함해야 합니다:
- `Title` (제목) - Text
- `Slug` (URL 슬러그) - Text
- `Excerpt` (요약) - Text
- `Content` (본문) - Text
- `Category` (카테고리) - Select
- `Tags` (태그) - Multi-select
- `Published` (발행 상태) - Checkbox
- `CreatedAt` (생성일) - Created time
- `UpdatedAt` (수정일) - Last edited time

## 🛠️ 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## 📁 프로젝트 구조

```
my-notion-blog-prd/
├── lib/
│   ├── notion-client.ts    # Notion API 클라이언트
│   ├── api.ts              # Notion API 함수
│   ├── types.ts            # TypeScript 타입 정의
│   ├── utils.ts            # 공통 유틸리티 함수
│   └── index.ts            # 중앙 내보내기
├── components/
│   ├── BlogCard.tsx        # 블로그 포스트 카드
│   ├── BlogList.tsx        # 블로그 목록
│   ├── Header.tsx          # 헤더
│   ├── Navigation.tsx      # 네비게이션
│   ├── Footer.tsx          # 푸터
│   ├── SearchBox.tsx       # 검색 박스
│   ├── Tag.tsx             # 태그
│   ├── MainLayout.tsx      # 메인 레이아웃
│   └── index.ts            # 중앙 내보내기
├── app/                    # Next.js 앱 라우터
├── public/                 # 정적 파일
└── .env.local             # 환경 변수 (git 무시)
```

## 🧩 주요 컴포넌트

### BlogCard
- 블로그 포스트의 카드 형태 표현
- 커버 이미지, 제목, 요약, 태그, 날짜 표시
- 호버 효과 및 링크 기능

### BlogList
- 블로그 포스트 목록을 그리드로 표시
- 로딩 상태 및 빈 상태 처리
- 반응형 레이아웃 (1열/2열/3열)

### SearchBox
- 실시간 검색 기능
- 입력값 초기화 버튼
- 로딩 상태 지원

### MainLayout
- Header, Footer와 함께 전체 페이지 구조 제공
- 최대 너비 제한 및 패딩 설정

### PostHeader
- 포스트 제목, 날짜, 카테고리, 태그 표시
- 커버 이미지 지원

### PostContent
- 포스트 본문 렌더링
- 줄바꿈 처리

### RelatedPosts
- 같은 카테고리의 관련 포스트 표시
- 최대 3개 포스트 표시

### FilterBar
- 정렬 옵션 (최신순, 오래된순, 제목순)
- 카테고리 필터
- 태그 멀티 필터
- 필터 상태 표시 및 초기화

## 📍 주요 페이지 라우트

| 경로 | 설명 |
|------|------|
| `/` | 홈페이지 |
| `/blog` | 전체 블로그 포스트 목록 (검색 기능 포함) |
| `/blog/[slug]` | 개별 포스트 상세 페이지 |
| `/categories` | 카테고리 목록 |
| `/categories/[name]` | 카테고리별 포스트 목록 |
| `/tags/[tag]` | 태그별 포스트 목록 |

## 🔍 필터 및 검색 기능

### 필터 옵션
- **정렬**: 최신순, 오래된순, 제목순
- **카테고리**: 단일 선택
- **태그**: 다중 선택 (AND 필터링)
- **검색**: 제목, 요약, 내용, 태그에서 검색

### URL Query Parameters
필터 상태는 URL에 저장되어 공유 가능합니다:
```
/blog?search=keyword&category=Tech&tags=javascript,react&sort=latest
```

### 필터링 로직 (`lib/filter.ts`)
- `filterPosts()`: 필터 옵션에 따라 포스트 필터링
- `extractCategories()`: 모든 유니크한 카테고리 추출
- `extractTags()`: 모든 유니크한 태그 추출

## 🚀 Vercel 배포 가이드

### 1. 저장소 연동
```bash
# GitHub에 코드 푸시
git remote add origin https://github.com/yourusername/my-notion-blog-prd.git
git push -u origin main
```

### 2. Vercel 배포
1. [Vercel](https://vercel.com)에 접속
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 환경 변수 설정:
   - `NOTION_API_KEY`: Notion API 키
   - `NOTION_DATABASE_ID`: Notion 데이터베이스 ID
   - `NEXT_PUBLIC_BASE_URL`: 배포된 도메인 (예: `https://yourdomain.vercel.app`)
5. "Deploy" 클릭

### 3. 커스텀 도메인
1. Vercel 프로젝트 설정 → Domains
2. 도메인 추가
3. DNS 레코드 설정

## 🔍 SEO 설정

### 메타데이터
- ✅ Open Graph (og:title, og:description, og:image)
- ✅ Twitter Card 
- ✅ 정규 URL (Canonical)
- ✅ Keywords & Description

### 사이트맵 및 RSS
- `/sitemap.xml`: 동적으로 생성되는 XML 사이트맵
- `/feed.xml` 또는 `/rss.xml`: RSS 피드
- `robots.txt`: 검색 엔진 크롤링 지침

### 구조화된 데이터
- BlogPosting 스키마 (JSON-LD)
- 각 포스트에 자동 적용

### 성능 최적화
- 이미지 포맷 자동 변환 (WebP, AVIF)
- 응답 압축 (gzip)
- 캐싱 전략 적용

## 🔐 보안 기능

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 모니터링

### Vercel Analytics
배포 후 자동으로 활성화됨

### Google Search Console
1. [Google Search Console](https://search.google.com/search-console)에 접속
2. 속성 추가
3. 사이트맵 제출: `yourdomain.com/sitemap.xml`

### Google Analytics (선택)
`app/layout.tsx`에 추가 필요:
```tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
/>
```

## 📝 라이선스

MIT
