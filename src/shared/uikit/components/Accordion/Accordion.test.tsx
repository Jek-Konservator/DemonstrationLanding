import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Accordion } from ".";

describe("Accordion", () => {
  it("раскрывает пункт по клику", async () => {
    renderWithProviders(
      <Accordion>
        <Accordion.Item value="item">
          <Accordion.Control>control</Accordion.Control>
          <Accordion.Panel>panel</Accordion.Panel>
        </Accordion.Item>
      </Accordion>,
    );

    const control = screen.getByRole("button", { name: "control" });

    expect(control).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(control);

    expect(control).toHaveAttribute("aria-expanded", "true");
  });
});
