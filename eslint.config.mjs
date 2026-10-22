import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { configs as tsConfigs } from "typescript-eslint";

// Слои: кто кого НЕ может импортировать
const LAYER_ZONES = [
  {
    target: "./src/shared",
    from: [
      "./src/services",
      "./src/entities",
      "./src/features",
      "./src/screens",
      "./src/app",
    ],
  },
  {
    target: "./src/services",
    from: ["./src/entities", "./src/features", "./src/screens", "./src/app"],
  },
  {
    target: "./src/entities",
    from: ["./src/features", "./src/screens", "./src/app"],
  },
  { target: "./src/features", from: ["./src/screens", "./src/app"] },
  { target: "./src/screens", from: ["./src/app"] },
];

export default defineConfig(
  {
    ignores: [
      "node_modules/",
      ".next/",
      "coverage/",
      "next-env.d.ts",
      "*.config.*",
      // Next ищет свой плагин, вычисляя конфиг для этого файла — его линтим
      "!eslint.config.mjs",
      ".stylelintrc.mjs",
    ],
  },
  js.configs.recommended,
  tsConfigs.recommendedTypeChecked,
  tsConfigs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-sort-props": ["error", { ignoreCase: true }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "import/no-restricted-paths": ["error", { zones: LAYER_ZONES }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@mantine/*"],
              message: "Компоненты Mantine импортируются только через @ui/*",
            },
          ],
        },
      ],
    },
  },
  {
    // Конфиги на JS не входят в tsconfig — проверка по типам для них не работает
    files: ["**/*.mjs"],
    extends: [tsConfigs.disableTypeChecked],
  },
  {
    files: ["src/shared/uikit/**"],
    rules: { "no-restricted-imports": "off" },
  },
  // Последним: выключает правила, которые спорят с prettier
  prettierConfig,
);
