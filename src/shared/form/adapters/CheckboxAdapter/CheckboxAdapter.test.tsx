import { yupResolver } from "@hookform/resolvers/yup";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { boolean, object } from "yup";
import { renderWithProviders } from "@shared/testing";
import { CheckboxAdapter } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { ERROR_NAMES } from "../../constants";

const schema = object({
  consent: boolean().required().oneOf([true], ERROR_NAMES.required),
});

const TestForm = ({ onSubmit }: { onSubmit: (values: unknown) => void }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { consent: false },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <CheckboxAdapter control={control} label="label" name="consent" />
      <button type="submit">submit</button>
    </form>
  );
};

describe("CheckboxAdapter", () => {
  it("без отметки — переведённая ошибка", async () => {
    renderWithProviders(<TestForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(await screen.findByText(ru.Errors.required)).toBeInTheDocument();
  });

  it("передаёт отметку в форму", async () => {
    const onSubmit = vi.fn();

    renderWithProviders(<TestForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("checkbox", { name: "label" }));
    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(onSubmit).toHaveBeenCalledWith({ consent: true }, expect.anything());
  });
});
