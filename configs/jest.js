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
      // Ensures test cases contain at least one expect assertion
      // This prevents tests that don't actually verify anything
      'jest/expect-expect': 2,

      // Warns about disabled tests (skipped with .skip or xit/xdescribe)
      // Set to warning level to remind developers about tests that need attention
      // without breaking the build
      'jest/no-disabled-tests': 1,

      // Prevents focused tests (run exclusively with .only or fit/fdescribe)
      // Set to error level to prevent accidentally committing focused tests
      // which would skip all other tests in CI environments
      'jest/no-focused-tests': 2,

      // Prevents duplicate test titles within the same describe block
      // Duplicate titles make test reports confusing and can hide test failures
      'jest/no-identical-title': 2,

      // Ensures expect() assertions are valid
      // Catches common mistakes like expect(foo).to.be.true instead of expect(foo).toBe(true)
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

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const jest = defineConfig(config);

export { jest as default, jest, config };
