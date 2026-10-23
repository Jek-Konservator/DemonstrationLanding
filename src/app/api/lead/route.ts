import { NextResponse } from "next/server";
import { SERVER_ENV } from "@shared/config/env/server-env";
import { sendTelegramMessage } from "@services/telegram";
import { formatLeadMessage } from "@entities/Lead/lib/formatLeadMessage";
import { leadSchema, type Lead } from "@entities/Lead/model/schema";

// Ответы без деталей: клиенту не нужно знать, что именно не так на сервере
const ok = () => NextResponse.json({ ok: true });
const fail = (status: number) => NextResponse.json({ ok: false }, { status });

const parseLead = async (request: Request): Promise<Lead | null> => {
  try {
    return await leadSchema.validate(await request.json(), {
      stripUnknown: true,
    });
  } catch {
    return null;
  }
};

export const POST = async (request: Request) => {
  const lead = await parseLead(request);

  if (!lead) {
    return fail(400);
  }

  // Honeypot заполнен — это бот: отвечаем успехом, но ничего не отправляем
  if (lead.website) {
    return ok();
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = SERVER_ENV;

  // Демо-режим: ключей Telegram нет — заявка проверена, но не отправляется
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return ok();
  }

  try {
    await sendTelegramMessage({
      chatId: TELEGRAM_CHAT_ID,
      text: formatLeadMessage(lead),
      token: TELEGRAM_BOT_TOKEN,
    });
  } catch (error) {
    // Лог сервера (Vercel): без него упавшую отправку не найти
    console.error("Заявка не отправлена в Telegram", error);
    return fail(502);
  }

  return ok();
};
