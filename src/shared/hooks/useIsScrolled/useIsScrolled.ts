import { useEffect, useState } from "react";

// Прокручена ли страница дальше порога. В состоянии — только флаг: React
// пропускает рендер, если значение не изменилось, поэтому компонент
// перерисовывается при переходе через порог, а не на каждый пиксель
export const useIsScrolled = (threshold = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > threshold);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return isScrolled;
};
