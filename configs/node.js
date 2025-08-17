/**
 * Node.js ESLint configuration
 *
 * Provides linting rules for Node.js applications and modules.
 *
 * @module configs/node
 */

import { defineConfig } from 'eslint/config';
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
import { base as baseConfig } from './base.js';

/**
 * Configuration for linting Node.js.
 *
 * Key features:
 * - **Node.js best practices**: Enforces Node.js-specific coding standards and prevents common errors
 * - **API compatibility**: Warns about deprecated APIs and ensures compatibility with the target Node.js version
 * - **Module resolution**: Validates require() statements and prevents missing dependencies
 * - **CLI tool support**: Includes special configurations for command-line tools and scripts
 */
const config = [
  {
    extends: [baseConfig],

    // -------------------------------------------------------------------------
    // Node.js plugin configuration
    // -------------------------------------------------------------------------
    plugins: {
      n: nodePlugin
    },

    // -------------------------------------------------------------------------
    // Node.js specific rules
    // -------------------------------------------------------------------------
    rules: {
      // jsdoc/no-defaults: Disabled to allow default values in JSDoc comments
      'jsdoc/no-defaults': 0,

      // n/global-require: Disabled to allow dynamic and conditional requires
      // Example: if (condition) { const module = require('./module'); }
      'n/global-require': 0,

      // n/no-deprecated-api: Set to error to prevent usage of deprecated Node.js APIs
      'n/no-deprecated-api': 2,

      // n/no-missing-require: Set to error to ensure required modules can be resolved
      'n/no-missing-require': 2,

      // n/no-path-concat: Set to error to enforce path.join() instead of string concatenation
      // Example: path.join(__dirname, 'file') instead of __dirname + '/file'
      'n/no-path-concat': 2,

      // n/no-process-exit: Set to warning to discourage direct process.exit() calls
      'n/no-process-exit': 1,

      // n/no-unpublished-bin: Disabled to allow unpublished bin scripts
      'n/no-unpublished-bin': 0,

      // n/no-unpublished-require: Set to error to ensure dependencies are declared
      'n/no-unpublished-require': 2,

      // n/no-unsupported-features/es-syntax: Set to warning with Node.js 20+ as target
      'n/no-unsupported-features/es-syntax': [
        1,
        {
          version: '>=20.0.0',
          ignores: []
        }
      ],

      // n/shebang: Disabled to allow custom shebang directives
      'n/shebang': 0,

      // no-console: Disabled to allow console.log in Node.js applications
      'no-console': 0
    },

    // -------------------------------------------------------------------------
    // Node.js plugin settings
    // -------------------------------------------------------------------------
    settings: {
      n: {
        // Set to empty array for no additional allowed modules beyond package.json
        allowModules: []
      }
    },

    // -------------------------------------------------------------------------
    // Node.js environment configuration
    // -------------------------------------------------------------------------
    languageOptions: {
      // Set to include Node.js globals (process, Buffer, __dirname, etc.)
      globals: {
        ...globals.node
      }
    }
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const node = defineConfig(config);

export { node as default, node, config };
