import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OG_FONT_FILES } from "./constants";
import { loadOgFonts } from "./loadOgFonts";
import { OgImage } from "./OgImage";

describe("OgImage", () => {
  it("рендерит название, плашку, заголовок и описание", () => {
    render(
      <OgImage
        badge="badge"
        description="description"
        siteName="site"
        title="title"
      />,
    );

    ["site", "badge", "title", "description"].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("loadOgFonts читает все файлы шрифта", async () => {
    const fonts = await loadOgFonts();

    expect(fonts).toHaveLength(OG_FONT_FILES.length);
    fonts.forEach((font, index) => {
      expect(font).toMatchObject({
        name: OG_FONT_FILES[index]?.name,
        weight: OG_FONT_FILES[index]?.weight,
      });
      // woff начинается с сигнатуры wOFF
      expect(font.data.subarray(0, 4).toString()).toBe("wOFF");
    });
  });
});
