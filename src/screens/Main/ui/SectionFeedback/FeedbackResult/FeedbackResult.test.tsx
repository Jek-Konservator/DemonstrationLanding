import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { FeedbackResult } from ".";

const props = { buttonLabel: "button", text: "text", title: "title" };

describe("FeedbackResult", () => {
  it("успех — статус с заголовком и кнопкой", async () => {
    const onButtonClick = vi.fn();

    renderWithProviders(
      <FeedbackResult {...props} onButtonClick={onButtonClick} />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("title");

    await userEvent.click(screen.getByRole("button", { name: "button" }));

    expect(onButtonClick).toHaveBeenCalledOnce();
  });

  it("ошибка — alert", () => {
    renderWithProviders(
      <FeedbackResult {...props} isError onButtonClick={vi.fn()} />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("text");
  });
});
