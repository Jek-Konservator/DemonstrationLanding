import { DEFAULT_THEME } from "@mantine/core";
import { PRIMARY_COLOR, PRIMARY_SHADE } from "./primary";

const primary = DEFAULT_THEME.colors[PRIMARY_COLOR];

// Цвета темы значениями — там, где нет CSS-переменных Mantine (OG-картинка).
// В вёрстке — только var(--mantine-*)
export const THEME_COLORS = {
  primary: primary[PRIMARY_SHADE],
  primaryLight: primary[0],
  primarySoft: primary[1],
  text: DEFAULT_THEME.black,
  dimmed: DEFAULT_THEME.colors.gray[6],
  body: DEFAULT_THEME.white,
};
