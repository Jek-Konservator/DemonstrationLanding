// Список языков сайта. Порядок: язык по умолчанию — первым
export const LOCALES = ["ru", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export const LOCALE_LABEL_MAP: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
};
