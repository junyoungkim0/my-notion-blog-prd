import notion, { getDatabaseId } from "./notion-client";
import { BlogPost, NotionPage } from "./types";

// Notion 페이지를 BlogPost로 변환
const parseNotionPage = (page: NotionPage): BlogPost => {
  const properties = page.properties;

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || "제목 없음",
    slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
    excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || "",
    content: properties.Content?.rich_text?.[0]?.plain_text || "",
    category: properties.Category?.select?.name || "",
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    createdAt: properties.CreatedAt?.created_time || "",
    updatedAt: properties.UpdatedAt?.last_edited_time || "",
    published: properties.Published?.checkbox || false,
    cover: page.cover?.external?.url || page.cover?.file?.url,
  };
};

// 모든 블로그 포스트 조회
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const databaseId = getDatabaseId();
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "CreatedAt",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => parseNotionPage(page as NotionPage));
  } catch (error) {
    console.error("블로그 포스트 조회 중 오류:", error);
    throw error;
  }
};

// 단일 블로그 포스트 조회
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const databaseId = getDatabaseId();
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    return parseNotionPage(response.results[0] as NotionPage);
  } catch (error) {
    console.error(`포스트 '${slug}' 조회 중 오류:`, error);
    throw error;
  }
};

// 카테고리별 블로그 포스트 조회
export const getPostsByCategory = async (
  category: string
): Promise<BlogPost[]> => {
  try {
    const databaseId = getDatabaseId();
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Category",
            select: {
              equals: category,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "CreatedAt",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => parseNotionPage(page as NotionPage));
  } catch (error) {
    console.error(`카테고리 '${category}' 조회 중 오류:`, error);
    throw error;
  }
};

// 태그별 블로그 포스트 조회
export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  try {
    const databaseId = getDatabaseId();
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Tags",
            multi_select: {
              contains: tag,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "CreatedAt",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => parseNotionPage(page as NotionPage));
  } catch (error) {
    console.error(`태그 '${tag}' 조회 중 오류:`, error);
    throw error;
  }
};
