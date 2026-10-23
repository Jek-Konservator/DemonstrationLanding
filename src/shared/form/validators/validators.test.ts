import { describe, expect, it } from "vitest";
import { isPhoneComplete, phone, requiredString } from ".";
import { ERROR_NAMES } from "../constants";

const getError = (validate: () => unknown) => {
  try {
    validate();
  } catch (error) {
    return error instanceof Error ? error.message : undefined;
  }
  return undefined;
};

describe("validators", () => {
  it("isPhoneComplete считает только цифры", () => {
    expect(isPhoneComplete("+7 (999) 123-45-67")).toBe(true);
    expect(isPhoneComplete("+1 (555) 123-4567")).toBe(true);
    expect(isPhoneComplete("+7 (999) 123-45")).toBe(false);
  });

  it("requiredString: обрезает пробелы, обязательна, ограничена по длине", () => {
    const schema = requiredString(5);

    expect(schema.validateSync("  Анна ")).toBe("Анна");
    expect(getError(() => schema.validateSync("   "))).toBe(
      ERROR_NAMES.required,
    );
    expect(getError(() => schema.validateSync("слишком"))).toBe(
      ERROR_NAMES.tooLong,
    );
  });

  it("phone: обязателен и должен быть полным", () => {
    const schema = phone();

    expect(schema.validateSync("+7 (999) 123-45-67")).toBe(
      "+7 (999) 123-45-67",
    );
    expect(getError(() => schema.validateSync(""))).toBe(ERROR_NAMES.required);
    expect(getError(() => schema.validateSync("+7 (999)"))).toBe(
      ERROR_NAMES.phone,
    );
  });
});
