import { afterEach, describe, expect, it, vi } from "vitest";
import { request } from "@services/request";
import { createLead } from "./createLead";

const LEAD = {
  name: "Анна",
  phone: "+7 (999) 123-45-67",
  plan: "standard" as const,
  consent: true,
  website: "",
};

describe("createLead", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("отправляет заявку в /api/lead и возвращает ответ", async () => {
    const post = vi
      .spyOn(request, "post")
      .mockResolvedValue({ data: { ok: true } });

    await expect(createLead(LEAD)).resolves.toEqual({ ok: true });
    expect(post).toHaveBeenCalledWith("/lead", LEAD);
  });
});
