import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  getLessonsByCourse,
  getLesson,
  getMaterialsByLesson,
  getMaterialsByCourse,
  markLessonComplete,
  getLessonProgress,
} from "../db.lessons";

export const lessonsRouter = router({
  getByCourse: publicProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ input }) => {
      return await getLessonsByCourse(input.courseId);
    }),

  getById: publicProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input }) => {
      return await getLesson(input.lessonId);
    }),

  getMaterials: publicProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input }) => {
      return await getMaterialsByLesson(input.lessonId);
    }),

  getMaterialsByCourse: publicProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ input }) => {
      return await getMaterialsByCourse(input.courseId);
    }),

  markComplete: protectedProcedure
    .input(z.object({ enrollmentId: z.number(), lessonId: z.number() }))
    .mutation(async ({ input }) => {
      return await markLessonComplete(input.enrollmentId, input.lessonId);
    }),

  getProgress: protectedProcedure
    .input(z.object({ enrollmentId: z.number(), lessonId: z.number() }))
    .query(async ({ input }) => {
      return await getLessonProgress(input.enrollmentId, input.lessonId);
    }),
});
