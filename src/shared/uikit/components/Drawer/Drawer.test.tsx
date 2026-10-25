import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { Drawer } from ".";

describe("Drawer", () => {
  it("открытый — показывает заголовок и содержимое", async () => {
    renderWithProviders(
      <Drawer onClose={() => undefined} opened title="title">
        content
      </Drawer>,
    );

    expect(
      await screen.findByRole("dialog", { name: "title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("закрытый — ничего не рендерит", () => {
    renderWithProviders(
      <Drawer onClose={() => undefined} opened={false} title="title">
        content
      </Drawer>,
    );

    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });
});
