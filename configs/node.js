/**
 * Node.js ESLint configuration
 *
 * @module configs/node
 */

import { defineConfig } from 'eslint/config';
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
import { base as baseConfig } from './base.js';

/**
 * Configuration for linting Node.js.
 */
const config = [
  {
    extends: [baseConfig],
    plugins: {
      n: nodePlugin
    },
    rules: {
      'jsdoc/no-defaults': 0,
      'n/global-require': 0,
      'n/no-deprecated-api': 2,
      'n/no-missing-require': 2,
      'n/no-path-concat': 2,
      'n/no-process-exit': 1,
      'n/no-unpublished-bin': 0,
      'n/no-unpublished-require': 2,
      'n/no-unsupported-features/es-syntax': [
        1,
        {
          version: '>=20.0.0',
          ignores: []
        }
      ],
      'n/shebang': 0,
      'no-console': 0
    },
    settings: {
      n: {
        allowModules: []
      }
    },
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
const node = defineConfig(config);

export { node as default, node, config };
