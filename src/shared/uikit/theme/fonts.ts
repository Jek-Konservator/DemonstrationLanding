// Только для layout: next/font работает лишь в компиляторе Next, поэтому
// модуль не реэкспортируется из @ui/theme и не попадает в тесты
import { Manrope } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});
