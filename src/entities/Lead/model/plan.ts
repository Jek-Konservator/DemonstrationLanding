import { createEvent } from "effector";
import type { PlanName } from "@shared/constants/plans";

// Кнопка тарифа в секции «Тарифы» → этот тариф выбирается в форме заявки
export const planSelected = createEvent<PlanName>();
