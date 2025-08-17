/**
 * React ESLint configuration
 *
 * Provides linting rules for React and JSX code to ensure best practices and consistent code style.
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
 *
 * Key features:
 * - **JSX formatting**: Enforces consistent JSX indentation and spacing
 * - **React Hooks**: Ensures proper usage of React hooks following the Rules of Hooks
 * - **Accessibility**: Includes a11y rules for creating accessible components
 * - **Component structure**: Enforces best practices for component definitions and props
 * - **Babel integration**: Provides advanced parsing for modern React syntax
 */
const config = [
  {
    // Extend the base configuration
    extends: [baseConfig],

    // -------------------------------------------------------------------------
    // React plugin configuration
    // -------------------------------------------------------------------------
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
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
      // react/function-component-definition: Set to allow arrow functions, function declarations, and expressions
      'react/function-component-definition': [
        2,
        {
          namedComponents: ['arrow-function', 'function-declaration', 'function-expression'],
          unnamedComponents: ['arrow-function', 'function-expression']
        }
      ],

      // react/jsx-boolean-value: Set to never to use shorthand syntax for boolean props
      // Example: <Component isActive /> instead of <Component isActive={true} />
      'react/jsx-boolean-value': [2, 'never'],

      // react/jsx-closing-bracket-location: Set to line-aligned for consistent bracket placement
      'react/jsx-closing-bracket-location': [2, 'line-aligned'],

      // react/jsx-curly-spacing: Set to never have spaces inside JSX curly braces
      'react/jsx-curly-spacing': [2, { when: 'never', children: true }],

      // react/jsx-equals-spacing: Set to never have spaces around equals signs in JSX props
      'react/jsx-equals-spacing': [2, 'never'],

      // react/jsx-filename-extension: Disabled to allow JSX in .js files
      'react/jsx-filename-extension': 0,

      // react/jsx-first-prop-new-line: Set to multiline to place first prop on new line in multiline JSX
      'react/jsx-first-prop-new-line': [2, 'multiline'],

      // react/jsx-fragments: Set to warning with element to prefer <React.Fragment> over <>
      'react/jsx-fragments': [1, 'element'],

      // react/jsx-indent: Set to 2 spaces for JSX indentation
      'react/jsx-indent': [2, 2],

      // react/jsx-indent-props: Set to 2 spaces for JSX props indentation
      'react/jsx-indent-props': [2, 2],

      // react/jsx-key: Set to error to require key prop for elements in arrays
      'react/jsx-key': 2,

      // react/jsx-max-props-per-line: Set to 1 prop per line for multiline JSX
      'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],

      // react/jsx-no-duplicate-props: Set to error to prevent duplicate props
      'react/jsx-no-duplicate-props': 2,

      // react/jsx-no-undef: Set to error to prevent undefined variables in JSX
      'react/jsx-no-undef': 2,

      // react/jsx-no-useless-fragment: Set to warning to flag unnecessary fragments
      // Example: <>{child}</> should be just {child}
      'react/jsx-no-useless-fragment': 1,

      // react/jsx-pascal-case: Set to error to enforce PascalCase for components
      'react/jsx-pascal-case': 2,

      // react/jsx-props-no-spreading: Disabled to allow props spreading
      // Example: <Component {...props} />
      'react/jsx-props-no-spreading': 0,

      // react/jsx-sort-props: Disabled but configuration kept for reference
      'react/jsx-sort-props': [
        0,
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true
        }
      ],

      // react/jsx-tag-spacing: Set to enforce consistent spacing in JSX tags
      'react/jsx-tag-spacing': [
        2,
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],

      // react/jsx-uses-react: Set to error to prevent React being marked as unused
      'react/jsx-uses-react': 2,

      // react/jsx-uses-vars: Set to error to prevent variables in JSX being marked as unused
      'react/jsx-uses-vars': 2,

      // react/no-children-prop: Set to error to prevent passing children as props
      // Example: Use <Component><div /></Component> instead of <Component children={<div />} />
      'react/no-children-prop': 2,

      // react/no-danger: Set to warning due to security implications
      'react/no-danger': 1,

      // react/no-deprecated: Set to error to prevent usage of deprecated React features
      'react/no-deprecated': 2,

      // react/no-direct-mutation-state: Set to error to prevent direct state mutation
      'react/no-direct-mutation-state': 2,

      // react/no-find-dom-node: Set to error as this API is deprecated in StrictMode
      'react/no-find-dom-node': 2,

      // react/no-is-mounted: Set to error as this API is deprecated
      'react/no-is-mounted': 2,

      // react/no-string-refs: Set to error as string refs are deprecated
      'react/no-string-refs': 2,

      // react/no-unescaped-entities: Set to error to prevent invalid characters in JSX
      'react/no-unescaped-entities': 2,

      // react/no-unknown-property: Set to error to prevent typos in DOM properties
      'react/no-unknown-property': 2,

      // react/no-unused-prop-types: Set to warning to flag unused propTypes
      'react/no-unused-prop-types': 1,

      // react/prefer-es6-class: Set to always use ES6 classes for components
      'react/prefer-es6-class': [2, 'always'],

      // react/prefer-stateless-function: Set to warning to encourage function components
      'react/prefer-stateless-function': 1,

      // react/prop-types: Disabled to allow alternative type systems
      'react/prop-types': 0,

      // react/react-in-jsx-scope: Set to error to require React in scope for JSX
      'react/react-in-jsx-scope': 2,

      // react/require-render-return: Set to error to ensure render methods return a value
      'react/require-render-return': 2,

      // react/self-closing-comp: Set to error to enforce self-closing for empty components
      'react/self-closing-comp': 2,

      // react/state-in-constructor: Set to warning with never to encourage class fields
      'react/state-in-constructor': [1, 'never'],

      // -------------------------------------------------------------------------
      // React Hooks rules
      // -------------------------------------------------------------------------

      // react-hooks/exhaustive-deps: Set to warning to flag missing dependencies in hooks
      'react-hooks/exhaustive-deps': 1,

      // react-hooks/rules-of-hooks: Set to error to enforce Rules of Hooks
      'react-hooks/rules-of-hooks': 2,

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

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const react = defineConfig(config);

export { react as default, react, config };
