/**
 * Jest ESLint configuration
 *
 * @module configs/jest
 */

import { defineConfig } from 'eslint/config';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

/**
 * Configuration for linting Jest.
 */
const config = [
  {
    plugins: {
      jest: jestPlugin
    },
    rules: {
      'jest/expect-expect': 2,
      'jest/no-disabled-tests': 1,
      'jest/no-focused-tests': 2,
      'jest/no-identical-title': 2,
      'jest/valid-expect': 2
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const jest = defineConfig(config);

export { jest as default, jest, config };
