import { act, fireEvent } from "@testing-library/react";

// В jsdom окно не прокручивается: выставляем позицию вручную и шлём scroll.
// Mantine читает pageYOffset, браузерный код — scrollY, поэтому задаём оба
export const scrollWindowTo = (y: number) => {
  act(() => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: y });
    Object.defineProperty(window, "pageYOffset", {
      configurable: true,
      value: y,
    });
    fireEvent.scroll(window);
  });
};
