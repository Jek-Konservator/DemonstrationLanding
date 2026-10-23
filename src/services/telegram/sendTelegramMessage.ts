import "server-only";

interface SendTelegramMessageParams {
  chatId: string;
  text: string;
  token: string;
}

const TELEGRAM_API_URL = "https://api.telegram.org";

// Только сервер: токен бота не должен попасть в браузер.
// Текст уходит без parse_mode — разметка из заявки не интерпретируется
export const sendTelegramMessage = async ({
  chatId,
  text,
  token,
}: SendTelegramMessageParams) => {
  const response = await fetch(`${TELEGRAM_API_URL}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) {
    throw new Error(`Telegram ответил ${response.status}`);
  }
};
