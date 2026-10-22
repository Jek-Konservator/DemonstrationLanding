import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ru from "../../../dictionaries/ru.json";

// Рендер компонента со всеми провайдерами приложения (язык — ru)
export const renderWithProviders = (ui: ReactElement) =>
  render(
    <NextIntlClientProvider locale="ru" messages={ru}>
      {ui}
    </NextIntlClientProvider>,
  );
