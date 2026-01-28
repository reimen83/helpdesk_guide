import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getAllCourses,
  getCourseById,
  getUserEnrollments,
  enrollUserInCourse,
  getCourseCategories,
} from "../db.courses";
import { TRPCError } from "@trpc/server";

export const coursesRouter = router({
  list: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const courses = await getAllCourses({
          category: input.category,
          level: input.level,
          search: input.search,
        });
        return courses;
      } catch (error) {
        console.error("Error fetching courses:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch courses",
        });
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const course = await getCourseById(input.id);
        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          });
        }
        return course;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error fetching course:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch course",
        });
      }
    }),

  getCategories: publicProcedure.query(async () => {
    try {
      return await getCourseCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch categories",
      });
    }
  }),

  myEnrollments: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await getUserEnrollments(ctx.user.id);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch enrollments",
      });
    }
  }),

  enroll: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const course = await getCourseById(input.courseId);
        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          });
        }

        await enrollUserInCourse(ctx.user.id, input.courseId);

        return {
          success: true,
          message: "Successfully enrolled in course",
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error enrolling in course:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to enroll in course",
        });
      }
    }),
});
