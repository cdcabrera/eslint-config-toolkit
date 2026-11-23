/**
 * TypeScript ESLint configuration
 *
 * Provides linting rules for TypeScript code, leveraging typescript-eslint.
 *
 * @module configs/typescript
 */

import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

/**
 * Configuration for linting TypeScript.
 *
 * Key features:
 * - **Type-aware linting**: Integration with the TypeScript parser and compiler.
 * - **Rule Resets**: Automatically disables JavaScript rules that are handled by the TypeScript compiler (e.g., no-undef, no-unused-vars).
 * - **Consistency**: Enforces consistent type imports and exports.
 * - **Node.js Optimization**: Tailored for TypeScript in Node.js environments.
 *
 * @type {Config[]}
 */
const config = [
  // -------------------------------------------------------------------------
  // TypeScript base configuration
  // -------------------------------------------------------------------------
  ...tsEslint.configs.recommended,

  // -------------------------------------------------------------------------
  // Overrides for TypeScript files
  // -------------------------------------------------------------------------
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: true, // Automatically find tsconfig.json
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin
    },
    rules: {
      // -------------------------------------------------------------------------
      // Disabled base rules handled natively by TypeScript
      // -------------------------------------------------------------------------

      // no-unused-vars: Set to off in favor of @typescript-eslint/no-unused-vars
      'no-unused-vars': 0,

      // no-undef: Set to off since the TypeScript compiler checks undeclared identifiers
      'no-undef': 0,

      // import/no-unresolved: Set to off since TypeScript resolves module imports and type paths
      'import/no-unresolved': 0,

      // jsdoc/require-returns: Set to off since return types are expressed in TypeScript signatures
      'jsdoc/require-returns': 0,

      // jsdoc/require-returns-type: Set to off since TypeScript annotations provide return types
      'jsdoc/require-returns-type': 0,

      // jsdoc/require-param-type: Set to off since TypeScript annotations provide parameter types
      'jsdoc/require-param-type': 0,

      // -------------------------------------------------------------------------
      // TypeScript-specific rules
      // -------------------------------------------------------------------------

      // @typescript-eslint/consistent-type-imports: Set to error with inline-type-imports to enforce explicit type imports
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false
        }
      ],

      // @typescript-eslint/consistent-type-exports: Set to error with inline type specifiers to enforce explicit type exports
      '@typescript-eslint/consistent-type-exports': [
        2,
        {
          fixMixedExportsWithInlineTypeSpecifier: true
        }
      ],

      // @typescript-eslint/no-explicit-any: Set to warning to discourage unsafe any types while allowing gradual typing
      '@typescript-eslint/no-explicit-any': 1,

      // @typescript-eslint/no-unused-vars: Set to error while ignoring underscore-prefixed parameters and variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },

  // -------------------------------------------------------------------------
  // Test file overrides
  // -------------------------------------------------------------------------
  {
    files: ['**/*.test.ts', '**/__tests__/**/*.ts'],
    rules: {
      // @typescript-eslint/no-explicit-any: Set to off in tests for flexible mocking and fixtures
      '@typescript-eslint/no-explicit-any': 0,

      // no-console: Set to off in tests to allow diagnostic output
      'no-console': 0
    }
  }
];

/** @type {Config[]} - Processed config. */
const typescript = defineConfig(config);

export { typescript as default, typescript, config };
