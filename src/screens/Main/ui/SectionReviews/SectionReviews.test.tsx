import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionReviews } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { REVIEW_NAMES } from "./constants";

const texts = ru.Sections.Reviews;

describe("SectionReviews", () => {
  it("рендерит секцию с id и заголовком h2", () => {
    const { container } = renderWithProviders(
      <SectionReviews id={NAVIGATION_NAMES.reviews} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.reviews,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
  });

  it("рендерит все отзывы", () => {
    renderWithProviders(<SectionReviews id={NAVIGATION_NAMES.reviews} />);

    const list = screen.getByRole("list", { name: texts.listLabel });

    expect(within(list).getAllByRole("listitem")).toHaveLength(
      REVIEW_NAMES.length,
    );
    REVIEW_NAMES.forEach((name) => {
      expect(within(list).getByText(texts.list[name].name)).toBeInTheDocument();
    });
  });

  it("у стрелок есть подписи", () => {
    renderWithProviders(<SectionReviews id={NAVIGATION_NAMES.reviews} />);

    expect(
      screen.getByRole("button", { name: texts.previous }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: texts.next }),
    ).toBeInTheDocument();
  });
});
