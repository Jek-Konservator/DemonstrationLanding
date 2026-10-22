"use client";

import "@mantine/core/styles.css";
import "@ui/theme/global.scss";
import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "@ui/theme";

interface UiProviderProps {
  children: ReactNode;
}

// Клиентский: тема собирается через Component.extend, а на сервере компоненты
// Mantine — лишь ссылки на клиентский код, без методов.
// Тёмной темы на лендинге нет — светлая зафиксирована здесь и в ColorScheme.tsx
export const UiProvider = ({ children }: UiProviderProps) => (
  <MantineProvider forceColorScheme="light" theme={theme}>
    {children}
  </MantineProvider>
);
