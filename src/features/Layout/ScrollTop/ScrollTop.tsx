"use client";

import { ActionIcon } from "@ui/ActionIcon";
import { useWindowScroll } from "@ui/hooks/useWindowScroll";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { SCROLL_TOP_THRESHOLD } from "./constants";
import styles from "./styles.module.scss";

export const ScrollTop = () => {
  const translate = useTranslations("Layout.ScrollTop");
  const [scroll, scrollTo] = useWindowScroll();
  const isVisible = scroll.y > SCROLL_TOP_THRESHOLD;

  return (
    <ActionIcon
      aria-hidden={!isVisible}
      aria-label={translate("label")}
      className={clsx(styles.scrollTop, isVisible && styles.isVisible)}
      onClick={() => scrollTo({ y: 0 })}
      radius="xl"
      size="xl"
      tabIndex={isVisible ? undefined : -1}
    >
      <span aria-hidden className={styles.arrow} />
    </ActionIcon>
  );
};
