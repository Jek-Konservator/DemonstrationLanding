import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { scrollWindowTo } from "@shared/testing";
import { useIsScrolled } from ".";

describe("useIsScrolled", () => {
  afterEach(() => {
    scrollWindowTo(0);
  });

  it("вверху страницы — false, после прокрутки — true, обратно — false", () => {
    const { result } = renderHook(() => useIsScrolled());

    expect(result.current).toBe(false);

    scrollWindowTo(10);

    expect(result.current).toBe(true);

    scrollWindowTo(0);

    expect(result.current).toBe(false);
  });

  it("учитывает порог", () => {
    const { result } = renderHook(() => useIsScrolled(100));

    scrollWindowTo(50);

    expect(result.current).toBe(false);

    scrollWindowTo(150);

    expect(result.current).toBe(true);
  });
});
