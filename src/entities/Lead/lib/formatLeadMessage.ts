import ru from "../../../../dictionaries/ru.json";
import type { Lead } from "../model/schema";

// Служебное сообщение владельцу школы в Telegram — всегда на русском.
// Подписи полей — не текст сайта, поэтому здесь, а не в словарях
export const formatLeadMessage = ({ name, phone, plan }: Lead) =>
  [
    "Новая заявка на курс",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Тариф: ${ru.Sections.Pricing.list[plan].name}`,
  ].join("\n");
