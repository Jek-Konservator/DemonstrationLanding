import { useLocale, useTranslations } from "next-intl";
import { getCourseJsonLd, serializeJsonLd } from "./getCourseJsonLd";

interface SeoProps {
  siteUrl: string;
}

// JSON-LD для поисковиков: то, чего нет в metadata
export const Seo = ({ siteUrl }: SeoProps) => {
  const locale = useLocale();
  const translateMain = useTranslations("Sections.Main");
  const translateSeo = useTranslations("SEO");
  const translateLogo = useTranslations("Layout.Logo");

  const jsonLd = getCourseJsonLd({
    description: translateSeo("description"),
    locale,
    name: translateMain("title"),
    schoolName: translateLogo("name"),
    siteUrl,
  });

  return (
    <script
      // Так JSON-LD вставляют по документации Next; данные экранированы
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      type="application/ld+json"
    />
  );
};
