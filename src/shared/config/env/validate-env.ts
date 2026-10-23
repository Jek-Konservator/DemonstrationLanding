import { ValidationError, type AnyObjectSchema, type InferType } from "yup";

type Env = Record<string, string | undefined>;

// Падает при старте с понятным списком ошибок, лишние переменные отбрасывает
export const validateEnv = <S extends AnyObjectSchema>(
  schema: S,
  env: Env,
): InferType<S> => {
  try {
    return schema.validateSync(env, { abortEarly: false, stripUnknown: true });
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error(
        `Неверные переменные окружения: ${error.errors.join("; ")}`,
      );
    }
    throw error;
  }
};
