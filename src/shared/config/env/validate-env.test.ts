import { describe, expect, it } from "vitest";
import { object, string } from "yup";
import { validateEnv } from "./validate-env";

const schema = object({ KEY: string().required() });

describe("validateEnv", () => {
  it("возвращает значения схемы и отбрасывает лишние", () => {
    expect(validateEnv(schema, { KEY: "value", PATH: "/usr/bin" })).toEqual({
      KEY: "value",
    });
  });

  it("ошибки валидации — одной понятной ошибкой", () => {
    expect(() => validateEnv(schema, {})).toThrow(
      /Неверные переменные окружения: .*KEY/,
    );
  });

  it("прочие ошибки пробрасывает как есть", () => {
    const error = new Error("boom");
    const brokenSchema = schema.transform(() => {
      throw error;
    });

    expect(() => validateEnv(brokenSchema, { KEY: "value" })).toThrow(error);
  });
});
