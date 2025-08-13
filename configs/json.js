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
 */
const config = [
  {
    // -------------------------------------------------------------------------
    // JSON file targeting
    // -------------------------------------------------------------------------
    // Target all JSON files in the project
    // Exclude package-lock.json which is auto-generated and node_modules
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/node_modules/**'],

    // -------------------------------------------------------------------------
    // JSON plugin configuration
    // -------------------------------------------------------------------------
    // Register the JSON plugin to enable JSON-specific linting capabilities
    plugins: {
      json: jsonPlugin
    },

    // Use the recommended configuration from the JSON plugin
    // This includes rules for validating JSON syntax and detecting common errors
    extends: [jsonPlugin.configs.recommended]
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const json = defineConfig(config);

export { json as default, json, config };
