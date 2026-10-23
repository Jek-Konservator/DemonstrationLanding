import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { useTranslations } from "next-intl";
import { FeedbackForm } from "./FeedbackForm";
import styles from "./styles.module.scss";

interface SectionFeedbackProps {
  id: string;
}

// Серверная обёртка: клиентская только сама форма
export const SectionFeedback = ({ id }: SectionFeedbackProps) => {
  const translate = useTranslations("Sections.Feedback");

  return (
    <section className={styles.sectionFeedback} id={id}>
      <Container>
        <div className={styles.content}>
          <div>
            <Title className={styles.title} order={2}>
              {translate("title")}
            </Title>
            <Text className={styles.description}>
              {translate("description")}
            </Text>
          </div>
          <FeedbackForm />
        </div>
      </Container>
    </section>
  );
};
