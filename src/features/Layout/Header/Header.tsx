"use client";

import { Burger } from "@ui/Burger";
import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import { Drawer } from "@ui/Drawer";
import { useDisclosure } from "@ui/hooks/useDisclosure";
import { useTranslations } from "next-intl";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Logo } from "../Logo";
import { Navigation } from "../Navigation";
import styles from "./styles.module.scss";

export const Header = () => {
  const translate = useTranslations("Layout.Header");
  const [isMenuOpened, menu] = useDisclosure(false);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />
        <Navigation className={styles.navigation} />
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Button
            className={styles.cta}
            component="a"
            href={`#${NAVIGATION_NAMES.feedback}`}
          >
            {translate("cta")}
          </Button>
          <Burger
            aria-expanded={isMenuOpened}
            aria-label={translate(isMenuOpened ? "closeMenu" : "openMenu")}
            className={styles.burger}
            onClick={menu.toggle}
            opened={isMenuOpened}
          />
        </div>
      </Container>
      <Drawer
        closeButtonProps={{ "aria-label": translate("closeMenu") }}
        onClose={menu.close}
        opened={isMenuOpened}
        position="right"
        title={translate("menu")}
      >
        <div className={styles.menu}>
          <Navigation isVertical onItemClick={menu.close} />
          <Button
            component="a"
            href={`#${NAVIGATION_NAMES.feedback}`}
            onClick={menu.close}
            size="lg"
          >
            {translate("cta")}
          </Button>
        </div>
      </Drawer>
    </header>
  );
};
