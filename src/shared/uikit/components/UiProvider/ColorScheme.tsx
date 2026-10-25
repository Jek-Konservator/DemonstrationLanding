import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

// Ставится в <head>: выставляет цветовую схему до гидрации, без мигания
export const UiColorSchemeScript = () => (
  <ColorSchemeScript forceColorScheme="light" />
);

// Атрибуты для <html>: data-mantine-color-scheme и suppressHydrationWarning
export const uiHtmlProps = mantineHtmlProps;
