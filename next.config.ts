import { resolve } from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/shared/config/i18n/request.ts",
);

// Переменные и миксины темы доступны в каждом SCSS-модуле без @use
const THEME_SCSS = resolve("src/shared/uikit/theme/theme.scss").replaceAll(
  "\\",
  "/",
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@use "sass:map";\n@use "${THEME_SCSS}" as *;\n`,
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default withNextIntl(nextConfig);
