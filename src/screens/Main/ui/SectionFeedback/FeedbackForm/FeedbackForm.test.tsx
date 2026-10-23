import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@shared/testing";
import { request } from "@services/request";
import { createLeadQuery, planSelected } from "@entities/Lead";
import { FeedbackForm } from ".";
import ru from "../../../../../../dictionaries/ru.json";

const texts = ru.Sections.Feedback;

const fillForm = async () => {
  await userEvent.type(
    screen.getByRole("textbox", { name: texts.fields.name.label }),
    "Анна",
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: texts.fields.phone.label }),
    "9991234567",
  );
  await userEvent.click(
    screen.getByRole("textbox", { name: texts.fields.plan.label }),
  );
  await userEvent.click(
    await screen.findByRole("option", {
      name: ru.Sections.Pricing.list.standard.name,
    }),
  );
  await userEvent.click(
    screen.getByRole("checkbox", { name: texts.fields.consent }),
  );
};

const submit = () =>
  userEvent.click(screen.getByRole("button", { name: texts.submit }));

describe("FeedbackForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    // Стор заявки общий для всех тестов — сбрасываем между ними
    act(() => {
      createLeadQuery.reset();
    });
  });

  it("пустая форма — ошибки у полей, запроса нет", async () => {
    const post = vi.spyOn(request, "post");

    renderWithProviders(<FeedbackForm />);
    await submit();

    expect(await screen.findAllByText(ru.Errors.required)).toHaveLength(4);
    expect(post).not.toHaveBeenCalled();
  });

  it("отправляет заявку, показывает успех, «ещё одну» очищает форму", async () => {
    const post = vi
      .spyOn(request, "post")
      .mockResolvedValue({ data: { ok: true } });

    renderWithProviders(<FeedbackForm />);
    await fillForm();
    await submit();

    expect(await screen.findByRole("status")).toHaveTextContent(
      texts.success.title,
    );
    expect(post).toHaveBeenCalledWith("/lead", {
      name: "Анна",
      phone: "+7 (999) 123-45-67",
      plan: "standard",
      consent: true,
      website: "",
    });

    await userEvent.click(
      screen.getByRole("button", { name: texts.success.button }),
    );

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: texts.fields.name.label }),
    ).toHaveValue("");
  });

  it("ошибка — alert, «попробовать снова» возвращает заполненную форму", async () => {
    vi.spyOn(request, "post").mockRejectedValue(new Error("Network Error"));

    renderWithProviders(<FeedbackForm />);
    await fillForm();
    await submit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      texts.error.title,
    );

    await userEvent.click(
      screen.getByRole("button", { name: texts.error.button }),
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: texts.fields.name.label }),
    ).toHaveValue("Анна");
  });

  it("пока заявка отправляется, кнопка заблокирована", async () => {
    vi.spyOn(request, "post").mockReturnValue(new Promise(() => undefined));

    renderWithProviders(<FeedbackForm />);
    await fillForm();
    await submit();

    expect(screen.getByRole("button", { name: texts.submit })).toBeDisabled();
  });

  it("кнопка тарифа в «Тарифах» выбирает его в форме", () => {
    renderWithProviders(<FeedbackForm />);

    act(() => {
      planSelected("premium");
    });

    expect(
      screen.getByRole("textbox", { name: texts.fields.plan.label }),
    ).toHaveValue(ru.Sections.Pricing.list.premium.name);
  });

  // Последним: выбранный тариф остаётся в сторе и подставился бы в тесты выше
  it("тариф выбрали до загрузки формы — он уже подставлен", () => {
    planSelected("basic");

    renderWithProviders(<FeedbackForm />);

    expect(
      screen.getByRole("textbox", { name: texts.fields.plan.label }),
    ).toHaveValue(ru.Sections.Pricing.list.basic.name);
  });
});
