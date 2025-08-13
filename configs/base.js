/**
 * Base ESLint configuration for JavaScript projects
 *
 * Provides core linting rules for JavaScript code that can be extended by other configurations.
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
  // -------------------------------------------------------------------------
  // Variable rules
  // -------------------------------------------------------------------------
  {
    rules: {
      // Allow assignments in conditional expressions if they're in parentheses
      // This is a common pattern for iteration, especially in while loops
      // Example: while (someValue = getNextValue()) { ... }
      'no-cond-assign': [2, 'except-parens'],

      // arrow-body-style: Enforces consistent use of braces in arrow function bodies
      // Set to 'as-needed' to avoid unnecessary braces, making code more concise
      // Example: x => x * 2 instead of x => { return x * 2; }
      'arrow-body-style': [2, 'as-needed'],

      // consistent-return: Requires returning statements to either always or never specify values
      // Set to warning level to encourage consistent returns without breaking existing code
      // This helps prevent subtle bugs where functions sometimes return values and sometimes don't
      'consistent-return': 1,

      // func-names: Requires or disallows named function expressions
      // Set to 'as-needed' to require names only when they're needed for recursion or debugging
      // This improves stack traces while allowing anonymous functions when appropriate
      'func-names': [2, 'as-needed'],

      // no-bitwise: Disallows bitwise operators
      // Set to warning level to discourage use of bitwise operators which are often typos
      // Bitwise operations are rarely needed and can be confused with logical operators (& vs &&)
      'no-bitwise': 1,

      // no-debugger: Disallows debugger statements
      // Set to warning level to discourage debugger statements in committed code
      // This prevents accidental commits of debugging code while allowing during development
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
  // -------------------------------------------------------------------------
  // Stylistic rules
  // -------------------------------------------------------------------------
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
      // Spacing rules
      // -------------------------------------------------------------------------
      '@stylistic/arrow-parens': [2, 'as-needed'],
      '@stylistic/arrow-spacing': [2, { before: true, after: true }],
      '@stylistic/block-spacing': [2, 'always'],
      '@stylistic/comma-spacing': [2, { before: false, after: true }],
      '@stylistic/computed-property-spacing': [2, 'never'],
      '@stylistic/dot-location': [2, 'property'],
      '@stylistic/function-call-spacing': [2, 'never'],
      '@stylistic/generator-star-spacing': [2, { before: false, after: true }],
      '@stylistic/key-spacing': [2, { beforeColon: false, afterColon: true }],
      '@stylistic/keyword-spacing': [2, { before: true, after: true }],
      '@stylistic/no-multi-spaces': 2,
      '@stylistic/no-whitespace-before-property': 2,
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/rest-spread-spacing': [2, 'never'],
      '@stylistic/space-before-blocks': [2, 'always'],
      '@stylistic/space-before-function-paren': [2, { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@stylistic/space-in-parens': [2, 'never'],
      '@stylistic/space-infix-ops': 2,
      '@stylistic/space-unary-ops': [2, { words: true, nonwords: false }],
      '@stylistic/spaced-comment': [2, 'always', { exceptions: ['-', '+', '*'] }],
      '@stylistic/switch-colon-spacing': [2, { after: true, before: false }],
      '@stylistic/template-curly-spacing': [2, 'never'],
      '@stylistic/template-tag-spacing': [2, 'never'],
      '@stylistic/yield-star-spacing': [2, { before: false, after: true }],

      // -------------------------------------------------------------------------
      // Line breaking rules
      // -------------------------------------------------------------------------
      '@stylistic/brace-style': [2, '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-style': [2, 'last'],
      '@stylistic/eol-last': [2, 'always'],
      '@stylistic/function-call-argument-newline': [2, 'consistent'],
      '@stylistic/function-paren-newline': [2, 'consistent'],

      // Changed from error to warning to allow line breaks when hitting max line length
      // '@stylistic/implicit-arrow-linebreak': [1, 'beside'],
      '@stylistic/implicit-arrow-linebreak': 0,

      // Expanded indent configuration to provide consistent indentation across different code constructs
      // This ensures proper alignment for arrays, function calls, function declarations, imports, and objects
      // Examples:
      // - Array elements are indented 1 level: [
      //     'item1',
      //     'item2'
      //   ]
      // - Function parameters are indented 1 level: function example(
      //     param1,
      //     param2
      //   ) { ... }
      // - Import statements are indented 1 level: import {
      //     Component1,
      //     Component2
      //   } from 'package';
      '@stylistic/indent': [2, 2, {
        ArrayExpression: 1,
        CallExpression: {
          arguments: 1
        },
        flatTernaryExpressions: false,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        ignoreComments: false,
        ImportDeclaration: 1,
        ObjectExpression: 1,
        outerIIFEBody: 1,
        SwitchCase: 1,
        VariableDeclarator: 1
      }],
      '@stylistic/linebreak-style': [2, 'unix'],

      // Allow comments at the beginning of blocks (like JSDoc in classes) without requiring a blank line
      // This prevents conflicts with the padded-blocks rule which disallows blank lines at the start of blocks
      '@stylistic/lines-around-comment': [2, {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: false,
        afterLineComment: false,
        allowBlockStart: true
      }],
      '@stylistic/lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
      '@stylistic/max-len': [2, { code: 180, comments: 180, ignoreComments: false, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreUrls: true }],

      // Increased ignoreChainWithDepth from 3 to 4 to allow more method chaining on a single line
      // This reduces unnecessary line breaks for common chaining patterns while still enforcing
      // readability for longer chains
      // Example allowed: object.method1().method2().method3().method4()
      // Example requiring line breaks: object.method1().method2().method3().method4().method5()
      '@stylistic/newline-per-chained-call': [2, { ignoreChainWithDepth: 4 }],
      '@stylistic/no-multiple-empty-lines': [2, { max: 1, maxEOF: 1, maxBOF: 0 }],
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/nonblock-statement-body-position': [2, 'beside'],
      '@stylistic/object-curly-newline': [2, { multiline: true, consistent: true }],
      '@stylistic/object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],
      '@stylistic/operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/padded-blocks': [2, 'never'],
      '@stylistic/padding-line-between-statements': [
        2,
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: '*', next: 'function' }
      ],

      // -------------------------------------------------------------------------
      // Punctuation rules
      // -------------------------------------------------------------------------
      '@stylistic/comma-dangle': [2, 'never'],

      // Set to warning level and configure to avoid conflict with no-confusing-arrow
      // The conflict occurs when an arrow function could be confused with a comparison operator:
      // - @stylistic/no-confusing-arrow with allowParens: true allows parentheses to avoid confusion
      // - @stylistic/no-extra-parens would normally consider these parentheses unnecessary
      '@stylistic/no-extra-parens': [1, 'all', {
        allowNodesInSpreadElement: {
          ConditionalExpression: true,
          LogicalExpression: true, // Allow parentheses around logical expressions in spread elements
          AwaitExpression: true // Allow parentheses around await expressions in spread elements
        },
        conditionalAssign: false,
        nestedBinaryExpressions: false,
        ignoreJSX: 'all',
        // Allow parentheses around conditionals in arrow functions
        enforceForArrowConditionals: false
      }],
      '@stylistic/no-extra-semi': 2,
      '@stylistic/no-floating-decimal': 2,
      '@stylistic/quote-props': [2, 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
      '@stylistic/quotes': [2, 'single', { avoidEscape: true }],
      '@stylistic/semi': [2, 'always'],
      '@stylistic/semi-spacing': [2, { before: false, after: true }],
      '@stylistic/semi-style': [2, 'last'],
      '@stylistic/wrap-iife': [2, 'outside', { functionPrototypeMethods: false }],
      '@stylistic/wrap-regex': 0,

      // -------------------------------------------------------------------------
      // Indentation and formatting rules
      // -------------------------------------------------------------------------
      '@stylistic/indent-binary-ops': [2, 2],
      '@stylistic/max-statements-per-line': [2, { max: 1 }],
      '@stylistic/multiline-comment-style': [0, 'starred-block'],
      '@stylistic/multiline-ternary': [2, 'always-multiline'],
      '@stylistic/new-parens': 2,
      '@stylistic/no-confusing-arrow': [2, { allowParens: true }],
      '@stylistic/no-mixed-operators': [2, { groups: [['&&', '||']] }],
      '@stylistic/no-mixed-spaces-and-tabs': 2,
      '@stylistic/no-tabs': 2
    }
  },
  // -------------------------------------------------------------------------
  // Import plugin rules
  // -------------------------------------------------------------------------
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      // import/default: Ensures a default export is present when importing a default export
      // Set to error level to prevent runtime errors from missing default exports
      'import/default': 2,

      // import/export: Validates all named exports are defined in the exported module
      // Set to error level to prevent runtime errors from importing non-existent exports
      'import/export': 2,

      // import/named: Ensures named imports correspond to named exports in the imported module
      // Set to error level to prevent runtime errors from importing non-existent named exports
      'import/named': 2,

      // import/no-cycle: Prevents circular dependencies between modules
      // Set to warning level with a max depth of 5 to catch problematic cycles without being too strict
      // Circular dependencies can cause unexpected behavior and make code harder to understand
      // Example: file1.js imports file2.js, which imports file1.js
      'import/no-cycle': [
        1,
        {
          maxDepth: 5,
          ignoreExternal: true,
          disableScc: true
        }
      ],

      // import/no-dynamic-require: Prevents using expressions in require() calls
      // Set to warning level to discourage dynamic requires while allowing them when necessary
      // Dynamic requires make static analysis impossible and can hide dependencies
      // Example: require('./modules/' + moduleName) should be avoided
      'import/no-dynamic-require': 1,

      // import/no-unresolved: Ensures imports point to a file/module that can be resolved
      // Set to error level to prevent runtime errors from importing non-existent modules
      // This catches typos in import paths and missing dependencies
      'import/no-unresolved': 2,

      // import/order: Enforces a consistent order for import statements
      // Set to error level with specific group ordering to ensure consistent import organization
      // This makes code more readable by grouping similar imports together
      // Example order: node built-ins, external packages, internal modules, parent/sibling/index imports
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
  // -------------------------------------------------------------------------
  // Comment length rules
  // -------------------------------------------------------------------------
  {
    plugins: {
      'comment-length': commentLength
    },
    rules: {

      // comment-length/limit-multi-line-comments: Enforces maximum length for multi-line comments
      // Set to warning level with a max length of 180 characters and logical wrapping enabled
      // This ensures comments are readable while allowing flexibility for longer explanations
      // The logicalWrap option prevents warnings when comments are properly wrapped
      'comment-length/limit-multi-line-comments': [
        1,
        {
          maxLength: 180,
          logicalWrap: true
        }
      ],

      // comment-length/limit-single-line-comments: Enforces maximum length for single-line comments
      // Set to warning level with a max length of 180 characters and logical wrapping enabled
      // This ensures comments are readable while allowing flexibility for longer explanations
      // The logicalWrap option allows logical breaks like lists and code examples without warnings
      'comment-length/limit-single-line-comments': [
        1,
        {
          maxLength: 180,
          logicalWrap: true
        }
      ]
    }
  },
  // -------------------------------------------------------------------------
  // JSDoc rules
  // -------------------------------------------------------------------------
  {
    plugins: {
      jsdoc
    },
    rules: {

      // jsdoc/no-undefined-types: Reports invalid types in JSDoc comments
      // Disabled to allow referencing types that might be defined elsewhere or in TypeScript
      // This prevents false positives when using custom types or types from external libraries
      'jsdoc/no-undefined-types': 0,

      // jsdoc/require-jsdoc: Requires JSDoc comments for specified nodes
      // Set to error level for public classes, functions, and methods to ensure API documentation
      // This enforces documentation for public interfaces while not requiring it for private code
      // Example: All exported functions must have JSDoc, but internal helpers don't need it
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

      // jsdoc/require-param: Requires that all function parameters are documented
      // Set to error level to ensure all parameters are documented for better code understanding
      'jsdoc/require-param': 2,

      // jsdoc/require-param-description: Requires a description for each parameter
      // Disabled to allow flexibility in documentation style while still requiring the parameters themselves
      // This allows for self-explanatory parameter names without redundant descriptions
      'jsdoc/require-param-description': 0,

      // jsdoc/require-param-name: Requires that all parameter names in JSDoc match actual parameters
      // Set to error level to prevent documentation for non-existent parameters
      'jsdoc/require-param-name': 2,

      // jsdoc/require-param-type: Requires that each parameter has a type
      // Set to error level to ensure type information is available for all parameters
      // This improves code understanding and enables better tooling support
      'jsdoc/require-param-type': 2,

      // jsdoc/require-returns: Requires return tag if the function returns a value
      // Set to error level to ensure return values are documented for better code understanding
      // This helps developers understand what to expect from function calls
      'jsdoc/require-returns': 2,

      // jsdoc/require-returns-description: Requires a description for the return tag
      // Disabled to allow flexibility in documentation style while still requiring the return type
      // This allows for self-explanatory return values without redundant descriptions
      'jsdoc/require-returns-description': 0,

      // jsdoc/require-returns-type: Requires a type for the return tag
      // Set to error level to ensure type information is available for all return values
      // This improves code understanding and enables better tooling support
      'jsdoc/require-returns-type': 2,

      // jsdoc/tag-lines: Controls line spacing between JSDoc tags
      // Set to warning level with specific formatting options for consistent documentation style
      // This ensures consistent spacing in JSDoc blocks while allowing flexibility
      // The configuration requires a line before tags but no empty lines between tags
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

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const base = defineConfig(config);

export { base as default, base, config };
