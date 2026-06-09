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

### Phase 4: 카테고리 필터 및 검색 기능
- [ ] 카테고리 필터링
- [ ] 검색 기능
- [ ] 태그 필터링

### Phase 5: SEO 최적화 및 Vercel 배포
- [ ] SEO 메타 태그
- [ ] Sitemap 생성
- [ ] Vercel 배포 설정

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

## 📍 주요 페이지 라우트

| 경로 | 설명 |
|------|------|
| `/` | 홈페이지 |
| `/blog` | 전체 블로그 포스트 목록 (검색 기능 포함) |
| `/blog/[slug]` | 개별 포스트 상세 페이지 |
| `/categories` | 카테고리 목록 |
| `/categories/[name]` | 카테고리별 포스트 목록 |
| `/tags/[tag]` | 태그별 포스트 목록 |

## 📝 라이선스

MIT
