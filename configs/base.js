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

const { configs: jsConfigs } = eslintJs;

/**
 * Base configuration
 *
 * - **GitIgnore integration**: Automatically includes `.gitignore` patterns to exclude files from linting.
 * - **JavaScript base configuration**: Leverages recommended ESLint base rules with overrides for variable use and
 *     declarations.
 * - **Stylistic rules**: Enforces consistent code styling, such as indentation, trailing spaces, and maximum line
 *     lengths using @stylistic plugin.
 * - **Import rules**: Manages best practices and order of import statements.
 * - **Comment length rules**: Ensures maximum lengths for single-line and multi-line comments with logical wrapping
 *     support.
 * - **JSDoc rules**: Enforces proper documentation for public APIs, parameter definitions, and return types.
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
      // -------------------------------------------------------------------------
      // Array formatting rules
      // -------------------------------------------------------------------------
      '@stylistic/array-bracket-newline': [2, 'consistent'],
      '@stylistic/array-bracket-spacing': [2, 'never'],
      '@stylistic/array-element-newline': [2, 'consistent'],

      // -------------------------------------------------------------------------
      // Block formatting rules
      // -------------------------------------------------------------------------
      '@stylistic/block-spacing': [2, 'always'],
      '@stylistic/brace-style': [2, '1tbs', { allowSingleLine: true }],

      // -------------------------------------------------------------------------
      // Comma rules
      // -------------------------------------------------------------------------
      '@stylistic/comma-dangle': [2, 'never'],
      '@stylistic/comma-spacing': [2, { before: false, after: true }],
      '@stylistic/comma-style': [2, 'last'],

      // -------------------------------------------------------------------------
      // Function formatting rules
      // -------------------------------------------------------------------------
      '@stylistic/function-call-spacing': [2, 'never'],
      '@stylistic/function-paren-newline': [2, 'consistent'],

      // -------------------------------------------------------------------------
      // Indentation and spacing rules
      // -------------------------------------------------------------------------
      '@stylistic/indent': [2, 2, { SwitchCase: 1 }],
      '@stylistic/key-spacing': [2, { beforeColon: false, afterColon: true }],
      '@stylistic/keyword-spacing': [2, { before: true, after: true }],
      '@stylistic/line-comment-position': 0,
      '@stylistic/linebreak-style': [2, 'unix'],
      '@stylistic/lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
      '@stylistic/max-len': [2, { code: 120, ignoreComments: true, ignoreUrls: true }],
      '@stylistic/max-statements-per-line': [2, { max: 1 }],
      '@stylistic/multiline-ternary': [2, 'always-multiline'],
      '@stylistic/new-parens': 2,
      '@stylistic/no-multi-spaces': 2,
      '@stylistic/no-multiple-empty-lines': [2, { max: 2, maxEOF: 1, maxBOF: 0 }],
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/no-whitespace-before-property': 2,

      // -------------------------------------------------------------------------
      // Object formatting rules
      // -------------------------------------------------------------------------
      '@stylistic/object-curly-newline': [2, { consistent: true }],
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],

      // -------------------------------------------------------------------------
      // Operator formatting rules
      // -------------------------------------------------------------------------
      '@stylistic/operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],

      // -------------------------------------------------------------------------
      // Quotes and semicolons
      // -------------------------------------------------------------------------
      '@stylistic/quotes': [2, 'single', { avoidEscape: true }],
      '@stylistic/semi': [2, 'always'],
      '@stylistic/semi-spacing': [2, { before: false, after: true }],
      '@stylistic/semi-style': [2, 'last'],

      // -------------------------------------------------------------------------
      // Spacing around brackets and parentheses
      // -------------------------------------------------------------------------
      '@stylistic/space-before-blocks': [2, 'always'],
      '@stylistic/space-before-function-paren': [2, { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@stylistic/space-in-parens': [2, 'never'],
      '@stylistic/space-infix-ops': 2,
      '@stylistic/space-unary-ops': [2, { words: true, nonwords: false }],
      '@stylistic/spaced-comment': [2, 'always', { exceptions: ['-', '+', '*'], markers: ['!', '/'] }],

      // -------------------------------------------------------------------------
      // Wrapping rules
      // -------------------------------------------------------------------------
      '@stylistic/wrap-regex': 0
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
  }
];

/** @type {import('eslint').Linter.Config[]} */
const base = defineConfig(config);

export { base as default, base, config };
