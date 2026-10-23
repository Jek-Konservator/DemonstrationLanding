import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { useTranslations } from "next-intl";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { POPULAR_PRICING, PRICING_FEATURES, PRICING_NAMES } from "./constants";
import { PricingCard } from "./PricingCard";
import styles from "./styles.module.scss";

interface SectionPricingProps {
  id: string;
}

// Статичная секция без хуков — серверный компонент
export const SectionPricing = ({ id }: SectionPricingProps) => {
  const translate = useTranslations("Sections.Pricing");

  return (
    <section className={styles.sectionPricing} id={id}>
      <Container>
        <Title className={styles.title} order={2}>
          {translate("title")}
        </Title>
        <Text className={styles.description}>{translate("description")}</Text>
        <ul className={styles.list}>
          {PRICING_NAMES.map((name) => (
            <li key={name}>
              <PricingCard
                buttonHref={`#${NAVIGATION_NAMES.feedback}`}
                buttonLabel={translate("button")}
                description={translate(`list.${name}.description`)}
                features={PRICING_FEATURES[name].map((feature) =>
                  translate(`features.${feature}`),
                )}
                featuresLabel={translate("featuresLabel", {
                  name: translate(`list.${name}.name`),
                })}
                name={translate(`list.${name}.name`)}
                popularLabel={
                  name === POPULAR_PRICING ? translate("popular") : undefined
                }
                price={translate(`list.${name}.price`)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
