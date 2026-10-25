import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { useTranslations } from "next-intl";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { STAT_NAMES } from "./constants";
import { CountUp } from "./CountUp";
import { HeroChat } from "./HeroChat";
import styles from "./styles.module.scss";

interface SectionMainProps {
  id: string;
}

// Первый экран: без анимации появления — он виден сразу и не должен ждать JS
export const SectionMain = ({ id }: SectionMainProps) => {
  const translate = useTranslations("Sections.Main");

  return (
    <section className={styles.sectionMain} id={id}>
      <Container className={styles.content}>
        <div>
          <Text className={styles.badge} component="p">
            {translate("badge")}
          </Text>
          <Title className={styles.title} order={1}>
            {translate("title")}
          </Title>
          <Text className={styles.description}>{translate("description")}</Text>
          <div className={styles.buttons}>
            <Button
              component="a"
              href={`#${NAVIGATION_NAMES.feedback}`}
              size="lg"
            >
              {translate("primaryButton")}
            </Button>
            <Button
              component="a"
              href={`#${NAVIGATION_NAMES.program}`}
              size="lg"
              variant="default"
            >
              {translate("secondaryButton")}
            </Button>
          </div>
          <ul aria-label={translate("stats.label")} className={styles.stats}>
            {STAT_NAMES.map((name) => (
              <li className={styles.stat} key={name}>
                <span className={styles.statValue}>
                  <CountUp value={translate(`stats.${name}.value`)} />
                </span>
                <span className={styles.statLabel}>
                  {translate(`stats.${name}.label`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <HeroChat />
      </Container>
    </section>
  );
};
