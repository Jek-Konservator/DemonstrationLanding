import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { LazyFeedbackForm } from ".";
import ru from "../../../../../../dictionaries/ru.json";

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

// Мок: запоминаем колбэк, чтобы вручную «прокрутить» секцию к экрану
let triggerIntersection: ObserverCallback = () => undefined;

class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();

  constructor(callback: ObserverCallback) {
    triggerIntersection = callback;
  }
}

describe("LazyFeedbackForm", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("пока секция далеко — формы нет, рядом с экраном — загружается", async () => {
    renderWithProviders(<LazyFeedbackForm />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();

    act(() => triggerIntersection([{ isIntersecting: true }]));

    // Ленивый import() формы в vitest компилирует react-hook-form, yup и imask —
    // под нагрузкой (покрытие, хук) дольше секунды по умолчанию
    expect(
      await screen.findByRole(
        "form",
        { name: ru.Sections.Feedback.form },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
  });
});
