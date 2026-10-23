import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionFeedback } from ".";
import ru from "../../../../../dictionaries/ru.json";

const texts = ru.Sections.Feedback;

describe("SectionFeedback", () => {
  it("рендерит секцию с id, заголовком h2 и формой", () => {
    const { container } = renderWithProviders(
      <SectionFeedback id={NAVIGATION_NAMES.feedback} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.feedback,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("form", { name: texts.form })).toBeInTheDocument();
  });
});
