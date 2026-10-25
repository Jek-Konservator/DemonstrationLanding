import type { ReactNode } from "react";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import styles from "./styles.module.scss";

interface PricingCardProps {
  // Кнопка внизу карточки — её поведение задаёт секция
  action: ReactNode;
  description: string;
  features: string[];
  featuresLabel: string;
  name: string;
  popularLabel?: string;
  price: string;
}

export const PricingCard = ({
  action,
  description,
  features,
  featuresLabel,
  name,
  popularLabel,
  price,
}: PricingCardProps) => (
  <article className={clsx(styles.pricingCard, popularLabel && styles.popular)}>
    {popularLabel && <span className={styles.badge}>{popularLabel}</span>}
    <Title className={styles.name} order={3}>
      {name}
    </Title>
    <Text className={styles.description}>{description}</Text>
    <p className={styles.price}>{price}</p>
    <ul aria-label={featuresLabel} className={styles.features}>
      {features.map((feature) => (
        <li className={styles.feature} key={feature}>
          {feature}
        </li>
      ))}
    </ul>
    <div className={styles.action}>{action}</div>
  </article>
);
