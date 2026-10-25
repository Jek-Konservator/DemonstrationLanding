import { ERROR_NAMES } from "@form/constants";
import { phone, requiredString } from "@form/validators";
import { boolean, mixed, object, string, type InferType } from "yup";
import { PLAN_NAMES, type PlanName } from "@shared/constants/plans";

export const LEAD_NAME_MAX_LENGTH = 100;

// Одна схема для формы и для /api/lead: сервер проверяет тело запроса ей же
export const leadSchema = object({
  name: requiredString(LEAD_NAME_MAX_LENGTH),
  phone: phone(),
  plan: mixed<PlanName>()
    .oneOf(PLAN_NAMES, ERROR_NAMES.required)
    .required(ERROR_NAMES.required),
  consent: boolean()
    .oneOf([true], ERROR_NAMES.required)
    .required(ERROR_NAMES.required),
  // Honeypot: поле скрыто от людей, его заполняют только боты
  website: string().default(""),
});

export type Lead = InferType<typeof leadSchema>;
