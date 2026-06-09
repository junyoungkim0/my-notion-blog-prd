// 공통 유틸리티 함수

// 날짜를 한국 형식으로 포맷팅
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 상대 시간 표시 (예: 2일 전)
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "년 전";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "개월 전";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "일 전";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "시간 전";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "분 전";

  return "방금 전";
};

// 텍스트 자르기
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// URL 슬러그 생성
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// 배열에서 중복 제거
export const removeDuplicates = (array: string[]): string[] => {
  return [...new Set(array)];
};

// 객체의 값이 비어있는지 확인
export const isEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

// 문자열 검색 (대소문자 무시)
export const searchInText = (text: string, query: string): boolean => {
  return text.toLowerCase().includes(query.toLowerCase());
};
