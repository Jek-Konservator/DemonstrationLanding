import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDisclosure } from ".";

describe("useDisclosure", () => {
  it("открывает и закрывает", () => {
    const { result } = renderHook(() => useDisclosure(false));

    act(() => result.current[1].open());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].close());
    expect(result.current[0]).toBe(false);
  });
});
