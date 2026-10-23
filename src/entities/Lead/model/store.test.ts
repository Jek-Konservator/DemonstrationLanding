import { allSettled, fork } from "effector";
import { afterEach, describe, expect, it, vi } from "vitest";
import { request } from "@services/request";
import { createLeadQuery } from "./store";

const LEAD = {
  name: "Анна",
  phone: "+7 (999) 123-45-67",
  plan: "standard" as const,
  consent: true,
  website: "",
};

describe("createLeadQuery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("успешная отправка — $succeeded, reset сбрасывает состояние", async () => {
    vi.spyOn(request, "post").mockResolvedValue({ data: { ok: true } });

    const scope = fork();

    await allSettled(createLeadQuery.start, { scope, params: LEAD });

    expect(scope.getState(createLeadQuery.$succeeded)).toBe(true);
    expect(scope.getState(createLeadQuery.$data)).toEqual({ ok: true });

    await allSettled(createLeadQuery.reset, { scope });

    expect(scope.getState(createLeadQuery.$succeeded)).toBe(false);
  });

  it("ошибка запроса — $failed", async () => {
    vi.spyOn(request, "post").mockRejectedValue(new Error("Network Error"));

    const scope = fork();

    await allSettled(createLeadQuery.start, { scope, params: LEAD });

    expect(scope.getState(createLeadQuery.$failed)).toBe(true);
  });
});
