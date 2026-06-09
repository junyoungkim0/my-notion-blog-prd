# My Notion Blog PRD

Notion을 기반으로 한 현대적인 블로그 플랫폼입니다.

## 🚀 프로젝트 로드맵

### Phase 1: 프로젝트 초기 설정 및 Notion API 연동 ✅
- [x] Next.js 프로젝트 초기화 (TypeScript, Tailwind CSS)
- [x] Notion API 클라이언트 설정
- [x] 환경 변수 설정
- [x] 타입 정의 및 API 함수

### Phase 2: 공통 API 함수 및 재사용 컴포넌트
- [ ] React 컴포넌트 라이브러리
- [ ] 공통 유틸리티 함수
- [ ] 레이아웃 컴포넌트

### Phase 3: 블로그 목록 및 상세 페이지
- [ ] 블로그 목록 페이지
- [ ] 포스트 상세 페이지
- [ ] 동적 라우팅

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
│   └── types.ts            # TypeScript 타입 정의
├── app/                    # Next.js 앱 라우터
├── components/             # React 컴포넌트
├── public/                 # 정적 파일
└── .env.local             # 환경 변수 (git 무시)
```

## 📝 라이선스

MIT
