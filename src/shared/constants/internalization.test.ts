import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, LOCALE_LABEL_MAP, LOCALES } from "./internalization";

describe("internalization", () => {
  it("язык по умолчанию входит в список языков", () => {
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("у каждого языка есть подпись", () => {
    LOCALES.forEach((locale) => {
      expect(LOCALE_LABEL_MAP[locale]).toBeTruthy();
    });
  });
});
