import { eq, desc, like, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts, InsertBlogPost } from "../drizzle/schema";
import { getDb } from "./db";

export async function getBlogPosts(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    return posts;
  } catch (error) {
    console.error("[Database] Failed to get blog posts:", error);
    return [];
  }
}

export async function searchBlogPosts(query: string, limit = 10) {
  const db = await getDb();
  if (!db) return [];

  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.published, true),
          like(blogPosts.title, `%${query}%`)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    return posts;
  } catch (error) {
    console.error("[Database] Failed to search blog posts:", error);
    return [];
  }
}

export async function getBlogPostsByCategory(category: string, limit = 10) {
  const db = await getDb();
  if (!db) return [];

  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.published, true),
          eq(blogPosts.category, category)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    return posts;
  } catch (error) {
    console.error("[Database] Failed to get blog posts by category:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const post = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (post.length > 0) {
      // Increment views
      const currentPost = post[0];
      if (currentPost) {
        await db
          .update(blogPosts)
          .set({ views: (currentPost.views || 0) + 1 })
          .where(eq(blogPosts.id, currentPost.id));
      }

      return post[0];
    }

    return null;
  } catch (error) {
    console.error("[Database] Failed to get blog post by slug:", error);
    return null;
  }
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(blogPosts).values(post);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create blog post:", error);
    return null;
  }
}

export async function getBlogCategories() {
  const db = await getDb();
  if (!db) return [];

  try {
    const categories = await db
      .selectDistinct({ category: blogPosts.category })
      .from(blogPosts)
      .where(eq(blogPosts.published, true));

    return categories.map(c => c.category).filter(Boolean);
  } catch (error) {
    console.error("[Database] Failed to get blog categories:", error);
    return [];
  }
}
