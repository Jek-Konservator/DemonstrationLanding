import type { FC, SVGProps } from "react";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import styles from "./styles.module.scss";

interface AudienceCardProps {
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
}

export const AudienceCard = ({
  description,
  icon: Icon,
  name,
}: AudienceCardProps) => (
  <article className={styles.audienceCard}>
    <span className={styles.iconWrapper}>
      <Icon aria-hidden className={styles.icon} />
    </span>
    <Title className={styles.name} order={3}>
      {name}
    </Title>
    <Text className={styles.description}>{description}</Text>
  </article>
);
