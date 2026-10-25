"use client";

// Стили Mantine — в @layer mantine: стили вне слоя всегда сильнее, поэтому наши
// CSS-модули перекрывают Mantine при любом порядке загрузки CSS (в dev он другой)
import "@mantine/core/styles.layer.css";
import "@ui/theme/global.scss";
import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { cssVariablesResolver, theme } from "@ui/theme";

interface UiProviderProps {
  children: ReactNode;
}

// Клиентский: тема собирается через Component.extend, а на сервере компоненты
// Mantine — лишь ссылки на клиентский код, без методов.
// Тёмной темы на лендинге нет — светлая зафиксирована здесь и в ColorScheme.tsx
export const UiProvider = ({ children }: UiProviderProps) => (
  <MantineProvider
    cssVariablesResolver={cssVariablesResolver}
    forceColorScheme="light"
    theme={theme}
  >
    {children}
  </MantineProvider>
);
