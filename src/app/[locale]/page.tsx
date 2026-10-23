import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CLIENT_ENV } from "@shared/config/env/client-env";
import { routing } from "@shared/config/i18n/routing";
import {
  getLanguageAlternates,
  getLocalePath,
  OG_LOCALES,
} from "@shared/config/seo";
import MainPage from "@screens/Main";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const translate = await getTranslations({ locale, namespace: "SEO" });
  const translateLogo = await getTranslations({
    locale,
    namespace: "Layout.Logo",
  });
  const title = translate("title");
  const description = translate("description");

  return {
    // Относительные адреса ниже (canonical, hreflang, OG) — от адреса сайта
    metadataBase: new URL(CLIENT_ENV.NEXT_PUBLIC_SITE_URL),
    title,
    description,
    alternates: {
      canonical: getLocalePath(locale),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      url: getLocalePath(locale),
      siteName: translateLogo("name"),
      title,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => OG_LOCALES[item]),
    },
  };
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <MainPage />;
};

export default Page;
