import { ERROR_NAMES } from "@form/constants";
import { describe, expect, it } from "vitest";
import { LEAD_NAME_MAX_LENGTH, leadSchema } from "./schema";

const LEAD = {
  name: "Анна",
  phone: "+7 (999) 123-45-67",
  plan: "standard",
  consent: true,
};

const getErrors = (value: unknown) => {
  try {
    leadSchema.validateSync(value, { abortEarly: false });
    return [];
  } catch (error) {
    return error instanceof Error && "errors" in error ? error.errors : [];
  }
};

describe("leadSchema", () => {
  it("принимает заявку, honeypot по умолчанию пустой", () => {
    expect(leadSchema.validateSync(LEAD)).toEqual({ ...LEAD, website: "" });
  });

  it("неизвестный тариф и без согласия — ошибки", () => {
    expect(getErrors({ ...LEAD, plan: "vip", consent: false })).toEqual([
      ERROR_NAMES.required,
      ERROR_NAMES.required,
    ]);
  });

  it("имя ограничено по длине", () => {
    expect(
      getErrors({ ...LEAD, name: "а".repeat(LEAD_NAME_MAX_LENGTH + 1) }),
    ).toEqual([ERROR_NAMES.tooLong]);
  });
});
