// «1 200+» → число 1200 и формат, который вернёт разделитель разрядов и хвост:
// format(350) → «350+», format(1200) → «1 200+». Разделитель берём из самой
// строки словаря — в ru это пробел, в en запятая
export const parseStatValue = (value: string) => {
  const match = /^(\d[\d\s,.]*)(.*)$/.exec(value);

  if (!match) {
    return null;
  }

  const [, digits = "", suffix = ""] = match;
  const separator = digits.replace(/\d/g, "").charAt(0);

  return {
    target: Number(digits.replace(/\D/g, "")),
    format: (number: number) =>
      String(number).replace(/\B(?=(\d{3})+(?!\d))/g, separator) + suffix,
  };
};
