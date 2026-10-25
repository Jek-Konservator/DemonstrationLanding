"use client";

import { Accordion } from "@ui/Accordion";
import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
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
          className={clsx(styles.faq, isVisible && styles.isVisible)}
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
        </div>
      </Container>
    </section>
  );
};
