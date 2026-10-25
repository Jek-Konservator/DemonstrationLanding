import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_FONT_FILES } from "./constants";

const ASSETS_DIR = join(process.cwd(), "src/screens/Main/ui/OgImage/assets");

// Шрифт по умолчанию в next/og без кириллицы — подключаем свой.
export const loadOgFonts = () =>
  Promise.all(
    OG_FONT_FILES.map(async ({ file, name, weight }) => ({
      name,
      data: await readFile(join(ASSETS_DIR, file)),
      weight,
      style: "normal" as const,
    })),
  );
