import { object, string } from "yup";
import { validateEnv } from "./validate-env";

// Пустая строка из .env (KEY=) считается отсутствующим значением
const optionalString = () =>
  string()
    .optional()
    .transform((value?: string) => (value === "" ? undefined : value));

export const serverEnvSchema = object({
  TELEGRAM_BOT_TOKEN: optionalString(),
  TELEGRAM_CHAT_ID: optionalString(),
}).test(
  "telegram",
  "TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID задаются вместе",
  ({ TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID }) =>
    Boolean(TELEGRAM_BOT_TOKEN) === Boolean(TELEGRAM_CHAT_ID),
);

// Только для сервера: route handlers и серверные компоненты.
// Без ключей Telegram заявки не отправляются — демо-режим.
export const SERVER_ENV = validateEnv(serverEnvSchema, process.env);
