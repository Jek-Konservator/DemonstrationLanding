import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Seo } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { serializeJsonLd } from "./getCourseJsonLd";

const SITE_URL = "https://example.com";

describe("Seo", () => {
  it("выводит JSON-LD курса на языке страницы", () => {
    const { container } = renderWithProviders(<Seo siteUrl={SITE_URL} />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(JSON.parse(script?.textContent ?? "")).toEqual({
      "@context": "https://schema.org",
      "@type": "Course",
      name: ru.Sections.Main.title,
      description: ru.SEO.description,
      inLanguage: "ru",
      url: "https://example.com/ru",
      provider: {
        "@type": "Organization",
        name: ru.Layout.Logo.name,
        url: "https://example.com/",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "P6W",
      },
    });
  });

  it("экранирует «<», чтобы текст не закрыл <script>", () => {
    const json = serializeJsonLd({ name: "</script><b>" });

    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><b>" });
  });
});
