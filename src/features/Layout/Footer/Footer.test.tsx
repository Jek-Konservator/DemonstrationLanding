import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Footer } from ".";
import ru from "../../../../dictionaries/ru.json";

describe("Footer", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("рендерит подвал с логотипом и дисклеймером", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: ru.Layout.Logo.label }),
    ).toBeInTheDocument();
    expect(screen.getByText(ru.Layout.Footer.disclaimer)).toBeInTheDocument();
  });

  it("подставляет текущий год в копирайт", () => {
    vi.useFakeTimers({ now: new Date("2030-05-01") });

    renderWithProviders(<Footer />);

    expect(screen.getByText("© 2030 AI Practicum")).toBeInTheDocument();
  });
});
