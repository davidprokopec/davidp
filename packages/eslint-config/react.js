import { config as reactInternalConfig } from "./react-internal.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const reactConfig = [
  ...reactInternalConfig,
];
