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
import unicornPlugin from 'eslint-plugin-unicorn';

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
 *
 * @type {Config[]}
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
    plugins: {
      unicorn: unicornPlugin
    },
    rules: {
      // no-cond-assign: Set to except-parens to allow assignments in conditional expressions with parentheses
      // Example: while (someValue = getNextValue()) { ... }
      'no-cond-assign': [2, 'except-parens'],

      // arrow-body-style: Set to as-needed to avoid unnecessary braces
      // Example: x => x * 2 instead of x => { return x * 2; }
      'arrow-body-style': [2, 'as-needed'],

      // consistent-return: Set to warning level to encourage consistent return values
      'consistent-return': 1,

      // func-names: Set to as-needed to require names only when needed for recursion or debugging
      'func-names': [2, 'as-needed'],

      // no-bitwise: Set to warning level to flag potential operator confusion (& vs &&)
      'no-bitwise': 1,

      // no-debugger: Set to warning level to flag debugger statements in committed code
      'no-debugger': 1,

      // no-empty: Set to allow empty catch blocks
      'no-empty': [
        2,
        {
          allowEmptyCatch: true
        }
      ],

      // no-implicit-coercion: Set to error for all types of implicit coercion
      'no-implicit-coercion': [
        2,
        {
          boolean: true,
          number: true,
          string: true,
          allow: []
        }
      ],

      // no-param-reassign: Set to error with props:true but exceptions for common middleware/reducer parameters
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

      // no-plusplus: Set to warning; allow ++/-- only in for-loop afterthoughts
      // Example: for (let i = 0; i < n; i++) { /* i++ allowed here */ }
      'no-plusplus': [1, { allowForLoopAfterthoughts: true }],

      // no-unsafe-optional-chaining: Set to error with disallowArithmeticOperators
      'no-unsafe-optional-chaining': [
        2,
        {
          disallowArithmeticOperators: true
        }
      ],

      // no-unused-vars: Set to warning with ignoreRestSiblings to allow object destructuring patterns
      'no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none'
        }
      ],

      // no-var: Set to error to enforce let/const over var
      'no-var': 2,

      // padded-blocks: Disabled to allow flexibility in block padding
      'padded-blocks': 0,

      // prefer-promise-reject-errors: Set to warning with allowEmptyReject
      'prefer-promise-reject-errors': [
        1,
        {
          allowEmptyReject: true
        }
      ],

      // prefer-spread: Set to warning to encourage spread syntax over .apply()
      'prefer-spread': 1,

      // unicorn/prefer-logical-operator-over-ternary: Prefer logical operator for simple fallbacks; the rule may suggest || or ??
      // Example: val ? val : 'fallback' -> val || 'fallback'
      'unicorn/prefer-logical-operator-over-ternary': 2
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
      // @stylistic/array-bracket-newline: Set to consistent for uniform bracket placement
      '@stylistic/array-bracket-newline': [2, 'consistent'],

      // @stylistic/array-bracket-spacing: Set to never have spaces inside array brackets
      '@stylistic/array-bracket-spacing': [2, 'never'],

      // @stylistic/array-element-newline: Set to consistent for uniform element placement
      '@stylistic/array-element-newline': [2, 'consistent'],

      // -------------------------------------------------------------------------
      // Spacing rules
      // -------------------------------------------------------------------------
      // @stylistic/arrow-parens: Set to as-needed to avoid unnecessary parentheses
      '@stylistic/arrow-parens': [2, 'as-needed'],

      // @stylistic/arrow-spacing: Set to require spaces before and after arrow
      '@stylistic/arrow-spacing': [2, { before: true, after: true }],

      // @stylistic/block-spacing: Set to always require spaces inside blocks
      '@stylistic/block-spacing': [2, 'always'],

      // @stylistic/comma-spacing: Set to require space after comma but not before
      '@stylistic/comma-spacing': [2, { before: false, after: true }],

      // @stylistic/computed-property-spacing: Set to never have spaces inside brackets
      '@stylistic/computed-property-spacing': [2, 'never'],

      // @stylistic/dot-location: Set to property to keep dot with property
      '@stylistic/dot-location': [2, 'property'],

      // @stylistic/function-call-spacing: Set to never have spaces between function name and parentheses
      '@stylistic/function-call-spacing': [2, 'never'],

      // @stylistic/generator-star-spacing: Set to have star after function keyword
      '@stylistic/generator-star-spacing': [2, { before: false, after: true }],

      // @stylistic/key-spacing: Set to require space after colon but not before
      '@stylistic/key-spacing': [2, { beforeColon: false, afterColon: true }],

      // @stylistic/keyword-spacing: Set to require spaces before and after keywords
      '@stylistic/keyword-spacing': [2, { before: true, after: true }],

      // @stylistic/no-multi-spaces: Set to error to prevent multiple spaces
      '@stylistic/no-multi-spaces': 2,

      // @stylistic/no-whitespace-before-property: Set to error to prevent spaces before properties
      '@stylistic/no-whitespace-before-property': 2,

      // @stylistic/object-curly-spacing: Set to always require spaces inside object braces
      '@stylistic/object-curly-spacing': [2, 'always'],

      // @stylistic/rest-spread-spacing: Set to never have spaces in rest/spread operators
      '@stylistic/rest-spread-spacing': [2, 'never'],

      // @stylistic/space-before-blocks: Set to always require space before blocks
      '@stylistic/space-before-blocks': [2, 'always'],

      // @stylistic/space-before-function-paren: Set to require space for anonymous and async arrow functions
      '@stylistic/space-before-function-paren': [2, { anonymous: 'always', named: 'never', asyncArrow: 'always' }],

      // @stylistic/space-in-parens: Set to never have spaces inside parentheses
      '@stylistic/space-in-parens': [2, 'never'],

      // @stylistic/space-infix-ops: Set to error to require spaces around operators
      '@stylistic/space-infix-ops': 2,

      // @stylistic/space-unary-ops: Set to require space after words but not symbols
      '@stylistic/space-unary-ops': [2, { words: true, nonwords: false }],

      // @stylistic/spaced-comment: Set to always require space after comment markers
      '@stylistic/spaced-comment': [2, 'always', { exceptions: ['-', '+', '*'] }],

      // @stylistic/switch-colon-spacing: Set to require space after colon but not before
      '@stylistic/switch-colon-spacing': [2, { after: true, before: false }],

      // @stylistic/template-curly-spacing: Set to never have spaces inside template expressions
      '@stylistic/template-curly-spacing': [2, 'never'],

      // @stylistic/template-tag-spacing: Set to never have spaces between template tags and literals
      '@stylistic/template-tag-spacing': [2, 'never'],

      // @stylistic/yield-star-spacing: Set to have star after yield keyword
      '@stylistic/yield-star-spacing': [2, { before: false, after: true }],

      // -------------------------------------------------------------------------
      // Line breaking rules
      // -------------------------------------------------------------------------
      // @stylistic/brace-style: Set to 1tbs with allowSingleLine for consistent brace placement
      '@stylistic/brace-style': [2, '1tbs', { allowSingleLine: true }],

      // @stylistic/comma-style: Set to last to place commas after elements
      '@stylistic/comma-style': [2, 'last'],

      // @stylistic/eol-last: Set to always require newline at end of file
      '@stylistic/eol-last': [2, 'always'],

      // @stylistic/function-call-argument-newline: Set to consistent for uniform argument placement
      '@stylistic/function-call-argument-newline': [2, 'consistent'],

      // @stylistic/function-paren-newline: Set to consistent for uniform parentheses placement
      '@stylistic/function-paren-newline': [2, 'consistent'],

      // @stylistic/implicit-arrow-linebreak: Disabled to allow breaking arrow functions across lines
      // Example: const foo = (bar) =>
      //   bar + 1;
      '@stylistic/implicit-arrow-linebreak': 0,

      // @stylistic/indent: Set to 2 spaces with specific indentation levels for different constructs
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

      // @stylistic/linebreak-style: Set to unix for consistent line endings
      '@stylistic/linebreak-style': [2, 'unix'],

      // @stylistic/lines-around-comment: Set to require space before block comments with allowBlockStart
      '@stylistic/lines-around-comment': [2, {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: false,
        afterLineComment: false,
        allowBlockStart: true
      }],

      // @stylistic/lines-between-class-members: Set to always with exception for single-line members
      '@stylistic/lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],

      // @stylistic/max-len: Set to 180 chars with exceptions for strings, templates, and URLs
      '@stylistic/max-len': [2, { code: 180, comments: 180, ignoreComments: false, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreUrls: true }],

      // @stylistic/newline-per-chained-call: Set with ignoreChainWithDepth:4 to allow moderate chaining
      '@stylistic/newline-per-chained-call': [2, { ignoreChainWithDepth: 4 }],

      // @stylistic/no-multiple-empty-lines: Set to max 1 empty line with specific EOF/BOF limits
      '@stylistic/no-multiple-empty-lines': [2, { max: 1, maxEOF: 1, maxBOF: 0 }],

      // @stylistic/no-trailing-spaces: Set to error to prevent trailing whitespace
      '@stylistic/no-trailing-spaces': 2,

      // @stylistic/nonblock-statement-body-position: Set to beside to keep single-line statements
      '@stylistic/nonblock-statement-body-position': [2, 'beside'],

      // @stylistic/object-curly-newline: Set to multiline and consistent for uniform brace placement
      '@stylistic/object-curly-newline': [2, { multiline: true, consistent: true }],

      // @stylistic/object-property-newline: Set to allow all properties on same line when possible
      '@stylistic/object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],

      // @stylistic/operator-linebreak: Set to after with overrides for ternary operators
      '@stylistic/operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],

      // @stylistic/padded-blocks: Set to never allow padding inside blocks
      '@stylistic/padded-blocks': [2, 'never'],

      // @stylistic/padding-line-between-statements: Set specific blank line requirements
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
      // @stylistic/comma-dangle: Set to never allow trailing commas
      '@stylistic/comma-dangle': [2, 'never'],

      // @stylistic/no-extra-parens: Warn with exceptions; use ignoredNodes selectors for arrow conditionals and spread elements
      '@stylistic/no-extra-parens': [1, 'all', {
        conditionalAssign: false,
        nestedBinaryExpressions: false,
        ignoreJSX: 'all',
        ignoredNodes: [
          'ArrowFunctionExpression[body.type="ConditionalExpression"]',
          'ArrowFunctionExpression[body.type="LogicalExpression"]',
          'SpreadElement[argument.type="ConditionalExpression"]',
          'SpreadElement[argument.type="LogicalExpression"]',
          'SpreadElement[argument.type="AwaitExpression"]'
        ]
      }],

      // @stylistic/no-extra-semi: Set to error to prevent unnecessary semicolons
      '@stylistic/no-extra-semi': 2,

      // @stylistic/no-floating-decimal: Set to error to require leading zero in decimal numbers
      '@stylistic/no-floating-decimal': 2,

      // @stylistic/quote-props: Set to as-needed to avoid quoting properties unnecessarily
      '@stylistic/quote-props': [2, 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

      // @stylistic/quotes: Set to single quotes with avoidEscape and allowTemplateLiterals
      // Example: `I'm using a template literal because it contains both 'single' and "double" quotes`
      '@stylistic/quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],

      // @stylistic/semi: Set to always require semicolons
      '@stylistic/semi': [2, 'always'],

      // @stylistic/semi-spacing: Set to require space after semicolon but not before
      '@stylistic/semi-spacing': [2, { before: false, after: true }],

      // @stylistic/semi-style: Set to last to place semicolons at the end of statements
      '@stylistic/semi-style': [2, 'last'],

      // @stylistic/wrap-iife: Set to outside to place parentheses around the function expression
      '@stylistic/wrap-iife': [2, 'outside', { functionPrototypeMethods: false }],

      // @stylistic/wrap-regex: Disabled to allow flexibility in regex formatting
      '@stylistic/wrap-regex': 0,

      // -------------------------------------------------------------------------
      // Indentation and formatting rules
      // -------------------------------------------------------------------------
      // @stylistic/indent-binary-ops: Set to 2 spaces for binary operator indentation
      '@stylistic/indent-binary-ops': [2, 2],

      // @stylistic/max-statements-per-line: Set to max 1 statement per line
      '@stylistic/max-statements-per-line': [2, { max: 1 }],

      // @stylistic/multiline-comment-style: Disabled to allow flexibility in comment formatting
      '@stylistic/multiline-comment-style': [0, 'starred-block'],

      // @stylistic/multiline-ternary: Set to always-multiline for consistent ternary formatting
      '@stylistic/multiline-ternary': [2, 'always-multiline'],

      // @stylistic/new-parens: Set to error to require parentheses in constructor calls
      '@stylistic/new-parens': 2,

      // @stylistic/no-confusing-arrow: Set to allow parentheses to disambiguate arrow functions
      '@stylistic/no-confusing-arrow': [2, { allowParens: true }],

      // @stylistic/no-mixed-operators: Set to prevent mixing && and || operators without parentheses
      '@stylistic/no-mixed-operators': [2, { groups: [['&&', '||']] }],

      // @stylistic/no-mixed-spaces-and-tabs: Set to error to prevent mixing spaces and tabs
      '@stylistic/no-mixed-spaces-and-tabs': 2,

      // @stylistic/no-tabs: Set to error to prevent using tabs for indentation
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
      // import/default: Set to error to ensure default exports exist when imported
      'import/default': 2,

      // import/export: Set to error to ensure named exports are defined in the module
      'import/export': 2,

      // import/named: Set to error to ensure named imports match named exports
      'import/named': 2,

      // import/no-cycle: Set to warning with maxDepth:5 to prevent circular dependencies
      // Example: file1.js imports file2.js, which imports file1.js
      'import/no-cycle': [
        1,
        {
          maxDepth: 5,
          ignoreExternal: true,
          disableScc: true
        }
      ],

      // import/no-dynamic-require: Set to warning to discourage dynamic require() calls
      // Example: require('./modules/' + moduleName)
      'import/no-dynamic-require': 1,

      // import/no-unresolved: Set to error to ensure imports point to resolvable modules
      'import/no-unresolved': 2,

      // import/order: Set to error with specific group ordering for consistent imports
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
      // comment-length/limit-multi-line-comments: Set to warning with maxLength:180 and logicalWrap
      'comment-length/limit-multi-line-comments': [
        1,
        {
          maxLength: 180,
          logicalWrap: true
        }
      ],

      // comment-length/limit-single-line-comments: Set to warning with maxLength:180 and logicalWrap
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
      // jsdoc/no-undefined-types: Disabled to allow referencing types defined elsewhere
      'jsdoc/no-undefined-types': 0,

      // jsdoc/require-jsdoc: Set to error for public classes, functions, and methods
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

      // jsdoc/require-param: Set to error to ensure all parameters are documented
      'jsdoc/require-param': 2,

      // jsdoc/require-param-description: Disabled to allow flexibility with self-explanatory parameters
      'jsdoc/require-param-description': 0,

      // jsdoc/require-param-name: Set to error to ensure parameter names match actual parameters
      'jsdoc/require-param-name': 2,

      // jsdoc/require-param-type: Set to error to ensure all parameters have type information
      'jsdoc/require-param-type': 2,

      // jsdoc/require-returns: Set to error to ensure return values are documented
      'jsdoc/require-returns': 2,

      // jsdoc/require-returns-description: Disabled to allow flexibility with self-explanatory returns
      'jsdoc/require-returns-description': 0,

      // jsdoc/require-returns-type: Set to error to ensure all return values have type information
      'jsdoc/require-returns-type': 2,

      // jsdoc/tag-lines: Set to warning with specific formatting for consistent JSDoc blocks
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

/** @type {Config[]} - Processed config. */
const base = defineConfig(config);

export { base as default, base, config };
