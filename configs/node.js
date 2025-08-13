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
      // Allow default values in JSDoc comments for Node.js modules
      // This is common in Node.js libraries to document default parameter values
      'jsdoc/no-defaults': 0,

      // Allow require() statements anywhere in the code
      // This is disabled to support dynamic imports and conditional requires in Node.js
      // Example: if (condition) { const module = require('./module'); }
      'n/global-require': 0,

      // Prevent usage of deprecated Node.js APIs
      // Set to error level to ensure code doesn't rely on APIs that may be removed
      'n/no-deprecated-api': 2,

      // Ensure all required modules can be resolved
      // Prevents typos in module paths and missing dependencies
      'n/no-missing-require': 2,

      // Prevent string concatenation with __dirname and __filename
      // Use path.join() or path.resolve() instead for cross-platform compatibility
      // Example: path.join(__dirname, 'file') instead of __dirname + '/file'
      'n/no-path-concat': 2,

      // Discourage use of process.exit() in Node.js applications
      // Set to warning level to allow it when necessary but encourage alternatives
      // Better to throw errors and handle them properly for most cases
      'n/no-process-exit': 1,

      // Allow bin scripts that aren't published to npm
      // This is useful for development scripts and local tooling
      'n/no-unpublished-bin': 0,

      // Prevent requiring modules that aren't listed as dependencies
      // Ensures all dependencies are properly declared in package.json
      'n/no-unpublished-require': 2,

      // Warn about ES syntax features not supported in the target Node.js version
      // Set to warning level with Node.js 20+ as the target version
      'n/no-unsupported-features/es-syntax': [
        1,
        {
          version: '>=20.0.0',
          ignores: []
        }
      ],

      // Allow custom shebang directives in Node.js scripts
      // This is useful for CLI tools and executable scripts
      'n/shebang': 0,

      // Allow console.log statements in Node.js applications
      // Console output is a standard practice in Node.js, unlike in browser code
      'no-console': 0
    },

    // -------------------------------------------------------------------------
    // Node.js plugin settings
    // -------------------------------------------------------------------------
    settings: {
      n: {
        // No additional modules are allowed beyond what's in package.json
        // This can be extended for specific projects if needed
        allowModules: []
      }
    },

    // -------------------------------------------------------------------------
    // Node.js environment configuration
    // -------------------------------------------------------------------------
    languageOptions: {
      // Add Node.js global variables and objects
      // This includes process, Buffer, __dirname, etc.
      globals: {
        ...globals.node
      }
    }
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const node = defineConfig(config);

export { node as default, node, config };
