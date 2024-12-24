import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from 'eslint-plugin-prettier'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: prettierPlugin,
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      "prettier/prettier": "warn",
      "turbo/no-undeclared-env-vars": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-namespace": "off"
      // 'sort-imports': 'warn',
    },
  },
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/**"],
  },
];
