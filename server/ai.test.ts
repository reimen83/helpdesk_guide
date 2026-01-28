import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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

describe("ai router", () => {
  it(
    "chat should reject empty messages",
    async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.ai.chat({
          message: "",
          context: "help_desk",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("não pode estar vazia");
      }
    },
    { timeout: 10000 }
  );

  it(
    "chat should accept a valid message",
    async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const response = await caller.ai.chat({
        message: "O que é Help Desk?",
        context: "help_desk",
      });

      expect(response).toBeDefined();
      expect(response.message).toBeDefined();
      expect(typeof response.message).toBe("string");
    },
    { timeout: 30000 }
  );
});
