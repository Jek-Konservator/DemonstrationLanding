import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { ReviewCard } from ".";
import { getInitials } from "./ReviewCard";

describe("ReviewCard", () => {
  it("рендерит итог, цитату и автора", () => {
    renderWithProviders(
      <ReviewCard
        color="teal"
        name="Анна Соколова"
        position="Бухгалтер"
        result="2 дня → 3 часа"
        text="Текст отзыва"
      />,
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("2 дня → 3 часа")).toBeInTheDocument();
    expect(screen.getByText("Текст отзыва").closest("blockquote")).not.toBe(
      null,
    );
    expect(screen.getByText("Анна Соколова")).toBeInTheDocument();
    expect(screen.getByText("Бухгалтер")).toBeInTheDocument();
  });

  it("getInitials: первые буквы имени и фамилии", () => {
    expect(getInitials("Анна Соколова")).toBe("АС");
    expect(getInitials("Igor Lebedev")).toBe("IL");
  });
});
