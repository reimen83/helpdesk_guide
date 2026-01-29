import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  getBlogPosts,
  searchBlogPosts,
  getBlogPostsByCategory,
  getBlogPostBySlug,
  getBlogCategories,
} from "../db.blog";

export const blogRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      return await getBlogPosts(input.limit, input.offset);
    }),

  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      return await searchBlogPosts(input.query, input.limit);
    }),

  byCategory: publicProcedure
    .input(
      z.object({
        category: z.string(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      return await getBlogPostsByCategory(input.category, input.limit);
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await getBlogPostBySlug(input.slug);
    }),

  categories: publicProcedure.query(async () => {
    return await getBlogCategories();
  }),

  featured: publicProcedure
    .input(z.object({ limit: z.number().default(5) }))
    .query(async ({ input }) => {
      return await getBlogPosts(input.limit, 0);
    }),
});
