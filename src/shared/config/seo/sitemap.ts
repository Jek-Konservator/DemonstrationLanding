import type { MetadataRoute } from "next";
import { LOCALES } from "@shared/constants/internalization";
import { getAbsoluteUrl, getLanguageAlternates, getLocalePath } from "./seo";

// Абсолютные hreflang-адреса — в sitemap относительные не допускаются
const getAbsoluteAlternates = (siteUrl: string) =>
  Object.fromEntries(
    Object.entries(getLanguageAlternates()).map(([language, path]) => [
      language,
      getAbsoluteUrl(siteUrl, path),
    ]),
  );

// Одна страница — по записи на каждый язык, у каждой ссылки на все версии
export const getSitemap = (siteUrl: string): MetadataRoute.Sitemap =>
  LOCALES.map((locale) => ({
    url: getAbsoluteUrl(siteUrl, getLocalePath(locale)),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: getAbsoluteAlternates(siteUrl) },
  }));

export const getRobots = (siteUrl: string): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/", disallow: "/api/" },
  sitemap: getAbsoluteUrl(siteUrl, "/sitemap.xml"),
});
