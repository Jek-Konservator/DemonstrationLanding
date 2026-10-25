import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { HeroChat } from ".";
import ru from "../../../../../../dictionaries/ru.json";
import { CHAT_ANSWER_NAMES } from "./constants";

const texts = ru.Sections.Main.chat;

describe("HeroChat", () => {
  it("для скринридера — одна картинка с подписью", () => {
    renderWithProviders(<HeroChat />);

    expect(screen.getByRole("img", { name: texts.label })).toBeInTheDocument();
  });

  it("рендерит вопрос, файл, ответ по пунктам и итог", () => {
    renderWithProviders(<HeroChat />);

    expect(screen.getByText(texts.question)).toBeInTheDocument();
    expect(screen.getByText(texts.file)).toBeInTheDocument();
    expect(screen.getByText(texts.answer.title)).toBeInTheDocument();
    CHAT_ANSWER_NAMES.forEach((name) => {
      expect(screen.getByText(texts.answer[name])).toBeInTheDocument();
    });
    expect(screen.getByText(texts.saved)).toBeInTheDocument();
  });
});
