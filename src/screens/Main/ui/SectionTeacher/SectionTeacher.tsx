import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { useTranslations } from "next-intl";
import AvatarIllustration from "./assets/avatar.svg?react";
import { TEACHER_FACT_NAMES } from "./constants";
import styles from "./styles.module.scss";

interface SectionTeacherProps {
  id: string;
}

// Статичная секция без хуков — серверный компонент
export const SectionTeacher = ({ id }: SectionTeacherProps) => {
  const translate = useTranslations("Sections.Teacher");

  return (
    <section className={styles.sectionTeacher} id={id}>
      <Container>
        <Title className={styles.title} order={2}>
          {translate("title")}
        </Title>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <AvatarIllustration
              aria-label={translate("avatar")}
              className={styles.illustration}
              role="img"
            />
          </div>
          <div>
            <Title className={styles.name} order={3}>
              {translate("name")}
            </Title>
            <Text className={styles.role}>{translate("role")}</Text>
            <Text className={styles.description}>
              {translate("description")}
            </Text>
            <ul aria-label={translate("facts.label")} className={styles.facts}>
              {TEACHER_FACT_NAMES.map((name) => (
                <li className={styles.fact} key={name}>
                  {translate(`facts.${name}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
