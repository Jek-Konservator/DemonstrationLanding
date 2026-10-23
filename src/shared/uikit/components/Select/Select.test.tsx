import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Select } from ".";

describe("Select", () => {
  it("выбирает пункт из списка", async () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Select
        data={[
          { value: "first", label: "First" },
          { value: "second", label: "Second" },
        ]}
        label="label"
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByRole("textbox", { name: "label" }));
    await userEvent.click(
      await screen.findByRole("option", { name: "Second" }),
    );

    expect(onChange).toHaveBeenCalledWith("second", expect.anything());
  });
});
