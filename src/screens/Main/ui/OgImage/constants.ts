// Размер превью для соцсетей и мессенджеров
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

// Шрифт картинки — Manrope, как на сайте; файлы в assets/ (лицензия OFL).
// Латиница и кириллица — разные файлы. С одним именем next/og берёт только
// первый, поэтому имена разные, а в font-family они идут списком
const LATIN = "Manrope Latin";
const CYRILLIC = "Manrope Cyrillic";

export const OG_FONT_FAMILY = `${LATIN}, ${CYRILLIC}`;

export const OG_FONT_FILES = [
  { file: "manrope-latin-500-normal.woff", name: LATIN, weight: 500 },
  { file: "manrope-cyrillic-500-normal.woff", name: CYRILLIC, weight: 500 },
  { file: "manrope-latin-800-normal.woff", name: LATIN, weight: 800 },
  { file: "manrope-cyrillic-800-normal.woff", name: CYRILLIC, weight: 800 },
] as const;
