import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { SectionProgram } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { PROGRAM_NAMES } from "./constants";

const texts = ru.Sections.Program;

const getControl = (name: (typeof PROGRAM_NAMES)[number]) =>
  screen.getByRole("button", { name: new RegExp(texts.list[name].name) });

describe("SectionProgram", () => {
  it("рендерит секцию с id и заголовком h2", () => {
    const { container } = renderWithProviders(
      <SectionProgram id={NAVIGATION_NAMES.program} />,
    );

    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      NAVIGATION_NAMES.program,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: texts.title }),
    ).toBeInTheDocument();
  });

  it("рендерит модули по порядку заголовками h3", () => {
    renderWithProviders(<SectionProgram id={NAVIGATION_NAMES.program} />);

    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual(
      PROGRAM_NAMES.map(
        (name, index) =>
          texts.week.replace("{number}", String(index + 1)) +
          texts.list[name].name,
      ),
    );
  });

  it("первый модуль открыт, по клику открывается другой", async () => {
    renderWithProviders(<SectionProgram id={NAVIGATION_NAMES.program} />);

    expect(getControl("basics")).toHaveAttribute("aria-expanded", "true");
    expect(getControl("prompts")).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(getControl("prompts"));

    expect(getControl("basics")).toHaveAttribute("aria-expanded", "false");
    expect(getControl("prompts")).toHaveAttribute("aria-expanded", "true");
  });
});
