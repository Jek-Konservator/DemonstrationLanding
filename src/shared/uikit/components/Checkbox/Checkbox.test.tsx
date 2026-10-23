import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Checkbox } from ".";

describe("Checkbox", () => {
  it("переключается по клику на подпись", async () => {
    renderWithProviders(<Checkbox label="label" />);

    const checkbox = screen.getByRole("checkbox", { name: "label" });

    await userEvent.click(screen.getByText("label"));

    expect(checkbox).toBeChecked();
  });
});
