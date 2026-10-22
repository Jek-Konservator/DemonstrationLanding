import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import MainPage from ".";
import ru from "../../../dictionaries/ru.json";

describe("MainPage", () => {
  it("рендерит заголовок первого экрана", () => {
    renderWithProviders(<MainPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: ru.Sections.Main.title,
      }),
    ).toBeInTheDocument();
  });

  it("рендерит описание курса", () => {
    renderWithProviders(<MainPage />);

    expect(screen.getByText(ru.Sections.Main.description)).toBeInTheDocument();
  });
});
