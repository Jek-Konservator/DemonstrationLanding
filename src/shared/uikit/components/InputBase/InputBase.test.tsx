import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { InputBase } from ".";

describe("InputBase", () => {
  it("рендерит переданный компонент поля", () => {
    renderWithProviders(
      <InputBase component="textarea" label="label" placeholder="text" />,
    );

    expect(screen.getByRole("textbox", { name: "label" }).tagName).toBe(
      "TEXTAREA",
    );
  });
});
