/**
 * JSON ESLint configuration
 *
 * Provides linting rules for JSON files to ensure valid and consistent JSON syntax.
 *
 * @module configs/json
 */

import { defineConfig } from 'eslint/config';
import jsonPlugin from 'eslint-plugin-json';

/**
 * Configuration for linting JSON.
 *
 * Key features:
 * - **JSON validation**: Ensures all JSON files are valid and well-formed
 * - **Syntax error detection**: Identifies common JSON syntax errors like trailing commas
 * - **Selective targeting**: Applies only to .json files while ignoring package-lock.json
 *
 * @type {Config[]}
 */
const config = [
  {
    // -------------------------------------------------------------------------
    // JSON file targeting
    // -------------------------------------------------------------------------
    // Set to target all JSON files except package-lock.json and node_modules
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/node_modules/**'],

    // -------------------------------------------------------------------------
    // JSON plugin configuration
    // -------------------------------------------------------------------------
    // Register JSON plugin for JSON-specific linting
    plugins: {
      json: jsonPlugin
    },

    // Set to use recommended JSON plugin configuration
    extends: [jsonPlugin.configs.recommended]
  }
];

/** @type {Config[]} - Processed config. */
const json = defineConfig(config);

export { json as default, json, config };
