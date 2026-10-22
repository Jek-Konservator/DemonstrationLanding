import type ru from "./dictionaries/ru.json";
import type { Locale } from "./src/shared/constants/internalization";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof ru;
  }
}
