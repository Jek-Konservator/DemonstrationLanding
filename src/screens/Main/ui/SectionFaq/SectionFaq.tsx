"use client";

import { Accordion } from "@ui/Accordion";
import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import { FAQ_NAMES } from "./constants";
import styles from "./styles.module.scss";

interface SectionFaqProps {
  id: string;
}

export const SectionFaq = ({ id }: SectionFaqProps) => {
  const translate = useTranslations("Sections.Faq");
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    once: true,
  });

  return (
    <section className={styles.sectionFaq} id={id}>
      <Container>
        <Title className={styles.title} order={2}>
          {translate("title")}
        </Title>
        {/* Accordion не принимает ref — наблюдаем за обёрткой */}
        <div
          className={clsx(styles.content, isVisible && styles.isVisible)}
          ref={ref}
        >
          {/* order — каждый вопрос оборачивается в h3 */}
          <Accordion classNames={{ item: styles.item }} order={3}>
            {FAQ_NAMES.map((name) => (
              <Accordion.Item key={name} value={name}>
                <Accordion.Control className={styles.question}>
                  {translate(`list.${name}.question`)}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text className={styles.answer}>
                    {translate(`list.${name}.answer`)}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <aside className={styles.contact}>
            <Title className={styles.contactTitle} order={3}>
              {translate("contact.title")}
            </Title>
            <Text className={styles.contactText}>
              {translate("contact.text")}
            </Text>
            <Button
              component="a"
              fullWidth
              href={`#${NAVIGATION_NAMES.feedback}`}
              size="md"
              variant="default"
            >
              {translate("contact.button")}
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  );
};
