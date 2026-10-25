import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Container } from ".";

describe("Container", () => {
  it("рендерит содержимое", () => {
    renderWithProviders(<Container>content</Container>);

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("по умолчанию имеет размер lg из темы", () => {
    renderWithProviders(<Container>content</Container>);

    expect(screen.getByText("content")).toHaveAttribute("data-size", "lg");
  });
});
