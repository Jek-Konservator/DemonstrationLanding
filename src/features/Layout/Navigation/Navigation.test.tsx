import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { Navigation } from ".";
import ru from "../../../../dictionaries/ru.json";
import { NAVIGATION_ITEMS } from "./constants";

describe("Navigation", () => {
  it("рендерит пункты меню с якорями на секции", () => {
    renderWithProviders(<Navigation />);

    NAVIGATION_ITEMS.forEach((name) => {
      expect(
        screen.getByRole("link", { name: ru.Layout.Header.navigation[name] }),
      ).toHaveAttribute("href", `#${NAVIGATION_NAMES[name]}`);
    });
  });

  it("сообщает о клике по пункту", async () => {
    const onItemClick = vi.fn();
    renderWithProviders(<Navigation onItemClick={onItemClick} />);

    await userEvent.click(
      screen.getByRole("link", { name: ru.Layout.Header.navigation.program }),
    );

    expect(onItemClick).toHaveBeenCalledOnce();
  });
});
