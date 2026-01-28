import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(user?: Partial<AuthenticatedUser>): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const defaultUser: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const mergedUser = { ...defaultUser, ...user };

  const ctx: TrpcContext = {
    user: mergedUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("Authentication", () => {
  describe("auth.me", () => {
    it("returns current user when authenticated", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeDefined();
      expect(result?.email).toBe("test@example.com");
      expect(result?.name).toBe("Test User");
      expect(result?.openId).toBe("test-user-123");
    });

    it("returns null when not authenticated", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {
          clearCookie: () => {},
        } as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.me();

      expect(result).toBeNull();
    });
  });

  describe("auth.logout", () => {
    it("clears the session cookie and reports success", async () => {
      const { ctx, clearedCookies } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
      expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
      expect(clearedCookies[0]?.options).toMatchObject({
        maxAge: -1,
        secure: true,
        sameSite: "none",
        httpOnly: true,
        path: "/",
      });
    });

    it("works for admin users", async () => {
      const { ctx, clearedCookies } = createAuthContext({ role: "admin" });
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
    });
  });

  describe("User data persistence", () => {
    it("preserves user data across operations", async () => {
      const { ctx } = createAuthContext({
        email: "custom@example.com",
        name: "Custom Name",
      });
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result?.email).toBe("custom@example.com");
      expect(result?.name).toBe("Custom Name");
    });

    it("handles users with minimal data", async () => {
      const { ctx } = createAuthContext({
        email: null,
        name: null,
      });
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeDefined();
      expect(result?.openId).toBe("test-user-123");
      expect(result?.email).toBeNull();
      expect(result?.name).toBeNull();
    });
  });
});
