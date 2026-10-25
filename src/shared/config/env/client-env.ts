import { object, string } from "yup";
import { validateEnv } from "./validate-env";

// Не string().url(): регулярка yup не принимает адреса без зоны, например
// http://localhost:3000, — а он нужен локально и в CI
export const isHttpUrl = (value: string) => {
  try {
    const { protocol } = new URL(value);

    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

export const clientEnvSchema = object({
  NEXT_PUBLIC_SITE_URL: string()
    .required()
    .test(
      "http-url",
      "NEXT_PUBLIC_SITE_URL — адрес сайта с http:// или https://",
      isHttpUrl,
    ),
});

// NEXT_PUBLIC_* Next подставляет в браузерный код только при обращении
// по полному имени, поэтому переменные перечислены явно, а не process.env целиком
export const CLIENT_ENV = validateEnv(clientEnvSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
