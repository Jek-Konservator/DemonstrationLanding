import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { PricingCard } from ".";

const props = {
  buttonHref: "#feedback",
  buttonLabel: "button",
  description: "description",
  features: ["first", "second"],
  featuresLabel: "features",
  name: "name",
  price: "price",
};

describe("PricingCard", () => {
  it("рендерит тариф, список и кнопку-ссылку", () => {
    renderWithProviders(<PricingCard {...props} />);

    const features = screen.getByRole("list", { name: props.featuresLabel });

    expect(
      screen.getByRole("heading", { level: 3, name: props.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(props.price)).toBeInTheDocument();
    expect(
      within(features)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(props.features);
    expect(
      screen.getByRole("link", { name: props.buttonLabel }),
    ).toHaveAttribute("href", props.buttonHref);
  });

  it("без popularLabel плашки нет", () => {
    renderWithProviders(<PricingCard {...props} />);

    expect(screen.queryByText("popular")).not.toBeInTheDocument();
  });

  it("с popularLabel показывает плашку", () => {
    renderWithProviders(<PricingCard {...props} popularLabel="popular" />);

    expect(screen.getByText("popular")).toBeInTheDocument();
  });
});
