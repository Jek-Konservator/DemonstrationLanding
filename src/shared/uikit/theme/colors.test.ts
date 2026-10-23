import { DEFAULT_THEME } from "@mantine/core";
import { describe, expect, it } from "vitest";
import { THEME_COLORS } from "./colors";
import { theme } from "./theme";

describe("THEME_COLORS", () => {
  it("основной цвет совпадает с primaryColor и primaryShade темы", () => {
    const { primaryColor = "", primaryShade } = theme;

    expect(typeof primaryShade).toBe("number");
    expect(THEME_COLORS.primary).toBe(
      DEFAULT_THEME.colors[primaryColor]?.[Number(primaryShade)],
    );
  });

  it("все цвета — hex", () => {
    Object.values(THEME_COLORS).forEach((color) => {
      expect(color).toMatch(/^#([\da-f]{3}|[\da-f]{6})$/i);
    });
  });
});
