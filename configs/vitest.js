/**
 * Vitest ESLint configuration
 *
 * Provides linting rules for Vitest testing code.
 *
 * @module configs/vitest
 */

import { defineConfig } from 'eslint/config';
import vitestPlugin from '@vitest/eslint-plugin';
import globals from 'globals';

/**
 * Configuration for linting Vitest.
 *
 * Key features:
 * - **Test validation**: Ensures tests have proper expectations and valid assertions
 * - **Test organization**: Prevents duplicate test titles and disabled/focused tests
 * - **Vitest globals**: Provides access to Vitest-specific global variables (vi, describe, it, expect, etc.)
 *
 * @type {Config[]}
 */
const config = [
  {
    plugins: {
      vitest: vitestPlugin
    },
    // -------------------------------------------------------------------------
    // Vitest testing rules
    // -------------------------------------------------------------------------
    rules: {
      // vitest/expect-expect: Set to error to ensure tests contain at least one assertion
      'vitest/expect-expect': 2,

      // vitest/no-disabled-tests: Set to warning to flag tests that need attention
      'vitest/no-disabled-tests': 1,

      // vitest/no-focused-tests: Set to error to prevent accidentally committing focused tests
      'vitest/no-focused-tests': 2,

      // vitest/no-identical-title: Set to error to prevent duplicate test titles
      'vitest/no-identical-title': 2,

      // vitest/valid-expect: Set to error to ensure expect() assertions use correct syntax
      'vitest/valid-expect': 2
    },
    // -------------------------------------------------------------------------
    // Vitest environment configuration
    // -------------------------------------------------------------------------
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  }
];

/** @type {Config[]} - Processed config. */
const vitest = defineConfig(config);

export { vitest as default, vitest, config };
