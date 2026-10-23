import { describe, expect, it } from "vitest";
import { request } from ".";

describe("request", () => {
  it("ходит только в свои /api с таймаутом", () => {
    expect(request.defaults.baseURL).toBe("/api");
    expect(request.defaults.timeout).toBe(10_000);
  });
});
