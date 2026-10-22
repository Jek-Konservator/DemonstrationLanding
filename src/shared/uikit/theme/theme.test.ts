import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BREAKPOINTS } from "./theme";

const readScssBreakpoints = () => {
  const scss = readFileSync(resolve(__dirname, "theme.scss"), "utf8");
  const matches = scss.matchAll(/"(\w+)":\s*([\d.]+em)/g);

  return Object.fromEntries(
    [...matches].map(([, name = "", value = ""]) => [name, value] as const),
  );
};

describe("theme", () => {
  it("брейкпоинты в theme.scss совпадают с темой Mantine", () => {
    expect(readScssBreakpoints()).toEqual(BREAKPOINTS);
  });
});
