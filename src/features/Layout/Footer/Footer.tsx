import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { useTranslations } from "next-intl";
import { Logo } from "../Logo";
import styles from "./styles.module.scss";

// Страница статическая: год берётся в момент сборки
export const Footer = () => {
  const translate = useTranslations("Layout.Footer");

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <Logo />
        <Text className={styles.disclaimer} size="sm">
          {translate("disclaimer")}
        </Text>
        <Text className={styles.copyright} size="sm">
          {translate("copyright", { year: new Date().getFullYear() })}
        </Text>
      </Container>
    </footer>
  );
};
