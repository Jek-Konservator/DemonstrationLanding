import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useScrollCarousel } from ".";

// В jsdom нет раскладки: размеры ленты и позицию прокрутки задаём сами
const CLIENT_WIDTH = 300;
const SCROLL_WIDTH = 900;
let scrollLeft = 0;

const TestCarousel = () => {
  const { ref, canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useScrollCarousel();

  return (
    <>
      <ul data-testid="track" ref={ref} />
      <button disabled={!canScrollPrev} onClick={scrollPrev} type="button">
        prev
      </button>
      <button disabled={!canScrollNext} onClick={scrollNext} type="button">
        next
      </button>
    </>
  );
};

// Хук без ленты: ref ни к чему не привязан
const DetachedCarousel = () => {
  const { canScrollNext, scrollNext } = useScrollCarousel();

  return (
    <button onClick={scrollNext} type="button">
      {String(canScrollNext)}
    </button>
  );
};

const scrollTrackTo = (left: number) => {
  scrollLeft = left;
  fireEvent.scroll(screen.getByTestId("track"));
};

describe("useScrollCarousel", () => {
  beforeEach(() => {
    scrollLeft = 0;
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
      CLIENT_WIDTH,
    );
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(
      SCROLL_WIDTH,
    );
    vi.spyOn(Element.prototype, "scrollLeft", "get").mockImplementation(
      () => scrollLeft,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("в начале ленты листать можно только вперёд", () => {
    render(<TestCarousel />);

    expect(screen.getByRole("button", { name: "prev" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "next" })).toBeEnabled();
  });

  it("следит за прокруткой: в середине — в обе стороны, в конце — только назад", () => {
    render(<TestCarousel />);

    scrollTrackTo(300);

    expect(screen.getByRole("button", { name: "prev" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "next" })).toBeEnabled();

    scrollTrackTo(SCROLL_WIDTH - CLIENT_WIDTH);

    expect(screen.getByRole("button", { name: "prev" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "next" })).toBeDisabled();
  });

  it("листает на ширину видимой части, без плавности при reduced motion", async () => {
    const scrollBy = vi.fn();
    render(<TestCarousel />);
    // scrollBy в jsdom не реализован — подменяем у самой ленты
    screen.getByTestId("track").scrollBy = scrollBy;
    scrollTrackTo(300);

    await userEvent.click(screen.getByRole("button", { name: "next" }));

    expect(scrollBy).toHaveBeenLastCalledWith({
      left: CLIENT_WIDTH,
      behavior: "smooth",
    });

    vi.spyOn(window, "matchMedia").mockReturnValueOnce({
      matches: true,
    } as MediaQueryList);
    await userEvent.click(screen.getByRole("button", { name: "prev" }));

    expect(scrollBy).toHaveBeenLastCalledWith({
      left: -CLIENT_WIDTH,
      behavior: "auto",
    });
  });

  it("без ленты ничего не делает и не падает", async () => {
    render(<DetachedCarousel />);

    const button = screen.getByRole("button", { name: "false" });
    await userEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
