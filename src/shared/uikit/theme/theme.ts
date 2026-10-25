import {
  Accordion,
  Button,
  Container,
  createTheme,
  Title,
  type CSSVariablesResolver,
} from "@mantine/core";
import { THEME_COLORS } from "./colors";
import { PRIMARY_COLOR, PRIMARY_SHADE } from "./primary";

// Совпадают с $breakpoints в theme.scss — проверяется тестом
export const BREAKPOINTS = {
  xs: "36em",
  sm: "48em",
  md: "62em",
  lg: "75em",
  xl: "88em",
};

export const theme = createTheme({
  primaryColor: PRIMARY_COLOR,
  primaryShade: PRIMARY_SHADE,
  fontFamily: "var(--font-manrope), sans-serif",
  headings: {
    fontFamily: "var(--font-manrope), sans-serif",
    fontWeight: "800",
  },
  breakpoints: BREAKPOINTS,
  defaultRadius: "md",
  components: {
    Accordion: Accordion.extend({
      defaultProps: { variant: "separated", radius: "lg" },
    }),
    Button: Button.extend({
      defaultProps: { radius: "xl" },
    }),
    Container: Container.extend({
      defaultProps: { size: "lg" },
    }),
    Title: Title.extend({
      defaultProps: { textWrap: "balance" },
    }),
  },
});

// Приглушённый текст темнее, чем у Mantine по умолчанию, — ради контраста (WCAG AA)
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: { "--mantine-color-dimmed": THEME_COLORS.dimmed },
  dark: {},
});
