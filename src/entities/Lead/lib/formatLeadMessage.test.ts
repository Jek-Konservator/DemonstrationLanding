import { describe, expect, it } from "vitest";
import { formatLeadMessage } from "./formatLeadMessage";

describe("formatLeadMessage", () => {
  it("собирает текст заявки с названием тарифа", () => {
    expect(
      formatLeadMessage({
        name: "Анна",
        phone: "+7 (999) 123-45-67",
        plan: "standard",
        consent: true,
        website: "",
      }),
    ).toBe(
      "Новая заявка на курс\nИмя: Анна\nТелефон: +7 (999) 123-45-67\nТариф: С куратором",
    );
  });
});
