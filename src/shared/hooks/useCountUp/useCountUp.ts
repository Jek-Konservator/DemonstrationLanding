import { useEffect, useState } from "react";

const DEFAULT_DURATION = 1200;

// Замедление к концу: быстро набирает, плавно доходит до цели
const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

// Счёт от 0 до target. Значение считается от времени старта, а не «+1 за
// кадр», — длительность не зависит от частоты кадров. До запуска и при
// prefers-reduced-motion — сразу target: в HTML с сервера настоящее число
export const useCountUp = (
  target: number,
  { duration = DEFAULT_DURATION, isEnabled = true } = {},
) => {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isEnabled || prefersReducedMotion) {
      setValue(target);

      return;
    }

    let frame = 0;
    let startTime: number | undefined;

    const tick = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);

      setValue(Math.round(target * easeOutCubic(progress)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, duration, isEnabled]);

  return value;
};
