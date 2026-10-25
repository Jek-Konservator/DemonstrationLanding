import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Burger } from ".";

describe("Burger", () => {
  it("рендерит кнопку с подписью", () => {
    renderWithProviders(<Burger aria-label="menu" opened={false} />);

    expect(screen.getByRole("button", { name: "menu" })).toBeInTheDocument();
  });
});
