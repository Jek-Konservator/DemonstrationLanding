import { string } from "yup";
import { ERROR_NAMES, PHONE_DIGITS } from "../constants";

export const isPhoneComplete = (value: string) =>
  value.replace(/\D/g, "").length === PHONE_DIGITS;

// Готовые yup-поля: сообщения — ключи ERROR_NAMES
export const requiredString = (max: number) =>
  string().trim().required(ERROR_NAMES.required).max(max, ERROR_NAMES.tooLong);

export const phone = () =>
  string()
    .required(ERROR_NAMES.required)
    .test(ERROR_NAMES.phone, ERROR_NAMES.phone, isPhoneComplete);
