import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  // Сработать один раз и перестать следить — для анимаций появления
  once?: boolean;
  // Какая доля элемента должна попасть в экран
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = <T extends Element = HTMLDivElement>({
  once = false,
  threshold = 0.2,
  rootMargin = "0px",
}: UseIntersectionObserverOptions = {}) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Старый браузер без IntersectionObserver — просто показываем контент
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, isVisible };
};
