import { object, string } from "yup";
import { validateEnv } from "./validate-env";

export const clientEnvSchema = object({
  NEXT_PUBLIC_SITE_URL: string().url().required(),
});

// NEXT_PUBLIC_* Next подставляет в браузерный код только при обращении
// по полному имени, поэтому переменные перечислены явно, а не process.env целиком
export const CLIENT_ENV = validateEnv(clientEnvSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
