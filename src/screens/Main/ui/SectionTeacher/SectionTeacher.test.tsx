import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionTeacher } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { TEACHER_FACT_NAMES } from "./constants";

const texts = ru.Sections.Teacher;

describe("SectionTeacher", () => {
  it("рендерит секцию с id, заголовком h2 и именем в h3", () => {
    const { container } = renderWithProviders(
      <SectionTeacher id={NAVIGATION_NAMES.teacher} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.teacher,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: texts.name }),
    ).toBeInTheDocument();
  });

  it("у иллюстрации есть подпись", () => {
    renderWithProviders(<SectionTeacher id={NAVIGATION_NAMES.teacher} />);

    expect(screen.getByRole("img", { name: texts.avatar })).toBeInTheDocument();
  });

  it("рендерит факты по порядку", () => {
    renderWithProviders(<SectionTeacher id={NAVIGATION_NAMES.teacher} />);

    const facts = screen
      .getAllByRole("listitem")
      .map((item) => item.textContent);

    expect(
      screen.getByRole("list", { name: texts.facts.label }),
    ).toBeInTheDocument();
    expect(facts).toEqual(TEACHER_FACT_NAMES.map((name) => texts.facts[name]));
  });
});
