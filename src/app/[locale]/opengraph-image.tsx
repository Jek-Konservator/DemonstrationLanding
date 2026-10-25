import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@shared/config/i18n/routing";
import { DEFAULT_LOCALE } from "@shared/constants/internalization";
import { loadOgFonts, OG_IMAGE_SIZE, OgImage } from "@screens/Main/ui/OgImage";

interface OpenGraphImageProps {
  params: Promise<{ locale: string }>;
}

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
// Название школы одинаково на обоих языках
export const alt = "AI Practicum";

// Без этого картинка рендерится на каждый запрос, а так — один раз при сборке
export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

// Картинка для каждого языка собирается при сборке — тексты из словаря
const OpenGraphImage = async ({ params }: OpenGraphImageProps) => {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : DEFAULT_LOCALE;
  const translateMain = await getTranslations({
    locale,
    namespace: "Sections.Main",
  });
  const translateSeo = await getTranslations({ locale, namespace: "SEO" });
  const translateLogo = await getTranslations({
    locale,
    namespace: "Layout.Logo",
  });

  return new ImageResponse(
    <OgImage
      badge={translateMain("badge")}
      description={translateSeo("description")}
      siteName={translateLogo("name")}
      title={translateMain("title")}
    />,
    { ...OG_IMAGE_SIZE, fonts: await loadOgFonts() },
  );
};

export default OpenGraphImage;
