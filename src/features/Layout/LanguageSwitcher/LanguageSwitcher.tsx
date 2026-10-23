import { clsx } from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@shared/config/i18n/navigation";
import { LOCALE_LABEL_MAP, LOCALES } from "@shared/constants/internalization";
import styles from "./styles.module.scss";

interface LanguageSwitcherProps {
  className?: string;
}

// Страница одна — переключатель ведёт на главную нужного языка
export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const translate = useTranslations("Layout.LanguageSwitcher");
  const currentLocale = useLocale();

  return (
    <ul
      aria-label={translate("label")}
      className={clsx(styles.languageSwitcher, className)}
    >
      {LOCALES.map((locale) => (
        <li key={locale}>
          <Link
            aria-current={locale === currentLocale ? "true" : undefined}
            // Имя начинается с видимого «RU»: так ссылку найдёт и голосовое управление
            aria-label={`${locale.toUpperCase()} — ${LOCALE_LABEL_MAP[locale]}`}
            className={styles.link}
            href="/"
            hrefLang={locale}
            locale={locale}
          >
            {locale}
          </Link>
        </li>
      ))}
    </ul>
  );
};
