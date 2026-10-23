"use client";

import type { ReactNode } from "react";
import { Button } from "@ui/Button";
import { useUnit } from "effector-react";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import type { PlanName } from "@shared/constants/plans";
import { planSelected } from "@entities/Lead";

interface PlanButtonProps {
  children: ReactNode;
  isPrimary: boolean;
  plan: PlanName;
}

// Ведёт к форме и выбирает в ней тариф. Клиентская, чтобы секция тарифов осталась серверной
export const PlanButton = ({ children, isPrimary, plan }: PlanButtonProps) => {
  const selectPlan = useUnit(planSelected);

  return (
    <Button
      component="a"
      fullWidth
      href={`#${NAVIGATION_NAMES.feedback}`}
      onClick={() => selectPlan(plan)}
      size="md"
      variant={isPrimary ? "filled" : "default"}
    >
      {children}
    </Button>
  );
};
