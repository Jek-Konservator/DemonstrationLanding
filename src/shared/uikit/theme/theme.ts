import { Button, Container, createTheme, Title } from "@mantine/core";

// Совпадают с $breakpoints в theme.scss — проверяется тестом
export const BREAKPOINTS = {
  xs: "36em",
  sm: "48em",
  md: "62em",
  lg: "75em",
  xl: "88em",
};

export const theme = createTheme({
  primaryColor: "violet",
  primaryShade: 7,
  fontFamily: "var(--font-manrope), sans-serif",
  headings: {
    fontFamily: "var(--font-manrope), sans-serif",
    fontWeight: "800",
  },
  breakpoints: BREAKPOINTS,
  defaultRadius: "md",
  components: {
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
