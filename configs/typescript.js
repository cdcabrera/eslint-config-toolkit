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
      // Disable base rules that TypeScript handles
      'no-unused-vars': 0,
      'no-undef': 0,
      'import/no-unresolved': 0,
      'jsdoc/require-returns': 0,
      'jsdoc/require-returns-type': 0,
      'jsdoc/require-param-type': 0,

      // TypeScript-specific rules
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false
        }
      ],
      '@typescript-eslint/consistent-type-exports': [
        2,
        {
          fixMixedExportsWithInlineTypeSpecifier: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 1,
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
      '@typescript-eslint/no-explicit-any': 0,
      'no-console': 0
    }
  }
];

/** @type {Config[]} - Processed config. */
const typescript = defineConfig(config);

export { typescript as default, typescript, config };
