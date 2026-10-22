// id секций лендинга: якоря в навигации и id у <section>
export const NAVIGATION_NAMES = {
  audience: "audience",
  program: "program",
  teacher: "teacher",
  pricing: "pricing",
  faq: "faq",
  feedback: "feedback",
} as const;

export type NavigationName = keyof typeof NAVIGATION_NAMES;
