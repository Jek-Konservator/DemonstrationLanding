import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Logo } from ".";
import ru from "../../../../dictionaries/ru.json";

describe("Logo", () => {
  it("ведёт на главную текущего языка", () => {
    renderWithProviders(<Logo />);

    expect(
      screen.getByRole("link", { name: ru.Layout.Logo.label }),
    ).toHaveAttribute("href", "/ru");
  });
});
