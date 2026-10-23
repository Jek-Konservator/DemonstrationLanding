import { useTranslations } from "next-intl";
import { ERROR_NAMES, type ErrorName } from "../../constants";

const isErrorName = (message: string): message is ErrorName =>
  Object.hasOwn(ERROR_NAMES, message);

// Ключ ошибки из yup → текст на языке сайта
export const useErrorTranslate = () => {
  const translate = useTranslations("Errors");

  return (message?: string) => {
    if (!message) {
      return undefined;
    }

    return translate(isErrorName(message) ? message : ERROR_NAMES.default);
  };
};
