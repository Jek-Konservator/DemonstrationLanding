import type { Locale } from "@shared/constants/internalization";

// Ключи ошибок: yup-схемы пишут их в message, перевод — Errors.<name>
export const ERROR_NAMES = {
  required: "required",
  phone: "phone",
  tooLong: "tooLong",
  // Ошибка без своего перевода
  default: "default",
} as const;

export type ErrorName = keyof typeof ERROR_NAMES;

// Маска телефона по языку сайта: 0 — любая цифра
export const PHONE_MASKS: Record<Locale, string> = {
  ru: "+7 (000) 000-00-00",
  en: "+1 (000) 000-0000",
};

// Цифр в полном номере с кодом страны — у обеих масок одинаково
export const PHONE_DIGITS = 11;
