import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALE_LABEL_MAP } from "@shared/constants/internalization";
import { renderWithProviders } from "@shared/testing";
import { LanguageSwitcher } from ".";

describe("LanguageSwitcher", () => {
  it("ведёт на главную каждого языка", () => {
    renderWithProviders(<LanguageSwitcher />);

    expect(
      screen.getByRole("link", { name: LOCALE_LABEL_MAP.ru }),
    ).toHaveAttribute("href", "/ru");
    expect(
      screen.getByRole("link", { name: LOCALE_LABEL_MAP.en }),
    ).toHaveAttribute("href", "/en");
  });

  it("отмечает текущий язык", () => {
    renderWithProviders(<LanguageSwitcher />);

    expect(
      screen.getByRole("link", { name: LOCALE_LABEL_MAP.ru }),
    ).toHaveAttribute("aria-current", "true");
    expect(
      screen.getByRole("link", { name: LOCALE_LABEL_MAP.en }),
    ).not.toHaveAttribute("aria-current");
  });
});
