import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Button } from ".";

describe("Button", () => {
  it("рендерит кнопку с текстом", () => {
    renderWithProviders(<Button>label</Button>);

    expect(screen.getByRole("button", { name: "label" })).toBeInTheDocument();
  });

  it("рендерится ссылкой через component", () => {
    renderWithProviders(
      <Button component="a" href="#feedback">
        label
      </Button>,
    );

    expect(screen.getByRole("link", { name: "label" })).toHaveAttribute(
      "href",
      "#feedback",
    );
  });
});
