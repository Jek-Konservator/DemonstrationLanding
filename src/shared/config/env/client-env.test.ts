import { describe, expect, it, vi } from "vitest";
import { CLIENT_ENV, clientEnvSchema } from "./client-env";
import { validateEnv } from "./validate-env";

const SITE_URL = "https://example.com";

// CLIENT_ENV проверяется при импорте модуля — env нужен раньше импортов
vi.hoisted(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
});

describe("CLIENT_ENV", () => {
  it("берёт адрес сайта из process.env", () => {
    expect(CLIENT_ENV).toEqual({ NEXT_PUBLIC_SITE_URL: SITE_URL });
  });

  it("адрес сайта обязателен и должен быть URL", () => {
    expect(() => validateEnv(clientEnvSchema, {})).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
    expect(() =>
      validateEnv(clientEnvSchema, { NEXT_PUBLIC_SITE_URL: "not a url" }),
    ).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});
