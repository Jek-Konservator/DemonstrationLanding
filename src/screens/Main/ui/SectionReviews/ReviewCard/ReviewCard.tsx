import { Text } from "@ui/Text";
import type { AvatarColor } from "../constants";
import styles from "./styles.module.scss";

interface ReviewCardProps {
  color: AvatarColor;
  name: string;
  position: string;
  result: string;
  text: string;
}

// «Анна Соколова» → «АС»: вместо фото — инициалы
export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");

export const ReviewCard = ({
  color,
  name,
  position,
  result,
  text,
}: ReviewCardProps) => (
  <article className={styles.reviewCard}>
    <p className={styles.result}>{result}</p>
    <blockquote className={styles.quote}>
      <Text className={styles.text}>{text}</Text>
    </blockquote>
    <footer className={styles.author}>
      <span aria-hidden className={styles.avatar} data-color={color}>
        {getInitials(name)}
      </span>
      <span>
        <span className={styles.name}>{name}</span>
        <span className={styles.position}>{position}</span>
      </span>
    </footer>
  </article>
);
