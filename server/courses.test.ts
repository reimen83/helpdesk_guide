import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("courses router", () => {
  it("should list courses", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const courses = await caller.courses.list({});
    expect(Array.isArray(courses)).toBe(true);
  });

  it("should get categories", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.courses.getCategories();
    expect(Array.isArray(categories)).toBe(true);
  });

  it("should get user enrollments", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const enrollments = await caller.courses.myEnrollments();
    expect(Array.isArray(enrollments)).toBe(true);
  });
});
