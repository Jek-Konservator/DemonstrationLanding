import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@shared/config/i18n/routing";
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

  return {
    title: translate("title"),
    description: translate("description"),
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
