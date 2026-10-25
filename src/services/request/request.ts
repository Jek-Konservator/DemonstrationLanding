import { create } from "axios";

// Клиент для браузера: только свои route handlers (/api/*), без токенов
export const request = create({
  baseURL: "/api",
  timeout: 10_000,
});
