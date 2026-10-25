import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { LoadingOverlay } from ".";

const ROOT = ".mantine-LoadingOverlay-root";

describe("LoadingOverlay", () => {
  it("visible — показывает затемнение с лоадером", () => {
    const { container } = renderWithProviders(<LoadingOverlay visible />);

    expect(container.querySelector(ROOT)).not.toBeNull();
  });

  it("без visible — ничего не рендерит", () => {
    const { container } = renderWithProviders(
      <LoadingOverlay visible={false} />,
    );

    expect(container.querySelector(ROOT)).toBeNull();
  });
});
