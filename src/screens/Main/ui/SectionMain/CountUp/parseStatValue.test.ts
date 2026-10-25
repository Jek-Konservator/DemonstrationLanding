import { describe, expect, it } from "vitest";
import { parseStatValue } from "./parseStatValue";

describe("parseStatValue", () => {
  it("ru: пробел между разрядами и хвост", () => {
    const parsed = parseStatValue("1 200+");

    expect(parsed?.target).toBe(1200);
    expect(parsed?.format(350)).toBe("350+");
    expect(parsed?.format(1200)).toBe("1 200+");
  });

  it("en: запятая между разрядами", () => {
    expect(parseStatValue("1,200+")?.format(1200)).toBe("1,200+");
  });

  it("простое число без хвоста", () => {
    const parsed = parseStatValue("24");

    expect(parsed?.target).toBe(24);
    expect(parsed?.format(7)).toBe("7");
  });

  it("строка не с цифры — не число", () => {
    expect(parseStatValue("много")).toBeNull();
  });
});
