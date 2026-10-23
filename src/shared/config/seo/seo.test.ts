import { describe, expect, it } from "vitest";
import { LOCALES } from "@shared/constants/internalization";
import {
  getAbsoluteUrl,
  getLanguageAlternates,
  getLocalePath,
  OG_LOCALES,
} from "./seo";

describe("seo", () => {
  it("путь страницы — с префиксом языка", () => {
    expect(getLocalePath("en")).toBe("/en");
  });

  it("hreflang: все языки и x-default на язык по умолчанию", () => {
    expect(getLanguageAlternates()).toEqual({
      ru: "/ru",
      en: "/en",
      "x-default": "/ru",
    });
  });

  it("OG-локаль есть у каждого языка", () => {
    LOCALES.forEach((locale) => {
      expect(OG_LOCALES[locale]).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    });
  });

  it("абсолютный адрес — от адреса сайта, без двойных слешей", () => {
    expect(getAbsoluteUrl("https://example.com/", "/ru")).toBe(
      "https://example.com/ru",
    );
  });
});
