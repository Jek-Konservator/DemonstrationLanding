import { afterEach, describe, expect, it, vi } from "vitest";
import { sendTelegramMessage } from ".";

const PARAMS = { chatId: "42", text: "text", token: "token" };

describe("sendTelegramMessage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("отправляет текст в чат через Bot API", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}"));

    vi.stubGlobal("fetch", fetchMock);

    await sendTelegramMessage(PARAMS);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.telegram.org/bottoken/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ chat_id: "42", text: "text" }),
      }),
    );
  });

  it("ответ с ошибкой — исключение", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("{}", { status: 401 })),
    );

    await expect(sendTelegramMessage(PARAMS)).rejects.toThrow("401");
  });
});
