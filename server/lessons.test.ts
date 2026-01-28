import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("lessons router", () => {
  it("getByCourse should return lessons for a course", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const lessons = await caller.lessons.getByCourse({ courseId: 1 });

    expect(Array.isArray(lessons)).toBe(true);
  });

  it("getById should return a lesson", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const lesson = await caller.lessons.getById({ lessonId: 1 });

    if (lesson) {
      expect(lesson.id).toBe(1);
      expect(lesson.title).toBeDefined();
    }
  });

  it("getMaterials should return materials for a lesson", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const materials = await caller.lessons.getMaterials({ lessonId: 1 });

    expect(Array.isArray(materials)).toBe(true);
  });

  it("getMaterialsByCourse should return materials for a course", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const materials = await caller.lessons.getMaterialsByCourse({ courseId: 1 });

    expect(Array.isArray(materials)).toBe(true);
  });

  it("markComplete should require authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.lessons.markComplete({ enrollmentId: 1, lessonId: 1 });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });

  it("getProgress should require authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.lessons.getProgress({ enrollmentId: 1, lessonId: 1 });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});
