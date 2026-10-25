import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionAudience } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { AUDIENCE_NAMES } from "./constants";

const texts = ru.Sections.Audience;

describe("SectionAudience", () => {
  it("рендерит секцию с id и заголовком h2", () => {
    const { container } = renderWithProviders(
      <SectionAudience id={NAVIGATION_NAMES.audience} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.audience,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
  });

  it("рендерит карточку для каждой аудитории по порядку", () => {
    renderWithProviders(<SectionAudience id={NAVIGATION_NAMES.audience} />);

    const cardTitles = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(screen.getAllByRole("listitem")).toHaveLength(AUDIENCE_NAMES.length);
    expect(cardTitles).toEqual(
      AUDIENCE_NAMES.map((name) => texts.list[name].name),
    );
  });
});
