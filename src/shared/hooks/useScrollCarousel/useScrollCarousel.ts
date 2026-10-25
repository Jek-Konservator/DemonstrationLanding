import { useCallback, useEffect, useRef, useState } from "react";

// Погрешность в пикселях: при дробном масштабе scrollLeft не доходит до края ровно
const EDGE_TOLERANCE = 1;

// Карусель на нативной прокрутке (CSS scroll-snap): хук следит, можно ли
// листать в каждую сторону, и листает ленту на ширину видимой части
export const useScrollCarousel = <
  T extends HTMLElement = HTMLUListElement,
>() => {
  const ref = useRef<T>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const track = ref.current;

    if (!track) {
      return;
    }

    const update = () => {
      setCanScrollPrev(track.scrollLeft > EDGE_TOLERANCE);
      setCanScrollNext(
        track.scrollLeft + track.clientWidth <
          track.scrollWidth - EDGE_TOLERANCE,
      );
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const track = ref.current;

    if (!track) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  const scrollPrev = useCallback(() => scrollBy(-1), [scrollBy]);
  const scrollNext = useCallback(() => scrollBy(1), [scrollBy]);

  return { ref, canScrollPrev, canScrollNext, scrollPrev, scrollNext };
};
