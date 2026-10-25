import { describe, expect, it } from "vitest";
import { SERVER_ENV, serverEnvSchema } from "./server-env";
import { validateEnv } from "./validate-env";

const TELEGRAM = { TELEGRAM_BOT_TOKEN: "token", TELEGRAM_CHAT_ID: "42" };

describe("SERVER_ENV", () => {
  it("без ключей Telegram — демо-режим, пустые строки не считаются", () => {
    expect(SERVER_ENV).toEqual({});
    expect(
      validateEnv(serverEnvSchema, {
        TELEGRAM_BOT_TOKEN: "",
        TELEGRAM_CHAT_ID: "",
      }),
    ).toEqual({});
  });

  it("принимает оба ключа Telegram", () => {
    expect(validateEnv(serverEnvSchema, TELEGRAM)).toEqual(TELEGRAM);
  });

  it("только один ключ Telegram — ошибка", () => {
    expect(() =>
      validateEnv(serverEnvSchema, { TELEGRAM_BOT_TOKEN: "token" }),
    ).toThrow(/TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID задаются вместе/);
  });
});
