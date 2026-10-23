import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { TextInput } from ".";

describe("TextInput", () => {
  it("связывает поле с подписью и ошибкой", () => {
    renderWithProviders(<TextInput error="error" label="label" />);

    const input = screen.getByRole("textbox", { name: "label" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("error");
  });
});
