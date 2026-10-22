import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { manrope } from "@ui/theme/fonts";
import { UiColorSchemeScript, uiHtmlProps, UiProvider } from "@ui/UiProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@shared/config/i18n/routing";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className={manrope.variable} lang={locale} {...uiHtmlProps}>
      <head>
        <UiColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <UiProvider>{children}</UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
