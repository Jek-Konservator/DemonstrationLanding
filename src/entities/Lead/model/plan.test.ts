import { allSettled, fork } from "effector";
import { describe, expect, it } from "vitest";
import { $selectedPlan, planSelected } from "./plan";

describe("$selectedPlan", () => {
  it("запоминает последний выбранный тариф", async () => {
    const scope = fork();

    expect(scope.getState($selectedPlan)).toBeNull();

    await allSettled(planSelected, { scope, params: "basic" });
    await allSettled(planSelected, { scope, params: "premium" });

    expect(scope.getState($selectedPlan)).toBe("premium");
  });
});
