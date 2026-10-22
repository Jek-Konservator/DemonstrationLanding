import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, scrollWindowTo } from "@shared/testing";
import { ScrollTop } from ".";
import ru from "../../../../dictionaries/ru.json";
import { SCROLL_TOP_THRESHOLD } from "./constants";

// Скрытая кнопка — aria-hidden, у неё нет доступного имени, ищем по aria-label
const getButton = () =>
  screen.getByLabelText(ru.Layout.ScrollTop.label, { selector: "button" });

describe("ScrollTop", () => {
  afterEach(() => {
    scrollWindowTo(0);
    vi.restoreAllMocks();
  });

  it("скрыта вверху страницы", () => {
    renderWithProviders(<ScrollTop />);

    expect(getButton()).toHaveAttribute("aria-hidden", "true");
    expect(getButton()).toHaveAttribute("tabindex", "-1");
  });

  it("появляется после прокрутки", () => {
    renderWithProviders(<ScrollTop />);

    scrollWindowTo(SCROLL_TOP_THRESHOLD + 1);

    expect(getButton()).toHaveAttribute("aria-hidden", "false");
    expect(getButton()).not.toHaveAttribute("tabindex");
  });

  it("по клику прокручивает наверх", async () => {
    const scrollTo = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);
    renderWithProviders(<ScrollTop />);
    scrollWindowTo(SCROLL_TOP_THRESHOLD + 1);

    await userEvent.click(getButton());

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });
});
