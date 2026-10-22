import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
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
