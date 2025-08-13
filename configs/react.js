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
      // Component definition: Allow arrow functions, function declarations, and function expressions
      // This provides flexibility while ensuring consistent component structure
      'react/function-component-definition': [
        2,
        {
          namedComponents: ['arrow-function', 'function-declaration', 'function-expression'],
          unnamedComponents: ['arrow-function', 'function-expression']
        }
      ],

      // JSX boolean attributes should not include the value when it's true
      // Example: <Component isActive /> instead of <Component isActive={true} />
      'react/jsx-boolean-value': [2, 'never'],

      // Closing bracket location should align with the line of the opening tag
      // This improves readability for multiline JSX elements
      'react/jsx-closing-bracket-location': [2, 'line-aligned'],

      // No spaces inside curly braces in JSX
      // Example: <Component name={value} /> instead of <Component name={ value } />
      'react/jsx-curly-spacing': [2, { when: 'never', children: true }],

      // No spaces around equals signs in JSX props
      // Example: <Component name={value} /> instead of <Component name = {value} />
      'react/jsx-equals-spacing': [2, 'never'],

      // Allow JSX in .js files (not just .jsx files)
      // This provides flexibility for projects that use .js for all files
      'react/jsx-filename-extension': 0,

      // First prop should be on a new line when JSX spans multiple lines
      // Improves readability for components with many props
      'react/jsx-first-prop-new-line': [2, 'multiline'],

      // Prefer <React.Fragment> over <> (warning only)
      // The explicit syntax is more clear for new developers
      'react/jsx-fragments': [1, 'element'],

      // JSX should be indented with 2 spaces
      // Maintains consistent indentation throughout the codebase
      'react/jsx-indent': [2, 2],

      // JSX props should be indented with 2 spaces
      // Maintains consistent indentation throughout the codebase
      'react/jsx-indent-props': [2, 2],

      // Require key prop for elements in arrays
      // This is essential for React's reconciliation algorithm
      'react/jsx-key': 2,

      // One prop per line when JSX spans multiple lines
      // Improves readability for components with many props
      'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],

      // Prevent duplicate props in JSX
      // Duplicate props can cause unexpected behavior
      'react/jsx-no-duplicate-props': 2,

      // Prevent usage of undefined variables in JSX
      // Catches typos and missing imports
      'react/jsx-no-undef': 2,

      // Warn about unnecessary fragments
      // Example: <>{child}</> should be just {child}
      'react/jsx-no-useless-fragment': 1,

      // Enforce PascalCase for JSX components
      // This is the conventional naming pattern for React components
      'react/jsx-pascal-case': 2,

      // Allow JSX props spreading
      // This provides flexibility for component composition
      // Example: <Component {...props} />
      'react/jsx-props-no-spreading': 0,

      // Don't enforce sorting of props (disabled)
      // The configuration is kept for reference if needed in the future
      'react/jsx-sort-props': [
        0,
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true
        }
      ],

      // Enforce consistent spacing in JSX tags
      // This improves readability and consistency
      'react/jsx-tag-spacing': [
        2,
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],

      // Mark React as used when using JSX
      // Prevents React from being marked as an unused variable
      'react/jsx-uses-react': 2,

      // Mark variables used in JSX as used
      // Prevents variables from being marked as unused when used in JSX
      'react/jsx-uses-vars': 2,

      // Prevent passing children as props
      // Example: <Component children={<div />} /> should be <Component><div /></Component>
      'react/no-children-prop': 2,

      // Warn about using dangerouslySetInnerHTML
      // This is a security risk and should be used with caution
      'react/no-danger': 1,

      // Prevent usage of deprecated React features
      // Ensures code doesn't use APIs that may be removed in future React versions
      'react/no-deprecated': 2,

      // Prevent direct mutation of state
      // Always use setState() instead of this.state = {}
      'react/no-direct-mutation-state': 2,

      // Prevent usage of findDOMNode
      // This API is deprecated in StrictMode
      'react/no-find-dom-node': 2,

      // Prevent usage of isMounted
      // This API is deprecated and indicates problematic patterns
      'react/no-is-mounted': 2,

      // Prevent string refs
      // String refs are deprecated, use callback refs or createRef() instead
      'react/no-string-refs': 2,

      // Prevent invalid characters in JSX
      // Certain characters like > need to be escaped in JSX
      'react/no-unescaped-entities': 2,

      // Prevent usage of unknown DOM properties
      // Catches typos in DOM property names
      'react/no-unknown-property': 2,

      // Warn about unused prop types
      // This helps keep propTypes definitions clean
      'react/no-unused-prop-types': 1,

      // Enforce ES6 class for React components
      // Modern React code should use ES6 classes or function components
      'react/prefer-es6-class': [2, 'always'],

      // Encourage stateless functional components
      // Function components are simpler and have better performance characteristics
      'react/prefer-stateless-function': 1,

      // Don't require prop types validation
      // This allows for TypeScript or other type systems to be used instead
      'react/prop-types': 0,

      // Require React to be in scope when using JSX
      // This is necessary for React versions before 17
      'react/react-in-jsx-scope': 2,

      // Enforce render method to return a value
      // Prevents bugs from forgetting to return JSX from render
      'react/require-render-return': 2,

      // Enforce self-closing for components without children
      // Example: <Component /> instead of <Component></Component>
      'react/self-closing-comp': 2,

      // Warn when state is defined outside of constructor
      // Encourages using class fields for cleaner code
      'react/state-in-constructor': [1, 'never'],

      // -------------------------------------------------------------------------
      // React Hooks rules
      // -------------------------------------------------------------------------

      // Warn about missing dependencies in useEffect and similar hooks
      // This helps prevent stale closures and other bugs related to hooks dependencies
      // Set to warning level to allow exceptions when needed
      'react-hooks/exhaustive-deps': 1,

      // Enforce Rules of Hooks
      // This ensures hooks are called in the same order on every render
      // and are only called from React function components or custom hooks
      'react-hooks/rules-of-hooks': 2,

      // -------------------------------------------------------------------------
      // Import rules for React projects
      // -------------------------------------------------------------------------

      // Enforce consistent use of file extensions in import statements
      // Require .json extension for JSON files to make them clearly identifiable
      'import/extensions': [
        2,
        {
          json: 'always'
        }
      ],

      // Allow importing devDependencies in all files
      // This is useful for test files, storybook, and other development tools
      // that are typically imported in the same codebase
      'import/no-extraneous-dependencies': [
        2,
        {
          devDependencies: true
        }
      ],

      // -------------------------------------------------------------------------
      // JSX Accessibility (A11y) rules
      // -------------------------------------------------------------------------

      // Require alt text for img, area, input[type="image"], and object elements
      // Essential for screen readers to describe images to visually impaired users
      'jsx-a11y/alt-text': 2,

      // Enforce that anchors have content
      // Empty links are not announced properly by screen readers
      'jsx-a11y/anchor-has-content': 2,

      // Warn when anchor elements may be using invalid href attributes
      // Set to warning level to allow for edge cases like router-based navigation
      'jsx-a11y/anchor-is-valid': 1,

      // Enforce that all ARIA properties are valid
      // Prevents typos in ARIA property names
      'jsx-a11y/aria-props': 2,

      // Enforce that ARIA properties have valid values
      // Ensures ARIA properties have values that match their expected types
      'jsx-a11y/aria-proptypes': 2,

      // Enforce that elements with ARIA roles use a valid role value
      // Prevents using non-existent ARIA roles
      'jsx-a11y/aria-role': 2,

      // Enforce that elements that do not support ARIA roles don't have them
      // Some HTML elements cannot have ARIA roles applied to them
      'jsx-a11y/aria-unsupported-elements': 2,

      // Warn when click events are used without accompanying keyboard events
      // Set to warning level to encourage keyboard accessibility
      // Example: Add onKeyPress when using onClick for interactive elements
      'jsx-a11y/click-events-have-key-events': 1,

      // Enforce that heading elements (h1, h2, etc.) have content
      // Empty headings are not announced properly by screen readers
      'jsx-a11y/heading-has-content': 2,

      // Enforce that HTML documents have a lang attribute
      // This helps screen readers pronounce content correctly
      'jsx-a11y/html-has-lang': 2,

      // Enforce that img elements have alt text that is not redundant
      // Prevents using phrases like "image of" in alt text, which is redundant
      'jsx-a11y/img-redundant-alt': 2,

      // Warn when interactive elements don't support focus
      // Set to warning level to encourage proper focus management
      'jsx-a11y/interactive-supports-focus': 1,

      // Enforce that form labels have associated controls
      // This ensures form fields are properly labeled for screen readers
      // Configured to work with custom input components
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelComponents: ['CustomInputLabel'],
          labelAttributes: ['label'],
          controlComponents: ['CustomInput'],
          depth: 3
        }
      ],

      // Warn when media elements don't have captions
      // Set to warning level to encourage adding captions to videos
      'jsx-a11y/media-has-caption': 1,

      // Warn when mouse events are used without accompanying keyboard events
      // Set to warning level to encourage keyboard accessibility
      'jsx-a11y/mouse-events-have-key-events': 1,

      // Prevent the use of accessKey attribute
      // Access keys can conflict with screen reader and keyboard shortcuts
      'jsx-a11y/no-access-key': 2,

      // Warn against using autoFocus attribute
      // AutoFocus can be disorienting for screen reader users
      'jsx-a11y/no-autofocus': 1,

      // Prevent the use of distracting elements like <marquee> and <blink>
      // These elements can cause issues for users with cognitive disabilities
      'jsx-a11y/no-distracting-elements': 2,

      // Warn when interactive elements are given non-interactive roles
      // Set to warning level to allow for edge cases
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 1,

      // Warn when non-interactive elements have mouse or keyboard event listeners
      // Set to warning level to allow for edge cases
      'jsx-a11y/no-noninteractive-element-interactions': 1,

      // Warn when non-interactive elements are assigned interactive roles
      // Set to warning level to allow for edge cases
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 1,

      // Prevent using redundant ARIA roles
      // Some elements have implicit roles that shouldn't be overridden
      'jsx-a11y/no-redundant-roles': 2,

      // Enforce that elements with ARIA roles have all required ARIA attributes
      // Some ARIA roles require specific attributes to function properly
      'jsx-a11y/role-has-required-aria-props': 2,

      // Enforce that elements with ARIA roles have only supported ARIA attributes
      // Prevents using ARIA attributes that aren't supported by a role
      'jsx-a11y/role-supports-aria-props': 2,

      // Enforce scope attribute is only used on <th> elements
      // The scope attribute is only valid on table header cells
      'jsx-a11y/scope': 2,

      // Warn against using positive tabIndex values
      // Positive tabindex values disrupt the natural tab order
      'jsx-a11y/tabindex-no-positive': 1
    },
    // -------------------------------------------------------------------------
    // React environment configuration
    // -------------------------------------------------------------------------
    languageOptions: {
      // Include both browser and Node.js globals
      // This supports universal/isomorphic React applications that run in both environments
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

    // Configure Babel parser for advanced JSX support
    languageOptions: {
      // Use Babel parser for enhanced JSX parsing capabilities
      parser: babelParser,
      parserOptions: {
        // Support latest ECMAScript features
        ecmaVersion: 'latest',
        // Treat files as ES modules
        sourceType: 'module',
        // Enable JSX syntax
        ecmaFeatures: {
          jsx: true
        },
        // Don't require a Babel configuration file
        // This allows the parser to work without a .babelrc or babel.config.js
        requireConfigFile: false,
        // Configure Babel with React preset
        // This enables all React-specific syntax transformations
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
