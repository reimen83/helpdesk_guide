import { eq, and } from "drizzle-orm";
import { courses, enrollments } from "../drizzle/schema";
import { getDb } from "./db";

export async function getAllCourses(filters?: {
  category?: string;
  level?: string;
  search?: string;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(courses) as any;

  if (filters?.category) {
    query = query.where(eq(courses.category, filters.category));
  }

  if (filters?.level) {
    query = query.where(eq(courses.level, filters.level as any));
  }

  return query;
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      enrollment: enrollments,
      course: courses,
    })
    .from(enrollments)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .where(eq(enrollments.userId, userId));
}

export async function getUserEnrollment(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(enrollments)
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function enrollUserInCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserEnrollment(userId, courseId);
  if (existing) {
    throw new Error("User is already enrolled in this course");
  }

  await db.insert(enrollments).values({
    userId,
    courseId,
    status: "enrolled",
    progress: 0,
    completedLessons: 0,
  });
}

export async function getCourseCategories() {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .selectDistinct({ category: courses.category })
    .from(courses);

  return result.map((r) => r.category);
}
