"use client";

import { Accordion } from "@ui/Accordion";
import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import { PROGRAM_NAMES } from "./constants";
import styles from "./styles.module.scss";

interface SectionProgramProps {
  id: string;
}

export const SectionProgram = ({ id }: SectionProgramProps) => {
  const translate = useTranslations("Sections.Program");
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    once: true,
  });

  return (
    <section className={styles.sectionProgram} id={id}>
      <Container>
        <Title className={styles.title} order={2}>
          {translate("title")}
        </Title>
        <Text className={styles.description}>{translate("description")}</Text>
        {/* Accordion не принимает ref — наблюдаем за обёрткой */}
        <div
          className={clsx(styles.program, isVisible && styles.isVisible)}
          ref={ref}
        >
          {/* order — каждая кнопка модуля оборачивается в h3 */}
          <Accordion defaultValue={PROGRAM_NAMES[0]} order={3}>
            {PROGRAM_NAMES.map((name, index) => (
              <Accordion.Item key={name} value={name}>
                <Accordion.Control>
                  <span className={styles.week}>
                    {translate("week", { number: index + 1 })}
                  </span>
                  <span className={styles.name}>
                    {translate(`list.${name}.name`)}
                  </span>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text className={styles.text}>
                    {translate(`list.${name}.description`)}
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
