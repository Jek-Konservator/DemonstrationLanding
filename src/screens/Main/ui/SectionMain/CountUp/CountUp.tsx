"use client";

import { clsx } from "clsx";
import { useCountUp } from "@shared/hooks/useCountUp";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import { parseStatValue } from "./parseStatValue";
import styles from "./styles.module.scss";

interface CountUpProps {
  value: string;
}

// Цифра первого экрана считается от нуля, когда видна. С сервера приходит
// настоящее значение — без JS и для поисковиков цифры верные
export const CountUp = ({ value }: CountUpProps) => {
  const parsed = parseStatValue(value);
  const { ref, isVisible } = useIntersectionObserver<HTMLSpanElement>({
    once: true,
  });
  const current = useCountUp(parsed?.target ?? 0, {
    isEnabled: isVisible && parsed !== null,
  });
  const isCounting = parsed !== null && current !== parsed.target;

  return (
    <span className={styles.countUp} ref={ref}>
      {/* Невидимое итоговое значение держит ширину: соседи не сдвигаются */}
      <span aria-hidden className={styles.ghost}>
        {value}
      </span>
      <span className={clsx(styles.current, isCounting && styles.isCounting)}>
        {parsed ? parsed.format(current) : value}
      </span>
    </span>
  );
};
