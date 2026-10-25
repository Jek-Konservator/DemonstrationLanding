import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { AudienceCard } from ".";

const Icon = () => <svg data-testid="icon" />;

describe("AudienceCard", () => {
  it("рендерит иконку, заголовок h3 и описание", () => {
    renderWithProviders(
      <AudienceCard description="description" icon={Icon} name="name" />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "name" }),
    ).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
  });
});
