import { yupResolver } from "@hookform/resolvers/yup";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { object } from "yup";
import { renderWithProviders } from "@shared/testing";
import { PhoneInputAdapter } from ".";
import ru from "../../../../../dictionaries/ru.json";
import { PHONE_MASKS } from "../../constants";
import { phone } from "../../validators";

const schema = object({ phone: phone() });

const TestForm = ({ onSubmit }: { onSubmit: (values: unknown) => void }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { phone: "" },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <PhoneInputAdapter
        control={control}
        label="label"
        mask={PHONE_MASKS.ru}
        name="phone"
      />
      <button type="submit">submit</button>
    </form>
  );
};

describe("PhoneInputAdapter", () => {
  it("форматирует номер по маске и передаёт его в форму", async () => {
    const onSubmit = vi.fn();

    renderWithProviders(<TestForm onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox", { name: "label" });

    await userEvent.type(input, "9991234567");

    expect(input).toHaveValue("+7 (999) 123-45-67");

    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { phone: "+7 (999) 123-45-67" },
      expect.anything(),
    );
  });

  it("неполный номер — переведённая ошибка", async () => {
    renderWithProviders(<TestForm onSubmit={vi.fn()} />);

    await userEvent.type(screen.getByRole("textbox", { name: "label" }), "999");
    await userEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(await screen.findByText(ru.Errors.phone)).toBeInTheDocument();
  });
});
