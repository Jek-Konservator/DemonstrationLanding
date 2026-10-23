import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@shared/constants/internalization";

// Open Graph ждёт локаль в формате language_TERRITORY
export const OG_LOCALES: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
};

// Все страницы — с префиксом языка (/ru, /en): так настроен роутинг next-intl
export const getLocalePath = (locale: Locale) => `/${locale}`;

// hreflang: каждая языковая версия + x-default для остальных языков
export const getLanguageAlternates = () => ({
  ...Object.fromEntries(
    LOCALES.map((locale) => [locale, getLocalePath(locale)]),
  ),
  "x-default": getLocalePath(DEFAULT_LOCALE),
});

export const getAbsoluteUrl = (siteUrl: string, path: string) =>
  new URL(path, siteUrl).toString();
