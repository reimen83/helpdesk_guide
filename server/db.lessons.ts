import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import { lessons, materials, lessonProgress } from "../drizzle/schema";

export async function getLessonsByCourse(courseId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(lessons.order);
  } catch (error) {
    console.error("[Database] Failed to get lessons:", error);
    return [];
  }
}

export async function getLesson(lessonId: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get lesson:", error);
    return null;
  }
}

export async function getMaterialsByLesson(lessonId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(materials)
      .where(eq(materials.lessonId, lessonId))
      .orderBy(materials.order);
  } catch (error) {
    console.error("[Database] Failed to get materials:", error);
    return [];
  }
}

export async function getMaterialsByCourse(courseId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(materials)
      .where(eq(materials.courseId, courseId))
      .orderBy(materials.order);
  } catch (error) {
    console.error("[Database] Failed to get materials:", error);
    return [];
  }
}

export async function markLessonComplete(enrollmentId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.insert(lessonProgress).values({
      enrollmentId,
      lessonId,
      completed: true,
      completedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("[Database] Failed to mark lesson complete:", error);
    return false;
  }
}

export async function getLessonProgress(enrollmentId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.enrollmentId, enrollmentId),
          eq(lessonProgress.lessonId, lessonId)
        )
      )
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get lesson progress:", error);
    return null;
  }
}
