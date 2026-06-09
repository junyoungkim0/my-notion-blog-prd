import { Client } from "@notionhq/client";

// Notion API 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabaseId = () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.");
  }
  return databaseId;
};

export default notion;
