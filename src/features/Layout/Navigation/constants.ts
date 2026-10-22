import type { NavigationName } from "@shared/constants/navigation";

// Пункты меню — в порядке секций на странице.
// as const: тип — именно эти пункты, у каждого должна быть подпись в словаре
export const NAVIGATION_ITEMS = [
  "audience",
  "program",
  "teacher",
  "pricing",
  "faq",
] as const satisfies readonly NavigationName[];
