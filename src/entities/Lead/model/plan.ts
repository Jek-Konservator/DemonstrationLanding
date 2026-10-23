import { createEvent, createStore } from "effector";
import type { PlanName } from "@shared/constants/plans";

// Кнопка тарифа в секции «Тарифы» → этот тариф выбирается в форме заявки
export const planSelected = createEvent<PlanName>();

// Последний выбранный тариф: форма грузится лениво и может появиться
// уже после клика — тогда берёт тариф отсюда
export const $selectedPlan = createStore<PlanName | null>(null).on(
  planSelected,
  (_, plan) => plan,
);
