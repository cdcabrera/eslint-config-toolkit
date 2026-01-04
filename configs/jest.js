/**
 * Jest ESLint configuration
 *
 * Provides linting rules for Jest testing code.
 *
 * @module configs/jest
 */

import { defineConfig } from 'eslint/config';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

/**
 * Configuration for linting Jest.
 *
 * Key features:
 * - **Test validation**: Ensures tests have proper expectations and valid assertions
 * - **Test organization**: Prevents duplicate test titles and disabled/focused tests
 * - **Jest globals**: Provides access to Jest-specific global variables and functions
 *
 * @type {Config[]}
 */
const config = [
  {
    plugins: {
      jest: jestPlugin
    },
    // -------------------------------------------------------------------------
    // Jest testing rules
    // -------------------------------------------------------------------------
    rules: {
      // jest/expect-expect: Set to error to ensure tests contain at least one assertion
      'jest/expect-expect': 2,

      // jest/no-disabled-tests: Set to warning to flag tests that need attention
      'jest/no-disabled-tests': 1,

      // jest/no-focused-tests: Set to error to prevent accidentally committing focused tests
      // Example: fit('test', () => {}) or describe.only('suite', () => {})
      'jest/no-focused-tests': 2,

      // jest/no-identical-title: Set to error to prevent duplicate test titles
      'jest/no-identical-title': 2,

      // jest/valid-expect: Set to error to ensure expect() assertions use correct syntax
      'jest/valid-expect': 2
    },
    // -------------------------------------------------------------------------
    // Jest environment configuration
    // -------------------------------------------------------------------------
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];

/** @type {Config[]} - Processed config. */
const jest = defineConfig(config);

export { jest as default, jest, config };
