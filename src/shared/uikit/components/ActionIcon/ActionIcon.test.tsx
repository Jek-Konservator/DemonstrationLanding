import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { ActionIcon } from ".";

describe("ActionIcon", () => {
  it("рендерит кнопку-иконку с подписью", () => {
    renderWithProviders(<ActionIcon aria-label="up" />);

    expect(screen.getByRole("button", { name: "up" })).toBeInTheDocument();
  });
});
