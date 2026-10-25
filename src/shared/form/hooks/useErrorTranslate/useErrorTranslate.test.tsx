import type { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import { useErrorTranslate } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { ERROR_NAMES } from "../../constants";

const wrapper = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider locale="ru" messages={ru}>
    {children}
  </NextIntlClientProvider>
);

describe("useErrorTranslate", () => {
  it("переводит ключ ошибки", () => {
    const { result } = renderHook(useErrorTranslate, { wrapper });

    expect(result.current(ERROR_NAMES.phone)).toBe(ru.Errors.phone);
  });

  it("неизвестная ошибка — общий текст, нет ошибки — undefined", () => {
    const { result } = renderHook(useErrorTranslate, { wrapper });

    expect(result.current("something else")).toBe(ru.Errors.default);
    expect(result.current(undefined)).toBeUndefined();
  });
});
