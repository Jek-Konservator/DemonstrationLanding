import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "./navigation";

describe("navigation", () => {
  it("id секций уникальны", () => {
    const ids = Object.values(NAVIGATION_NAMES);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("id годятся для якоря: латиница в нижнем регистре и дефис", () => {
    Object.values(NAVIGATION_NAMES).forEach((id) => {
      expect(id).toMatch(/^[a-z-]+$/);
    });
  });
});
