import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import type ru from "../../../../dictionaries/ru.json";
import { routing } from "./routing";

type Messages = typeof ru;

// Конфиг next-intl для серверных компонентов: язык запроса + словарь
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const dictionary = (await import(
    `../../../../dictionaries/${locale}.json`
  )) as { default: Messages };

  return { locale, messages: dictionary.default };
});
