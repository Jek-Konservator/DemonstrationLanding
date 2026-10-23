import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // svgr — как в Next: icon.svg?react становится React-компонентом
  plugins: [tsconfigPaths(), react(), svgr()],
  resolve: {
    alias: {
      // В Next server-only пустой на сервере (условие react-server) и падает в браузере.
      // В vitest этого условия нет — подставляем пустой модуль, как на сервере
      "server-only": fileURLToPath(
        new URL("node_modules/server-only/empty.js", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: {
      modules: { classNameStrategy: "non-scoped" },
    },
    server: {
      deps: { inline: ["next-intl"] },
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/app/**",
        "src/middleware.ts",
        "src/shared/config/i18n/**",
        "src/shared/testing/**",
        // next/font работает только в компиляторе Next — в vitest не проверить
        "src/shared/uikit/theme/fonts.ts",
        "src/**/index.ts",
        "src/**/*.d.ts",
        "src/**/*.test.{ts,tsx}",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
