// Тарифы курса: карточки в секции «Тарифы» и поле тарифа в заявке
export const PLAN_NAMES = ["basic", "standard", "premium"] as const;

export type PlanName = (typeof PLAN_NAMES)[number];
