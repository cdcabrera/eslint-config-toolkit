/**
 * React ESLint configuration
 *
 * @module configs/react
 */

import { defineConfig } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import { base as baseConfig } from './base.js';

/**
 * Configuration for linting React.
 */
const config = [
  {
    extends: [baseConfig],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/function-component-definition': [
        2,
        {
          namedComponents: ['arrow-function', 'function-declaration', 'function-expression'],
          unnamedComponents: ['arrow-function', 'function-expression']
        }
      ],
      'react/jsx-boolean-value': [2, 'never'],
      'react/jsx-closing-bracket-location': [2, 'line-aligned'],
      'react/jsx-curly-spacing': [2, { when: 'never', children: true }],
      'react/jsx-equals-spacing': [2, 'never'],
      'react/jsx-filename-extension': 0,
      'react/jsx-first-prop-new-line': [2, 'multiline'],
      'react/jsx-fragments': [1, 'element'],
      'react/jsx-indent': [2, 2],
      'react/jsx-indent-props': [2, 2],
      'react/jsx-key': 2,
      'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
      'react/jsx-no-duplicate-props': 2,
      'react/jsx-no-undef': 2,
      'react/jsx-no-useless-fragment': 1,
      'react/jsx-pascal-case': 2,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-sort-props': [
        0,
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true
        }
      ],
      'react/jsx-tag-spacing': [
        2,
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],
      'react/jsx-uses-react': 2,
      'react/jsx-uses-vars': 2,
      'react/no-children-prop': 2,
      'react/no-danger': 1,
      'react/no-deprecated': 2,
      'react/no-direct-mutation-state': 2,
      'react/no-find-dom-node': 2,
      'react/no-is-mounted': 2,
      'react/no-string-refs': 2,
      'react/no-unescaped-entities': 2,
      'react/no-unknown-property': 2,
      'react/no-unused-prop-types': 1,
      'react/prefer-es6-class': [2, 'always'],
      'react/prefer-stateless-function': 1,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 2,
      'react/require-render-return': 2,
      'react/self-closing-comp': 2,
      'react/state-in-constructor': [1, 'never'],

      'react-hooks/exhaustive-deps': 1,
      'react-hooks/rules-of-hooks': 2,

      'import/extensions': [
        2,
        {
          json: 'always'
        }
      ],
      'import/no-extraneous-dependencies': [
        2,
        {
          devDependencies: true
        }
      ],

      'jsx-a11y/alt-text': 2,
      'jsx-a11y/anchor-has-content': 2,
      'jsx-a11y/anchor-is-valid': 1,
      'jsx-a11y/aria-props': 2,
      'jsx-a11y/aria-proptypes': 2,
      'jsx-a11y/aria-role': 2,
      'jsx-a11y/aria-unsupported-elements': 2,
      'jsx-a11y/click-events-have-key-events': 1,
      'jsx-a11y/heading-has-content': 2,
      'jsx-a11y/html-has-lang': 2,
      'jsx-a11y/img-redundant-alt': 2,
      'jsx-a11y/interactive-supports-focus': 1,
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelComponents: ['CustomInputLabel'],
          labelAttributes: ['label'],
          controlComponents: ['CustomInput'],
          depth: 3
        }
      ],
      'jsx-a11y/media-has-caption': 1,
      'jsx-a11y/mouse-events-have-key-events': 1,
      'jsx-a11y/no-access-key': 2,
      'jsx-a11y/no-autofocus': 1,
      'jsx-a11y/no-distracting-elements': 2,
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 1,
      'jsx-a11y/no-noninteractive-element-interactions': 1,
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 1,
      'jsx-a11y/no-redundant-roles': 2,
      'jsx-a11y/role-has-required-aria-props': 2,
      'jsx-a11y/role-supports-aria-props': 2,
      'jsx-a11y/scope': 2,
      'jsx-a11y/tabindex-no-positive': 1
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      }
    }
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const react = defineConfig(config);

export { react as default, react, config };
