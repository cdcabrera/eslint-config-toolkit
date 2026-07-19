/**
 * React ESLint configuration
 *
 * Provides linting rules for React and JSX code to ensure best practices and consistent code style.
 *
 * @module configs/react
 */

import { defineConfig } from 'eslint/config';
import reactPlugin from '@eslint-react/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import { base as baseConfig } from './base.js';

/**
 * Configuration for linting React.
 *
 * Key features:
 * - **JSX formatting**: Enforces consistent JSX indentation and spacing
 * - **React Hooks**: Ensures proper usage of React hooks following the Rules of Hooks
 * - **Accessibility**: Includes a11y rules for creating accessible components
 * - **Component structure**: Enforces best practices for component definitions and props
 * - **Babel integration**: Provides advanced parsing for modern React syntax
 *
 * @type {Config[]}
 */
const config = [
  {
    // Extend the base configuration
    extends: [baseConfig],

    // -------------------------------------------------------------------------
    // React plugin configuration
    // -------------------------------------------------------------------------
    plugins: {
      '@eslint-react': reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin
    },

    // Configure React settings to automatically detect React version
    // This ensures the linter uses the correct version-specific rules
    settings: {
      react: {
        version: 'detect'
      }
    },

    // -------------------------------------------------------------------------
    // React core rules
    // -------------------------------------------------------------------------
    rules: {
      // Use recommended rules from @eslint-react
      ...reactPlugin.configs.recommended.rules,

      // @eslint-react/no-missing-key: Set to error to require key prop for elements in arrays
      '@eslint-react/no-missing-key': 2,

      // @eslint-react/dom-no-dangerously-set-innerhtml: Set to warning due to security implications of raw HTML
      '@eslint-react/dom-no-dangerously-set-innerhtml': 1,

      // @eslint-react/no-direct-mutation-state: Set to error to prevent direct state mutation which bypasses React lifecycle
      '@eslint-react/no-direct-mutation-state': 2,

      // @eslint-react/jsx-no-useless-fragment: Set to warning to flag unnecessary fragments that add bloat to the DOM
      '@eslint-react/jsx-no-useless-fragment': 1,

      // @eslint-react/dom-no-find-dom-node: Set to error as this API is deprecated and discouraged in modern React
      '@eslint-react/dom-no-find-dom-node': 2,

      // @eslint-react/jsx-no-children-prop: Set to error to prevent passing children as props instead of as component children
      '@eslint-react/jsx-no-children-prop': 2,

      // @eslint-react/dom-no-unknown-property: Set to error to prevent typos in DOM properties and encourage camelCase
      '@eslint-react/dom-no-unknown-property': 2,

      // @stylistic/jsx-shorthand-boolean: Set to error to enforce shorthand syntax for boolean props - set for release under 6.0.0
      // '@stylistic/jsx-shorthand-boolean': 2,

      // @stylistic/jsx-shorthand-fragment: Set to warning to prefer shorthand <> fragments - set for release under 6.0.0
      // '@stylistic/jsx-shorthand-fragment': 1,

      // @eslint-react/jsx-no-duplicate-props: Set to error to prevent duplicate properties on JSX elements - unnecessary now
      // '@eslint-react/jsx-no-duplicate-props': 2,

      // -------------------------------------------------------------------------
      // Stylistic React/JSX rules
      // -------------------------------------------------------------------------
      // @stylistic/jsx-indent: Set to 2 spaces for consistent JSX indentation
      '@stylistic/jsx-indent': [2, 2],

      // @stylistic/jsx-indent-props: Set to 2 spaces for consistent JSX props indentation
      '@stylistic/jsx-indent-props': [2, 2],

      // @stylistic/jsx-closing-bracket-location: Set to line-aligned for consistent bracket placement in multiline JSX
      '@stylistic/jsx-closing-bracket-location': [2, 'line-aligned'],

      // @stylistic/jsx-curly-spacing: Set to never have spaces inside JSX curly braces
      '@stylistic/jsx-curly-spacing': [2, { when: 'never', children: true }],

      // @stylistic/jsx-equals-spacing: Set to never have spaces around equals signs in JSX props
      '@stylistic/jsx-equals-spacing': [2, 'never'],

      // @stylistic/jsx-first-prop-new-line: Set to multiline to place first prop on new line in multiline JSX
      '@stylistic/jsx-first-prop-new-line': [2, 'multiline'],

      // @stylistic/jsx-max-props-per-line: Set to 1 prop per line for multiline JSX to improve readability
      '@stylistic/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],

      // @stylistic/jsx-pascal-case: Set to error to enforce PascalCase for React components
      '@stylistic/jsx-pascal-case': 2,

      // @stylistic/jsx-tag-spacing: Set to enforce consistent spacing in JSX tags for better readability
      '@stylistic/jsx-tag-spacing': [
        2,
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],

      // -------------------------------------------------------------------------
      // React Hooks rules
      // -------------------------------------------------------------------------

      // @eslint-react/exhaustive-deps: Set to warning to flag missing dependencies in hooks
      '@eslint-react/exhaustive-deps': 1,

      // @eslint-react/rules-of-hooks: Set to error to enforce the Rules of Hooks
      '@eslint-react/rules-of-hooks': 2,

      // -------------------------------------------------------------------------
      // Import rules for React projects
      // -------------------------------------------------------------------------

      // import/extensions: Set to require .json extension for JSON files
      'import/extensions': [
        2,
        {
          json: 'always'
        }
      ],

      // import/no-extraneous-dependencies: Set to allow importing devDependencies
      'import/no-extraneous-dependencies': [
        2,
        {
          devDependencies: true
        }
      ],

      // -------------------------------------------------------------------------
      // JSX Accessibility (A11y) rules
      // -------------------------------------------------------------------------

      // jsx-a11y/alt-text: Set to error to require alt text for images
      'jsx-a11y/alt-text': 2,

      // jsx-a11y/anchor-has-content: Set to error to require content in anchors
      'jsx-a11y/anchor-has-content': 2,

      // jsx-a11y/anchor-is-valid: Set to warning to flag potentially invalid href attributes
      'jsx-a11y/anchor-is-valid': 1,

      // jsx-a11y/aria-props: Set to error to ensure ARIA properties are valid
      'jsx-a11y/aria-props': 2,

      // jsx-a11y/aria-proptypes: Set to error to ensure ARIA properties have valid values
      'jsx-a11y/aria-proptypes': 2,

      // jsx-a11y/aria-role: Set to error to ensure ARIA roles are valid
      'jsx-a11y/aria-role': 2,

      // jsx-a11y/aria-unsupported-elements: Set to error to prevent ARIA roles on unsupported elements
      'jsx-a11y/aria-unsupported-elements': 2,

      // jsx-a11y/click-events-have-key-events: Set to warning to encourage keyboard accessibility
      'jsx-a11y/click-events-have-key-events': 1,

      // jsx-a11y/heading-has-content: Set to error to require content in headings
      'jsx-a11y/heading-has-content': 2,

      // jsx-a11y/html-has-lang: Set to error to require lang attribute on HTML documents
      'jsx-a11y/html-has-lang': 2,

      // jsx-a11y/img-redundant-alt: Set to error to prevent redundant words in alt text
      'jsx-a11y/img-redundant-alt': 2,

      // jsx-a11y/interactive-supports-focus: Set to warning to encourage proper focus management
      'jsx-a11y/interactive-supports-focus': 1,

      // jsx-a11y/label-has-associated-control: Set to error with custom component support
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelComponents: ['CustomInputLabel'],
          labelAttributes: ['label'],
          controlComponents: ['CustomInput'],
          depth: 3
        }
      ],

      // jsx-a11y/media-has-caption: Set to warning to encourage captions for media
      'jsx-a11y/media-has-caption': 1,

      // jsx-a11y/mouse-events-have-key-events: Set to warning to encourage keyboard accessibility
      'jsx-a11y/mouse-events-have-key-events': 1,

      // jsx-a11y/no-access-key: Set to error to prevent accessKey attribute usage
      'jsx-a11y/no-access-key': 2,

      // jsx-a11y/no-autofocus: Set to warning to discourage autoFocus attribute
      'jsx-a11y/no-autofocus': 1,

      // jsx-a11y/no-distracting-elements: Set to error to prevent distracting elements
      'jsx-a11y/no-distracting-elements': 2,

      // jsx-a11y/no-interactive-element-to-noninteractive-role: Set to warning to flag role mismatches
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 1,

      // jsx-a11y/no-noninteractive-element-interactions: Set to warning to flag event listeners on non-interactive elements
      'jsx-a11y/no-noninteractive-element-interactions': 1,

      // jsx-a11y/no-noninteractive-element-to-interactive-role: Set to warning to flag role mismatches
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 1,

      // jsx-a11y/no-redundant-roles: Set to error to prevent redundant ARIA roles
      'jsx-a11y/no-redundant-roles': 2,

      // jsx-a11y/role-has-required-aria-props: Set to error to ensure roles have required attributes
      'jsx-a11y/role-has-required-aria-props': 2,

      // jsx-a11y/role-supports-aria-props: Set to error to ensure roles support their ARIA attributes
      'jsx-a11y/role-supports-aria-props': 2,

      // jsx-a11y/scope: Set to error to ensure scope attribute is only used on th elements
      'jsx-a11y/scope': 2,

      // jsx-a11y/tabindex-no-positive: Set to warning to discourage positive tabIndex values
      'jsx-a11y/tabindex-no-positive': 1
    },
    // -------------------------------------------------------------------------
    // React environment configuration
    // -------------------------------------------------------------------------
    languageOptions: {
      // Set to include both browser and Node.js globals for universal React applications
      globals: {
        ...globals.browser,
        ...globals.node
      },
      // Enable JSX parsing for all JavaScript files
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // -------------------------------------------------------------------------
  // JSX and TSX file specific configuration
  // -------------------------------------------------------------------------
  {
    // Target JSX and TSX files specifically
    files: ['**/*.jsx', '**/*.tsx'],

    // Configure Babel parser for JSX support
    languageOptions: {
      // Use Babel parser for JSX parsing
      parser: babelParser,
      parserOptions: {
        // Set to latest ECMAScript features
        ecmaVersion: 'latest',
        // Set to module for ES modules
        sourceType: 'module',
        // Enable JSX syntax
        ecmaFeatures: {
          jsx: true
        },
        // Set to false to work without a Babel configuration file
        requireConfigFile: false,
        // Configure with React preset for JSX transformations
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      }
    }
  }
];

/** @type {Config[]} - Processed config. */
const react = defineConfig(config);

export { react as default, react, config };
