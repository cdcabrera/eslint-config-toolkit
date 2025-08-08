/**
 * JSON ESLint configuration
 *
 * @module configs/json
 */

import { defineConfig } from 'eslint/config';
import jsonPlugin from 'eslint-plugin-json';

/**
 * Configuration for linting JSON.
 */
const config = [
  {
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/node_modules/**'],
    plugins: {
      json: jsonPlugin
    },
    extends: [jsonPlugin.configs.recommended]
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const json = defineConfig(config);

export { json as default, json, config };
