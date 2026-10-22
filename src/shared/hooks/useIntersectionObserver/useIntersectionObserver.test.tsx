import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIntersectionObserver } from ".";

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

// Мок: запоминаем колбэк, чтобы вручную «показывать» и «прятать» элемент
let triggerIntersection: ObserverCallback = () => undefined;
const observe = vi.fn();
const disconnect = vi.fn();

class IntersectionObserverMock {
  observe = observe;
  disconnect = disconnect;

  constructor(callback: ObserverCallback) {
    triggerIntersection = callback;
  }
}

const setIntersecting = (isIntersecting: boolean) => {
  act(() => triggerIntersection([{ isIntersecting }]));
};

const Probe = ({ once = false }: { once?: boolean }) => {
  const { ref, isVisible } = useIntersectionObserver({ once });

  return (
    <div data-testid="probe" data-visible={isVisible} ref={ref}>
      probe
    </div>
  );
};

const isProbeVisible = () => screen.getByTestId("probe").dataset.visible;

describe("useIntersectionObserver", () => {
  // Моки чистим перед тестом: cleanup из vitest.setup размонтирует компонент
  // уже после afterEach этого файла и вызовет disconnect прошлого теста
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("следит за элементом и сначала считает его скрытым", () => {
    render(<Probe />);

    expect(observe).toHaveBeenCalledWith(screen.getByTestId("probe"));
    expect(isProbeVisible()).toBe("false");
  });

  it("отслеживает появление и уход с экрана", () => {
    render(<Probe />);

    setIntersecting(true);
    expect(isProbeVisible()).toBe("true");

    setIntersecting(false);
    expect(isProbeVisible()).toBe("false");
  });

  it("с once перестаёт следить после первого появления", () => {
    render(<Probe once />);

    setIntersecting(false);
    expect(disconnect).not.toHaveBeenCalled();

    setIntersecting(true);
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("пустой список событий ничего не меняет", () => {
    render(<Probe />);

    act(() => triggerIntersection([]));

    expect(isProbeVisible()).toBe("false");
  });

  it("перестаёт следить при размонтировании", () => {
    const { unmount } = render(<Probe />);

    unmount();

    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("если ref не привязан, не следит ни за чем", () => {
    const Unattached = () => {
      const { isVisible } = useIntersectionObserver();

      return <div data-testid="probe" data-visible={isVisible} />;
    };

    render(<Unattached />);

    expect(observe).not.toHaveBeenCalled();
    expect(isProbeVisible()).toBe("false");
  });

  it("без IntersectionObserver сразу показывает элемент", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(<Probe />);

    expect(isProbeVisible()).toBe("true");
  });
});
