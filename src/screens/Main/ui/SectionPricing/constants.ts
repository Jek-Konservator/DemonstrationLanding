import { PLAN_NAMES, type PlanName } from "@shared/constants/plans";

// Тарифы — ключи Sections.Pricing.list.<name>; список общий с полем тарифа в заявке
export const PRICING_NAMES = PLAN_NAMES;

export type PricingName = PlanName;

// Что входит в тарифы — ключи Sections.Pricing.features.<name>
export const FEATURE_NAMES = [
  "lessons",
  "tasks",
  "chat",
  "review",
  "certificate",
  "consultations",
] as const;

export type FeatureName = (typeof FEATURE_NAMES)[number];

export const PRICING_FEATURES: Record<PricingName, readonly FeatureName[]> = {
  basic: ["lessons", "tasks", "chat"],
  standard: ["lessons", "tasks", "chat", "review", "certificate"],
  premium: [
    "lessons",
    "tasks",
    "chat",
    "review",
    "certificate",
    "consultations",
  ],
};

// Тариф с плашкой «Популярный»
export const POPULAR_PRICING: PricingName = "standard";
