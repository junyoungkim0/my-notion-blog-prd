# Vercel 배포 가이드

이 문서는 My Notion Blog를 Vercel에 배포하는 과정을 설명합니다.

## 📋 사전 요구사항

- GitHub 계정
- Vercel 계정 ([vercel.com](https://vercel.com))
- Notion API 키 및 데이터베이스 ID
- 커스텀 도메인 (선택사항)

## 🚀 배포 단계

### 1단계: GitHub 저장소 준비

```bash
# 로컬 저장소 초기화 (이미 완료됨)
git init

# 원격 저장소 추가
git remote add origin https://github.com/yourusername/my-notion-blog-prd.git

# 모든 파일 커밋
git add .
git commit -m "초기 커밋"

# GitHub에 푸시
git branch -M main
git push -u origin main
```

### 2단계: Vercel에서 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard)에 접속
2. "Add New..." → "Project" 클릭
3. GitHub 계정 연동 (처음이면 권한 허용)
4. 저장소 선택: `my-notion-blog-prd`
5. "Import" 클릭

### 3단계: 환경 변수 설정

Vercel에서 "Environment Variables" 섹션에서 다음을 추가:

```
NOTION_API_KEY = your_api_key_here
NOTION_DATABASE_ID = your_database_id_here
NEXT_PUBLIC_BASE_URL = https://yourdomain.vercel.app
```

> **주의**: `NEXT_PUBLIC_`으로 시작하는 변수는 클라이언트에 노출됩니다.

### 4단계: 배포

1. "Deploy" 버튼 클릭
2. 배포 진행 (2-5분 소요)
3. 배포 완료 후 자동으로 URL 제공

## 🌐 커스텀 도메인 설정

### 1. 도메인 추가

1. Vercel 프로젝트 → "Settings" → "Domains"
2. "Add Domain" 클릭
3. 도메인명 입력 (예: `yourblog.com`)
4. "Add" 클릭

### 2. DNS 레코드 설정

Vercel에서 제시하는 DNS 레코드를 도메인 공급자에서 설정:

예시 (예: GoDaddy, Namecheap 등):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

또는 루트 도메인:

```
Type: A
Name: @
Value: 76.76.19.165
```

### 3. 검증

DNS 설정이 적용되면 (1-24시간 소요):
- Vercel에서 자동 검증
- SSL 인증서 자동 발급 (Let's Encrypt)

## 🔄 배포 후 업데이트

### 자동 배포 (권장)

GitHub에 푸시하면 자동으로 Vercel에 배포됩니다:

```bash
git add .
git commit -m "기능 추가: 새로운 섹션"
git push origin main
```

### 수동 재배포

Vercel 대시보드에서 "Redeploy" 클릭

## 🔐 환경 변수 관리

### Vercel에서 변수 추가

1. 프로젝트 → "Settings" → "Environment Variables"
2. 변수 추가
3. "Save" 클릭
4. 프로젝트 재배포

### 로컬 개발

`.env.local` 파일에서 관리 (git 무시됨):

```env
NOTION_API_KEY=your_api_key
NOTION_DATABASE_ID=your_database_id
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📊 모니터링 및 분석

### Vercel Analytics

자동으로 활성화됨:
- 페이지 로드 성능
- Core Web Vitals
- 에러 트래킹

### Google Search Console

1. [Google Search Console](https://search.google.com/search-console)에 접속
2. "속성 추가" → 도메인 선택
3. DNS 레코드 또는 HTML 파일로 소유권 증명
4. Sitemap 제출: `yourdomain.com/sitemap.xml`

### Google Analytics

`app/layout.tsx`에 추가 (선택사항):

```tsx
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

## 🐛 문제 해결

### 배포 실패

**오류**: "Build failed"

1. Vercel 로그 확인
2. 로컬에서 `npm run build` 실행
3. 환경 변수 확인
4. GitHub 저장소 상태 확인

### 블로그 포스트가 로드되지 않음

**확인 사항**:
1. `NOTION_API_KEY` 유효성 확인
2. `NOTION_DATABASE_ID` 정확성 확인
3. Notion 데이터베이스 공유 권한 확인

### 도메인 설정 문제

**확인 사항**:
1. DNS 레코드 전파 대기 (최대 24시간)
2. DNS 공급자에서 설정 확인
3. Vercel에서 도메인 상태 확인

## 📝 배포 체크리스트

- [ ] GitHub 저장소에 모든 코드 푸시
- [ ] 환경 변수 설정 완료
- [ ] 배포 성공 확인
- [ ] 웹사이트 접속 테스트
- [ ] 도메인 설정 (선택사항)
- [ ] Google Search Console 등록
- [ ] 모니터링 도구 설정

## 🎉 배포 완료

축하합니다! My Notion Blog가 온라인에 배포되었습니다.

- 웹사이트: `yourdomain.com`
- Vercel 대시보드: `vercel.com/projects`
- 메트릭: Vercel Analytics 및 Google Search Console
