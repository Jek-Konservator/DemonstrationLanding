import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionFaq } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { FAQ_NAMES } from "./constants";

const texts = ru.Sections.Faq;

describe("SectionFaq", () => {
  it("рендерит секцию с id и заголовком h2", () => {
    const { container } = renderWithProviders(
      <SectionFaq id={NAVIGATION_NAMES.faq} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.faq,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
  });

  it("рендерит вопросы по порядку заголовками h3", () => {
    renderWithProviders(<SectionFaq id={NAVIGATION_NAMES.faq} />);

    const questions = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(questions).toEqual(
      FAQ_NAMES.map((name) => texts.list[name].question),
    );
  });

  it("все вопросы закрыты, по клику открывается ответ", async () => {
    renderWithProviders(<SectionFaq id={NAVIGATION_NAMES.faq} />);

    const controls = screen.getAllByRole("button");
    const [first] = FAQ_NAMES;
    const control = screen.getByRole("button", {
      name: texts.list[first].question,
    });

    controls.forEach((item) => {
      expect(item).toHaveAttribute("aria-expanded", "false");
    });

    await userEvent.click(control);

    expect(control).toHaveAttribute("aria-expanded", "true");
  });
});
