import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders, scrollWindowTo } from "@shared/testing";
import { Header } from ".";
import ru from "../../../../dictionaries/ru.json";

const texts = ru.Layout.Header;

const openMenu = async () => {
  await userEvent.click(screen.getByRole("button", { name: texts.openMenu }));

  return screen.findByRole("dialog", { name: texts.menu });
};

describe("Header", () => {
  it("рендерит шапку с логотипом, навигацией и кнопкой записи", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: ru.Layout.Logo.label }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: texts.navigation.label }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: texts.cta })).toHaveAttribute(
      "href",
      `#${NAVIGATION_NAMES.feedback}`,
    );
  });

  it("бургер открывает мобильное меню", async () => {
    renderWithProviders(<Header />);

    const menu = await openMenu();

    expect(
      within(menu).getByRole("link", { name: texts.navigation.program }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: texts.closeMenu })[0],
    ).toBeInTheDocument();
  });

  it("клик по пункту меню закрывает его", async () => {
    renderWithProviders(<Header />);

    const menu = await openMenu();
    await userEvent.click(
      within(menu).getByRole("link", { name: texts.navigation.program }),
    );

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("при прокрутке страницы шапка получает тень", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("banner")).not.toHaveClass("isScrolled");

    scrollWindowTo(200);

    expect(screen.getByRole("banner")).toHaveClass("isScrolled");

    scrollWindowTo(0);
  });
});
