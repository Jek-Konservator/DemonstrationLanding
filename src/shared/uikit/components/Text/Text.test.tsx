import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Text } from ".";

describe("Text", () => {
  it("рендерит текст в переданном теге", () => {
    renderWithProviders(<Text component="span">text</Text>);

    expect(screen.getByText("text").tagName).toBe("SPAN");
  });
});
