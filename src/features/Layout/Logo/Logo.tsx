import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { Link } from "@shared/config/i18n/navigation";
import styles from "./styles.module.scss";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const translate = useTranslations("Layout.Logo");

  return (
    <Link
      aria-label={translate("label")}
      className={clsx(styles.logo, className)}
      href="/"
    >
      {translate("name")}
    </Link>
  );
};
