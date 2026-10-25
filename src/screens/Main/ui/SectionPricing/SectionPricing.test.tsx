import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionPricing } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { PRICING_FEATURES, PRICING_NAMES } from "./constants";

const texts = ru.Sections.Pricing;

describe("SectionPricing", () => {
  it("рендерит секцию с id и заголовком h2", () => {
    const { container } = renderWithProviders(
      <SectionPricing id={NAVIGATION_NAMES.pricing} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.pricing,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
  });

  it("рендерит тарифы по порядку с их составом", () => {
    renderWithProviders(<SectionPricing id={NAVIGATION_NAMES.pricing} />);

    const names = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(names).toEqual(PRICING_NAMES.map((name) => texts.list[name].name));
    PRICING_NAMES.forEach((name) => {
      const features = screen.getByRole("list", {
        name: texts.featuresLabel.replace("{name}", texts.list[name].name),
      });

      expect(features.children).toHaveLength(PRICING_FEATURES[name].length);
    });
  });

  it("плашка «Популярный» одна, кнопки ведут к форме", () => {
    renderWithProviders(<SectionPricing id={NAVIGATION_NAMES.pricing} />);

    const buttons = screen.getAllByRole("link", { name: texts.button });

    expect(screen.getAllByText(texts.popular)).toHaveLength(1);
    expect(buttons).toHaveLength(PRICING_NAMES.length);
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("href", `#${NAVIGATION_NAMES.feedback}`);
    });
  });
});
