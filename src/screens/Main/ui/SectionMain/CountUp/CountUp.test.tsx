import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CountUp } from ".";

// Видимая строка; невидимая (aria-hidden) только держит ширину
const getCurrent = (container: HTMLElement) =>
  container.querySelector(".current")?.textContent;

describe("CountUp", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("считает до значения из словаря, сохраняя формат", () => {
    // В jsdom нет IntersectionObserver — хук считает блок видимым сразу
    const { container } = render(<CountUp value="1 200+" />);

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(getCurrent(container)).toBe("0+");
    // Пока считается — моноширинные цифры
    expect(container.querySelector(".current")).toHaveClass("isCounting");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(getCurrent(container)).toBe("1 200+");
    expect(container.querySelector(".current")).not.toHaveClass("isCounting");
    expect(container.querySelector(".ghost")).toHaveTextContent("1 200+");
  });

  it("не число — выводит как есть", () => {
    const { container } = render(<CountUp value="много" />);

    expect(getCurrent(container)).toBe("много");
  });
});
