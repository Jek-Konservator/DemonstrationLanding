import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Title } from ".";

describe("Title", () => {
  it("рендерит заголовок нужного уровня", () => {
    renderWithProviders(<Title order={2}>heading</Title>);

    expect(
      screen.getByRole("heading", { level: 2, name: "heading" }),
    ).toBeInTheDocument();
  });
});
