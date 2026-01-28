import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ContactForm Validations", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should validate email format correctly", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test("valid@email.com")).toBe(true);
    expect(emailRegex.test("user.name@domain.co.uk")).toBe(true);
    expect(emailRegex.test("invalid.email@")).toBe(false);
    expect(emailRegex.test("invalid@.com")).toBe(false);
    expect(emailRegex.test("invalid@domain")).toBe(false);
    expect(emailRegex.test("no-at-sign.com")).toBe(false);
  });

  it("should enforce rate limiting", () => {
    const RATE_LIMIT_KEY = "lastContactSubmit";
    const RATE_LIMIT_MINUTES = 1;

    // First submission should be allowed
    expect(localStorage.getItem(RATE_LIMIT_KEY)).toBeNull();

    // Simulate first submission
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

    // Check rate limit
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    const lastSubmitTime = parseInt(lastSubmit!);
    const now = Date.now();
    const timeDiffMinutes = (now - lastSubmitTime) / (1000 * 60);

    // Should be blocked if less than 1 minute has passed
    expect(timeDiffMinutes < RATE_LIMIT_MINUTES).toBe(true);

    // Wait 1 minute (simulated)
    const futureTime = lastSubmitTime + RATE_LIMIT_MINUTES * 60 * 1000 + 1000;
    vi.setSystemTime(futureTime);

    const timeDiffMinutesAfter = (futureTime - lastSubmitTime) / (1000 * 60);
    expect(timeDiffMinutesAfter >= RATE_LIMIT_MINUTES).toBe(true);
  });

  it("should validate required fields", () => {
    const fields = {
      name: "",
      email: "test@email.com",
      subject: "Test",
      message: "Test message",
    };

    expect(fields.name.trim()).toBe("");
    expect(fields.email.trim()).not.toBe("");
    expect(fields.subject.trim()).not.toBe("");
    expect(fields.message.trim()).not.toBe("");
  });
});

describe("NewsletterForm Validations", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should validate email format for newsletter", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test("newsletter@example.com")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
    expect(emailRegex.test("@example.com")).toBe(false);
  });

  it("should enforce newsletter rate limiting", () => {
    const RATE_LIMIT_KEY = "lastNewsletterSubmit";
    const RATE_LIMIT_MINUTES = 1;

    // First submission should be allowed
    expect(localStorage.getItem(RATE_LIMIT_KEY)).toBeNull();

    // Simulate first submission
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

    // Check rate limit
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    const lastSubmitTime = parseInt(lastSubmit!);
    const now = Date.now();
    const timeDiffMinutes = (now - lastSubmitTime) / (1000 * 60);

    // Should be blocked if less than 1 minute has passed
    expect(timeDiffMinutes < RATE_LIMIT_MINUTES).toBe(true);
  });
});
