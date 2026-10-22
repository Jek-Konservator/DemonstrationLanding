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

// Минимум типов webpack, который нужен для правила SVG
interface WebpackRule {
  test?: unknown;
  exclude?: unknown;
  resourceQuery?: { not?: unknown[] };
}

interface WebpackConfig {
  module: { rules: WebpackRule[] };
}

const isSvgRule = (rule: WebpackRule) =>
  rule.test instanceof RegExp && rule.test.test(".svg");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@use "sass:map";\n@use "${THEME_SCSS}" as *;\n`,
  },
  // icon.svg?react — React-компонент через svgr, остальные SVG — файлы, как раньше
  webpack: (config: WebpackConfig) => {
    const fileLoaderRule = config.module.rules.find(isSvgRule);

    if (fileLoaderRule) {
      const notQueries = fileLoaderRule.resourceQuery?.not ?? [];

      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: { not: [...notQueries, /react/] },
        },
        { test: /\.svg$/i, resourceQuery: /react/, use: ["@svgr/webpack"] },
      );
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default withNextIntl(nextConfig);
