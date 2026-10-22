/** @type {import("prettier").Config} */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "^react$",
    "^next(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^@shared/(.*)$",
    "^@services/(.*)$",
    "^@entities/(.*)$",
    "^@features/(.*)$",
    "^@screens/(.*)$",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
