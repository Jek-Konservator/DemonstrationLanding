"use client";

import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import { AudienceCard } from "./AudienceCard";
import { AUDIENCE_ICONS, AUDIENCE_NAMES } from "./constants";
import styles from "./styles.module.scss";

interface SectionAudienceProps {
  id: string;
}

export const SectionAudience = ({ id }: SectionAudienceProps) => {
  const translate = useTranslations("Sections.Audience");
  const { ref, isVisible } = useIntersectionObserver<HTMLUListElement>({
    once: true,
  });

  return (
    <section className={styles.sectionAudience} id={id}>
      <Container>
        <Title className={styles.title} order={2}>
          {translate("title")}
        </Title>
        <Text className={styles.description}>{translate("description")}</Text>
        <ul className={styles.list} ref={ref}>
          {AUDIENCE_NAMES.map((name) => (
            <li
              className={clsx(styles.item, isVisible && styles.isVisible)}
              key={name}
            >
              <AudienceCard
                description={translate(`list.${name}.description`)}
                icon={AUDIENCE_ICONS[name]}
                name={translate(`list.${name}.name`)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
