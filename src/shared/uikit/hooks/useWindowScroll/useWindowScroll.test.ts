import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { scrollWindowTo } from "@shared/testing";
import { useWindowScroll } from ".";

describe("useWindowScroll", () => {
  afterEach(() => {
    scrollWindowTo(0);
  });

  it("отдаёт позицию прокрутки окна", () => {
    const { result } = renderHook(() => useWindowScroll());

    scrollWindowTo(500);

    expect(result.current[0].y).toBe(500);
  });
});
