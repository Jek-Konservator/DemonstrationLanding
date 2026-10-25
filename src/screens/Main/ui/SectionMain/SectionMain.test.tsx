import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionMain } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { STAT_NAMES } from "./constants";

const texts = ru.Sections.Main;

describe("SectionMain", () => {
  it("рендерит секцию с id и заголовком h1", () => {
    const { container } = renderWithProviders(
      <SectionMain id={NAVIGATION_NAMES.main} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.main,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: texts.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(texts.description)).toBeInTheDocument();
  });

  it("кнопки ведут к форме и к программе", () => {
    renderWithProviders(<SectionMain id={NAVIGATION_NAMES.main} />);

    expect(
      screen.getByRole("link", { name: texts.primaryButton }),
    ).toHaveAttribute("href", `#${NAVIGATION_NAMES.feedback}`);
    expect(
      screen.getByRole("link", { name: texts.secondaryButton }),
    ).toHaveAttribute("href", `#${NAVIGATION_NAMES.program}`);
  });

  it("рендерит цифры курса", () => {
    renderWithProviders(<SectionMain id={NAVIGATION_NAMES.main} />);

    const stats = screen.getByRole("list", { name: texts.stats.label });

    expect(within(stats).getAllByRole("listitem")).toHaveLength(
      STAT_NAMES.length,
    );
    STAT_NAMES.forEach((name) => {
      expect(
        within(stats).getByText(texts.stats[name].label),
      ).toBeInTheDocument();
    });
  });
});
