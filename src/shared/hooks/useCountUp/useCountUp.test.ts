import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCountUp } from ".";

describe("useCountUp", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("считает от 0 до цели за заданное время", () => {
    const { result } = renderHook(() => useCountUp(1200, { duration: 1000 }));

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBeGreaterThan(0);
    expect(result.current).toBeLessThan(1200);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(1200);
  });

  it("выключен или reduced motion — сразу цель", () => {
    const disabled = renderHook(() => useCountUp(24, { isEnabled: false }));

    expect(disabled.result.current).toBe(24);

    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as MediaQueryList);
    const reduced = renderHook(() => useCountUp(24));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(reduced.result.current).toBe(24);
  });
});
