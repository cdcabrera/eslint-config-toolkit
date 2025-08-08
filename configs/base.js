/**
 * Base ESLint configuration for JavaScript projects
 *
 * @module configs/base
 */

import { join } from 'node:path';
import { defineConfig } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import eslintJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import commentLength from 'eslint-plugin-comment-length';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const { configs: jsConfigs } = eslintJs;

/**
 * Base configuration
 *
 * - **GitIgnore integration**: Automatically includes `.gitignore` patterns to exclude files from linting.
 * - **JavaScript base configuration**: Leverages recommended ESLint base rules with overrides for variable use and
 *     declarations.
 * - **Stylistic rules**: Enforces consistent code styling, such as indentation, trailing spaces, and maximum line
 *     lengths.
 * - **Import rules**: Manages best practices and order of import statements.
 * - **Comment length rules**: Ensures maximum lengths for single-line and multi-line comments with logical wrapping
 *     support.
 * - **JSDoc rules**: Enforces proper documentation for public APIs, parameter definitions, and return types.
 * - **Prettier integration**: Ensures compatible formatting using Prettier, with conflict resolution for overlapping
 *     rules.
 */
const config = [
  // GitIgnore integration
  includeIgnoreFile(join(process.cwd(), '.gitignore')),
  // Base JavaScript configuration
  jsConfigs.recommended,
  // Variable rules
  {
    rules: {
      'consistent-return': 1,
      'func-names': [2, 'as-needed'],
      'no-bitwise': 1,
      'no-debugger': 1,
      'no-empty': [
        2,
        {
          allowEmptyCatch: true
        }
      ],
      'no-implicit-coercion': [
        2,
        {
          boolean: true,
          number: true,
          string: true,
          allow: []
        }
      ],
      'no-param-reassign': [
        2,
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc',
            'accumulator',
            'context',
            'ctx',
            'e',
            'req',
            'request',
            'res',
            'response',
            '$scope',
            'staticContext'
          ]
        }
      ],
      'no-plusplus': 0,
      'no-unsafe-optional-chaining': [
        2,
        {
          disallowArithmeticOperators: true
        }
      ],
      'no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none'
        }
      ],
      'no-var': 2,
      'padded-blocks': 0,
      'prefer-promise-reject-errors': [
        1,
        {
          allowEmptyReject: true
        }
      ],
      'prefer-spread': 1
    }
  },
  // Stylistic rules
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/comma-dangle': [2, 'always-multiline'],
      '@stylistic/indent': [2, 2, { SwitchCase: 1 }],
      '@stylistic/max-len': [2, { code: 120, ignoreComments: true, ignoreUrls: true }],
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/quotes': [2, 'single', { avoidEscape: true }],
      '@stylistic/semi': [2, 'always']
    }
  },
  // Import plugin rules
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/default': 2,
      'import/export': 2,
      'import/named': 2,
      'import/no-cycle': [
        1,
        {
          maxDepth: 5,
          ignoreExternal: true,
          disableScc: true
        }
      ],
      'import/no-dynamic-require': 1,
      'import/no-unresolved': 2,
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'ignore'
        }
      ]
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json']
        }
      }
    }
  },
  // Comment length rules
  {
    plugins: {
      'comment-length': commentLength
    },
    rules: {
      'comment-length/limit-multi-line-comments': [
        1,
        {
          maxLength: 120,
          logicalWrap: true
        }
      ],
      'comment-length/limit-single-line-comments': [
        1,
        {
          maxLength: 120,
          logicalWrap: true
        }
      ]
    }
  },
  // JSDoc rules
  {
    plugins: {
      jsdoc
    },
    rules: {
      'jsdoc/no-undefined-types': 2,
      'jsdoc/require-jsdoc': [
        2,
        {
          publicOnly: true,
          require: {
            ClassDeclaration: true,
            FunctionDeclaration: true,
            MethodDefinition: true
          }
        }
      ],
      'jsdoc/require-param': 2,
      'jsdoc/require-param-description': 0,
      'jsdoc/require-param-name': 2,
      'jsdoc/require-param-type': 2,
      'jsdoc/require-returns': 2,
      'jsdoc/require-returns-description': 0,
      'jsdoc/require-returns-type': 2,
      'jsdoc/tag-lines': [
        1,
        'always',
        {
          count: 0,
          applyToEndTag: false,
          startLines: 1
        }
      ]
    }
  },
  // Prettier integration
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': [
        2,
        {
          arrowParens: 'avoid',
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'none'
        }
      ]
    }
  },
  // Prettier config to avoid conflicts
  prettierConfig
];

/** @type {import('eslint').Linter.Config[]} */
const base = defineConfig(config);

export { base as default, base, config };
