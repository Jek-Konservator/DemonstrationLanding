import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { NAVIGATION_ITEMS } from "./constants";
import styles from "./styles.module.scss";

interface NavigationProps {
  className?: string;
  // Вертикальный список — для мобильного меню
  isVertical?: boolean;
  onItemClick?: () => void;
}

export const Navigation = ({
  className,
  isVertical = false,
  onItemClick,
}: NavigationProps) => {
  const translate = useTranslations("Layout.Header.navigation");

  return (
    <nav
      aria-label={translate("label")}
      className={clsx(styles.navigation, className)}
    >
      <ul className={clsx(styles.list, isVertical && styles.isVertical)}>
        {NAVIGATION_ITEMS.map((name) => (
          <li key={name}>
            <a
              className={styles.link}
              href={`#${NAVIGATION_NAMES[name]}`}
              onClick={onItemClick}
            >
              {translate(name)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
