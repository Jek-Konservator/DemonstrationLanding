import { yupResolver } from "@hookform/resolvers/yup";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { object } from "yup";
import { renderWithProviders } from "@shared/testing";
import { TextInputAdapter } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { requiredString } from "../../validators";

const schema = object({ name: requiredString(20) });

const TestForm = ({ onSubmit }: { onSubmit: (values: unknown) => void }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { name: "" },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <TextInputAdapter control={control} label="label" name="name" />
      <button type="submit">submit</button>
    </form>
  );
};

describe("TextInputAdapter", () => {
  it("показывает переведённую ошибку", async () => {
    renderWithProviders(<TestForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(await screen.findByText(ru.Errors.required)).toBeInTheDocument();
  });

  it("передаёт введённое значение в форму", async () => {
    const onSubmit = vi.fn();

    renderWithProviders(<TestForm onSubmit={onSubmit} />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "label" }),
      "Анна",
    );
    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(onSubmit).toHaveBeenCalledWith({ name: "Анна" }, expect.anything());
  });
});
