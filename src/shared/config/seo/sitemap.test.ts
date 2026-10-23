import { describe, expect, it } from "vitest";
import { getRobots, getSitemap } from "./sitemap";

const SITE_URL = "https://example.com";

const LANGUAGES = {
  ru: "https://example.com/ru",
  en: "https://example.com/en",
  "x-default": "https://example.com/ru",
};

describe("sitemap", () => {
  it("по записи на язык с абсолютными адресами всех версий", () => {
    expect(getSitemap(SITE_URL)).toEqual([
      expect.objectContaining({
        url: "https://example.com/ru",
        alternates: { languages: LANGUAGES },
      }),
      expect.objectContaining({
        url: "https://example.com/en",
        alternates: { languages: LANGUAGES },
      }),
    ]);
  });

  it("robots: всё открыто, кроме API, ссылка на sitemap", () => {
    expect(getRobots(SITE_URL)).toEqual({
      rules: { userAgent: "*", allow: "/", disallow: "/api/" },
      sitemap: "https://example.com/sitemap.xml",
    });
  });
});
