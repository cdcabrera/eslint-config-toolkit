/**
 * JSON ESLint configuration
 *
 * Provides linting rules for JSON files to ensure valid and consistent JSON syntax.
 *
 * @module configs/json
 */

import { defineConfig } from 'eslint/config';
import jsonPlugin from '@eslint/json';

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

    // Set to use the new language-based parser
    language: 'json/json',

    // Recommended rules for @eslint/json
    rules: {
      'json/no-duplicate-keys': 2,
      'json/no-empty-keys': 2,
      'json/no-unsafe-values': 2,
      'json/no-unnormalized-keys': 2
    }
  },
  {
    // -------------------------------------------------------------------------
    // JSONC (JSON with Comments) Support
    // -------------------------------------------------------------------------
    files: ['**/*.jsonc', '.vscode/*.json'],
    plugins: { json: jsonPlugin },
    language: 'json/jsonc',
    languageOptions: {
      allowTrailingCommas: true
    },
    rules: {
      'json/no-duplicate-keys': 2
    }
  }
];

/** @type {Config[]} - Processed config. */
const json = defineConfig(config);

export { json as default, json, config };
