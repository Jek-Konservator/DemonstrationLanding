import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { renderWithProviders } from "@shared/testing";
import { planSelected } from "@entities/Lead";
import { PlanButton } from ".";

describe("PlanButton", () => {
  it("ведёт к форме и выбирает тариф", async () => {
    const onPlanSelected = vi.fn();
    const unwatch = planSelected.watch(onPlanSelected);

    renderWithProviders(
      <PlanButton isPrimary plan="premium">
        label
      </PlanButton>,
    );

    const link = screen.getByRole("link", { name: "label" });

    await userEvent.click(link);

    expect(link).toHaveAttribute("href", `#${NAVIGATION_NAMES.feedback}`);
    expect(onPlanSelected).toHaveBeenCalledWith("premium");
    unwatch();
  });
});
