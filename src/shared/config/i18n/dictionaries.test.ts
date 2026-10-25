import { describe, expect, it } from "vitest";
import en from "../../../../dictionaries/en.json";
import ru from "../../../../dictionaries/ru.json";

// Все ключи словаря в виде путей: "Sections.Main.title"
const collectKeys = (dictionary: object, prefix = ""): string[] =>
  Object.entries(dictionary).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    return typeof value === "object" && value !== null
      ? collectKeys(value as object, path)
      : [path];
  });

describe("dictionaries", () => {
  it("набор ключей в ru.json и en.json совпадает", () => {
    expect(collectKeys(en).sort()).toEqual(collectKeys(ru).sort());
  });
});
