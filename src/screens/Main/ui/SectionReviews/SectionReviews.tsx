"use client";

import { ActionIcon } from "@ui/ActionIcon";
import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import { useScrollCarousel } from "@shared/hooks/useScrollCarousel";
import { REVIEW_AVATAR_COLORS, REVIEW_NAMES } from "./constants";
import { ReviewCard } from "./ReviewCard";
import styles from "./styles.module.scss";

interface SectionReviewsProps {
  id: string;
}

// Слайдер на нативной прокрутке (scroll-snap): свайп и тачпад работают без JS,
// хук нужен только стрелкам. Отзывы целиком в HTML
export const SectionReviews = ({ id }: SectionReviewsProps) => {
  const translate = useTranslations("Sections.Reviews");
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    once: true,
  });
  const {
    ref: trackRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  } = useScrollCarousel();

  return (
    <section className={styles.sectionReviews} id={id}>
      <Container>
        <div className={styles.header}>
          <div>
            <Title className={styles.title} order={2}>
              {translate("title")}
            </Title>
            <Text className={styles.description}>
              {translate("description")}
            </Text>
          </div>
          <div className={styles.controls}>
            <ActionIcon
              aria-label={translate("previous")}
              disabled={!canScrollPrev}
              onClick={scrollPrev}
              radius="xl"
              size="xl"
              variant="default"
            >
              <span aria-hidden className={styles.arrowPrev} />
            </ActionIcon>
            <ActionIcon
              aria-label={translate("next")}
              disabled={!canScrollNext}
              onClick={scrollNext}
              radius="xl"
              size="xl"
              variant="default"
            >
              <span aria-hidden className={styles.arrowNext} />
            </ActionIcon>
          </div>
        </div>
        <div
          className={clsx(styles.reviews, isVisible && styles.isVisible)}
          ref={ref}
        >
          <ul
            aria-label={translate("listLabel")}
            className={styles.track}
            ref={trackRef}
          >
            {REVIEW_NAMES.map((name) => (
              <li className={styles.slide} key={name}>
                <ReviewCard
                  color={REVIEW_AVATAR_COLORS[name]}
                  name={translate(`list.${name}.name`)}
                  position={translate(`list.${name}.role`)}
                  result={translate(`list.${name}.result`)}
                  text={translate(`list.${name}.text`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};
