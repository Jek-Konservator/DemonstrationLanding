import { Button } from "@ui/Button";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import styles from "./styles.module.scss";

interface PricingCardProps {
  buttonHref: string;
  buttonLabel: string;
  description: string;
  features: string[];
  featuresLabel: string;
  name: string;
  popularLabel?: string;
  price: string;
}

export const PricingCard = ({
  buttonHref,
  buttonLabel,
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
    <Button
      className={styles.button}
      component="a"
      fullWidth
      href={buttonHref}
      size="md"
      variant={popularLabel ? "filled" : "default"}
    >
      {buttonLabel}
    </Button>
  </article>
);
