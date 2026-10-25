import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import MainPage from ".";

describe("MainPage", () => {
  it("рендерит секции по порядку", () => {
    const { container } = renderWithProviders(
      <MainPage siteUrl="https://example.com" />,
    );

    const ids = [...container.querySelectorAll("section")].map(
      (section) => section.id,
    );

    expect(ids).toEqual([
      NAVIGATION_NAMES.main,
      NAVIGATION_NAMES.audience,
      NAVIGATION_NAMES.program,
      NAVIGATION_NAMES.teacher,
      NAVIGATION_NAMES.reviews,
      NAVIGATION_NAMES.pricing,
      NAVIGATION_NAMES.faq,
      NAVIGATION_NAMES.feedback,
    ]);
  });

  it("на странице есть JSON-LD", () => {
    const { container } = renderWithProviders(
      <MainPage siteUrl="https://example.com" />,
    );

    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).not.toBeNull();
  });

  it("на странице один h1", () => {
    renderWithProviders(<MainPage siteUrl="https://example.com" />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
