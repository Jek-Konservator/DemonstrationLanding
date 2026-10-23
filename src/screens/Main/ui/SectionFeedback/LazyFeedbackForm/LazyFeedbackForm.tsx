"use client";

import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import styles from "./styles.module.scss";

// Форма тянет react-hook-form, yup, imask, farfetched и axios — грузим её
// отдельным чанком и только когда секция подходит к экрану
const FeedbackForm = dynamic(
  () => import("../FeedbackForm").then((module) => module.FeedbackForm),
  { ssr: false },
);

export const LazyFeedbackForm = () => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    once: true,
    // Начинаем загрузку заранее, чтобы к прокрутке форма уже была
    rootMargin: "600px 0px",
    threshold: 0,
  });

  return (
    <div className={styles.lazyFeedbackForm} ref={ref}>
      {isVisible && <FeedbackForm />}
    </div>
  );
};
