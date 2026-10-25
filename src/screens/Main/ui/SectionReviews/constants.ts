// Отзывы — ключи Sections.Reviews.list.<name>
export const REVIEW_NAMES = [
  "anna",
  "igor",
  "olga",
  "dmitry",
  "ksenia",
] as const;

export type ReviewName = (typeof REVIEW_NAMES)[number];

// Цвета аватаров — палитры Mantine, классы по ним в стилях карточки
export const AVATAR_COLORS = [
  "violet",
  "teal",
  "blue",
  "grape",
  "indigo",
] as const;

export type AvatarColor = (typeof AVATAR_COLORS)[number];

export const REVIEW_AVATAR_COLORS: Record<ReviewName, AvatarColor> = {
  anna: "violet",
  igor: "teal",
  olga: "blue",
  dmitry: "grape",
  ksenia: "indigo",
};
