// Notion 블로그 포스트 타입 정의
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
  cover?: string;
}

export interface NotionPage {
  id: string;
  properties: Record<string, any>;
  cover?: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
}
