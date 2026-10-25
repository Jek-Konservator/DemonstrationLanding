// id секций лендинга: якоря в навигации и id у <section>
export const NAVIGATION_NAMES = {
  main: "main",
  audience: "audience",
  program: "program",
  teacher: "teacher",
  reviews: "reviews",
  pricing: "pricing",
  faq: "faq",
  feedback: "feedback",
} as const;

export type NavigationName = keyof typeof NAVIGATION_NAMES;
