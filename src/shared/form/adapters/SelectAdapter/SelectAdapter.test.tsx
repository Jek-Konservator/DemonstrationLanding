import { yupResolver } from "@hookform/resolvers/yup";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { object, string } from "yup";
import { renderWithProviders } from "@shared/testing";
import { SelectAdapter } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { ERROR_NAMES } from "../../constants";

const schema = object({ plan: string().required(ERROR_NAMES.required) });

const TestForm = ({ onSubmit }: { onSubmit: (values: unknown) => void }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { plan: "" },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <SelectAdapter
        control={control}
        data={[
          { value: "first", label: "First" },
          { value: "second", label: "Second" },
        ]}
        label="label"
        name="plan"
      />
      <button type="submit">submit</button>
    </form>
  );
};

describe("SelectAdapter", () => {
  it("без выбора — переведённая ошибка", async () => {
    renderWithProviders(<TestForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(await screen.findByText(ru.Errors.required)).toBeInTheDocument();
  });

  it("передаёт выбранный пункт в форму", async () => {
    const onSubmit = vi.fn();

    renderWithProviders(<TestForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("textbox", { name: "label" }));
    await userEvent.click(
      await screen.findByRole("option", { name: "Second" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { plan: "second" },
      expect.anything(),
    );
  });
});
