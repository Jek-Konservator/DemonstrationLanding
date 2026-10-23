import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SERVER_ENV } from "@shared/config/env/server-env";
import { sendTelegramMessage } from "@services/telegram";
import { POST } from "./route";

vi.mock("@services/telegram", () => ({ sendTelegramMessage: vi.fn() }));
vi.mock("@shared/config/env/server-env", () => ({ SERVER_ENV: {} }));

const LEAD = {
  name: "Анна",
  phone: "+7 (999) 123-45-67",
  plan: "standard",
  consent: true,
};

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/lead", {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

describe("POST /api/lead", () => {
  beforeEach(() => {
    Object.assign(SERVER_ENV, {
      TELEGRAM_BOT_TOKEN: "token",
      TELEGRAM_CHAT_ID: "42",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("валидная заявка — отправляет в Telegram и отвечает ok", async () => {
    const response = await post(LEAD);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sendTelegramMessage).toHaveBeenCalledWith(
      expect.objectContaining({ chatId: "42", token: "token" }),
    );
  });

  it("невалидная заявка или не JSON — 400 без отправки", async () => {
    expect((await post({ ...LEAD, phone: "123" })).status).toBe(400);
    expect((await post("not json")).status).toBe(400);
    expect(sendTelegramMessage).not.toHaveBeenCalled();
  });

  it("заполнен honeypot — ok без отправки", async () => {
    const response = await post({ ...LEAD, website: "https://spam.example" });

    expect(await response.json()).toEqual({ ok: true });
    expect(sendTelegramMessage).not.toHaveBeenCalled();
  });

  it("демо-режим без ключей — ok без отправки", async () => {
    Object.assign(SERVER_ENV, {
      TELEGRAM_BOT_TOKEN: undefined,
      TELEGRAM_CHAT_ID: undefined,
    });

    const response = await post(LEAD);

    expect(await response.json()).toEqual({ ok: true });
    expect(sendTelegramMessage).not.toHaveBeenCalled();
  });

  it("Telegram недоступен — 502 без деталей", async () => {
    vi.mocked(sendTelegramMessage).mockRejectedValueOnce(new Error("down"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await post(LEAD);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false });
  });
});
