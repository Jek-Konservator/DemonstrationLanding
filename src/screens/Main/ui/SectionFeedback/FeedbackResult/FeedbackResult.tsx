import { Button } from "@ui/Button";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import styles from "./styles.module.scss";

interface FeedbackResultProps {
  buttonLabel: string;
  isError?: boolean;
  onButtonClick: () => void;
  text: string;
  title: string;
}

// Итог отправки поверх формы: успех читается как статус, ошибка — как alert
export const FeedbackResult = ({
  buttonLabel,
  isError = false,
  onButtonClick,
  text,
  title,
}: FeedbackResultProps) => (
  <div
    className={clsx(styles.feedbackResult, isError && styles.isError)}
    role={isError ? "alert" : "status"}
  >
    <span aria-hidden className={styles.icon} />
    <Title className={styles.title} order={3}>
      {title}
    </Title>
    <Text className={styles.text}>{text}</Text>
    <Button className={styles.button} onClick={onButtonClick} variant="default">
      {buttonLabel}
    </Button>
  </div>
);
