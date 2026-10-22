import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { UiColorSchemeScript, uiHtmlProps, UiProvider } from ".";

describe("UiProvider", () => {
  it("рендерит дочерние элементы", () => {
    render(
      <UiProvider>
        <p>content</p>
      </UiProvider>,
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("фиксирует светлую тему", () => {
    render(
      <UiProvider>
        <p>content</p>
      </UiProvider>,
    );

    expect(document.documentElement).toHaveAttribute(
      "data-mantine-color-scheme",
      "light",
    );
  });

  it("скрипт цветовой схемы выставляет светлую тему", () => {
    // Скрипт выполняется только из серверного HTML — его и проверяем
    const html = renderToStaticMarkup(<UiColorSchemeScript />);

    expect(html).toContain("<script");
    expect(html).toContain("light");
  });

  it("атрибуты html гасят предупреждение гидрации", () => {
    expect(uiHtmlProps).toHaveProperty("suppressHydrationWarning", true);
  });
});
