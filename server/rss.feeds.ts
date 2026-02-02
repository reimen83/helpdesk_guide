import { parseStringPromise } from "xml2js";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";

interface RSSItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate?: string[];
  author?: string[];
  category?: string[] | { _: string }[];
  "content:encoded"?: string[];
  enclosure?: { $: { url: string } }[];
}

interface RSSFeed {
  rss: {
    channel: {
      title: string[];
      item: RSSItem[];
    }[];
  };
}

/**
 * Translate text to Portuguese using LLM
 */
async function translateToPT(text: string): Promise<string> {
  try {
    if (!text || text.length < 5) return text;
    
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Você é um tradutor profissional. Traduza o texto para português do Brasil de forma concisa e natural. Responda APENAS com o texto traduzido, sem explicações ou comentários adicionais.",
        },
        {
          role: "user",
          content: text.substring(0, 300),
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === 'string') {
      return content.trim();
    }
    return text;
  } catch (error) {
    console.warn("Erro ao traduzir:", error);
    return text;
  }
}

/**
 * Fetch and parse Dev.to RSS feed
 */
export async function fetchDevToFeed(): Promise<
  Array<{
    title: string;
    link: string;
    description: string;
    pubDate: Date;
    author: string;
    category: string;
    thumbnail?: string;
  }>
> {
  try {
    const response = await fetch("https://dev.to/feed");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const xml = await response.text();
    const parsed = (await parseStringPromise(xml)) as RSSFeed;

    const items = parsed.rss.channel[0].item || [];

    return items.map((item) => {
      const categories = Array.isArray(item.category)
        ? item.category
            .map((cat) => (typeof cat === "string" ? cat : cat._))
            .filter(Boolean)
        : [];

      const link = item.link?.[0] || "";
      // Ensure link is valid URL
      const validLink = link.startsWith("http") ? link : `https://dev.to${link}`;

      return {
        title: item.title?.[0] || "Sem título",
        link: validLink,
        description: stripHtml(item.description?.[0] || ""),
        pubDate: new Date(item.pubDate?.[0] || new Date()),
        author: item.author?.[0] || "Dev.to",
        category: categories[0] || "Desenvolvimento",
        thumbnail: extractImageUrl(item["content:encoded"]?.[0] || ""),
      };
    });
  } catch (error) {
    console.error("Erro ao buscar feed Dev.to:", error);
    return [];
  }
}

/**
 * Fetch and parse Hacker News RSS feed
 */
export async function fetchHackerNewsFeed(): Promise<
  Array<{
    title: string;
    link: string;
    description: string;
    pubDate: Date;
    author: string;
    category: string;
    thumbnail?: string;
  }>
> {
  try {
    const response = await fetch("https://news.ycombinator.com/rss");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const xml = await response.text();
    const parsed = (await parseStringPromise(xml)) as RSSFeed;

    const items = parsed.rss.channel[0].item || [];

    return items.slice(0, 30).map((item) => {
      const link = item.link?.[0] || "";
      const title = item.title?.[0] || "Sem título";
      // Ensure link is valid URL
      const validLink = link.startsWith("http") ? link : `https://news.ycombinator.com${link}`;

      return {
        title: title,
        link: validLink,
        description: item.description?.[0] || "Notícia do Hacker News",
        pubDate: new Date(item.pubDate?.[0] || new Date()),
        author: "Hacker News",
        category: "Notícias",
        thumbnail: undefined,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar feed Hacker News:", error);
    return [];
  }
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim()
    .substring(0, 500);
}

/**
 * Extract first image URL from HTML content
 */
function extractImageUrl(html: string): string | undefined {
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return imgMatch ? imgMatch[1] : undefined;
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);
}

/**
 * Sync RSS feeds to database with Portuguese translation
 */
export async function syncRSSFeeds(): Promise<{
  devTo: number;
  hackerNews: number;
  total: number;
}> {
  let devToCount = 0;
  let hackerNewsCount = 0;

  const db = await getDb();
  if (!db) {
    console.error("Database not available for RSS sync");
    return { devTo: 0, hackerNews: 0, total: 0 };
  }

  try {
    // Fetch Dev.to posts
    const devToPosts = await fetchDevToFeed();
    for (const post of devToPosts) {
      // Check if post already exists
      const existing = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.sourceUrl, post.link))
        .limit(1);

      if (existing.length === 0) {
        // Translate title and description to Portuguese
        const translatedTitle = await translateToPT(post.title);
        const translatedDescription = await translateToPT(post.description);
        const slug = generateSlug(translatedTitle);

        await db.insert(blogPosts).values({
          title: translatedTitle,
          slug: slug,
          excerpt: translatedDescription.substring(0, 200),
          content: translatedDescription,
          category: post.category,
          author: post.author,
          thumbnail: post.thumbnail,
          publishedAt: post.pubDate,
          views: 0,
          source: "Dev.to",
          sourceUrl: post.link,
        });
        devToCount++;
      }
    }

    // Fetch Hacker News posts
    const hackerNewsPosts = await fetchHackerNewsFeed();
    for (const post of hackerNewsPosts) {
      // Check if post already exists
      const existing = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.sourceUrl, post.link))
        .limit(1);

      if (existing.length === 0) {
        // Translate title and description to Portuguese
        const translatedTitle = await translateToPT(post.title);
        const translatedDescription = await translateToPT(post.description);
        const slug = generateSlug(translatedTitle);

        await db.insert(blogPosts).values({
          title: translatedTitle,
          slug: slug,
          excerpt: translatedDescription.substring(0, 200),
          content: translatedDescription,
          category: "Notícias",
          author: "Hacker News",
          thumbnail: undefined,
          publishedAt: post.pubDate,
          views: 0,
          source: "Hacker News",
          sourceUrl: post.link,
        });
        hackerNewsCount++;
      }
    }

    return {
      devTo: devToCount,
      hackerNews: hackerNewsCount,
      total: devToCount + hackerNewsCount,
    };
  } catch (error) {
    console.error("Erro ao sincronizar RSS feeds:", error);
    return { devTo: 0, hackerNews: 0, total: 0 };
  }
}
