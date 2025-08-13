/**
 * ESLint configuration for testing our configurations
 */

import { defineConfig } from 'eslint/config';
import baseConfig from '../configs/base.js';
import nodeConfig from '../configs/node.js';
import reactConfig from '../configs/react.js';
import jsonConfig from '../configs/json.js';
import jestConfig from '../configs/jest.js';

export default defineConfig([
  // Base configuration for all test fixtures
  // Disables universally irrelevant rules to reduce noise in test snapshots
  {
    files: ['**/__fixtures__/*.js', '**/__fixtures__/*.jsx', '**/__fixtures__/*.json'],
    rules: {
      // Disable 'module is not defined' errors which appear in every fixture due to module.exports
      'no-undef': 0
    }
  },

  // Base configuration for invalid.base.js
  {
    files: ['**/__fixtures__/invalid.base.js'],
    extends: [baseConfig]
  },

  // Node.js configuration for invalid.node.js
  {
    files: ['**/__fixtures__/invalid.node.js'],
    extends: [nodeConfig]
  },

  // React configuration for invalid.react.jsx
  {
    files: ['**/__fixtures__/invalid.react.jsx'],
    extends: [reactConfig]
  },

  // JSON configuration for invalid.json.json
  {
    files: ['**/__fixtures__/invalid.json.json'],
    extends: [jsonConfig]
  },

  // Jest configuration for invalid.jest.js
  {
    files: ['**/__fixtures__/invalid.jest.js'],
    extends: [jestConfig]
  },

  // Rule conflicts test configurations
  {
    files: ['**/__fixtures__/conflicts.rule-conflict.js'],
    extends: [baseConfig]
  },
  {
    files: ['**/__fixtures__/conflicts.arrow-parens.js'],
    extends: [baseConfig]
  },
  {
    files: ['**/__fixtures__/conflicts.cond-assign-parens.js'],
    extends: [baseConfig]
  },

  // Rule customizations test configurations
  {
    files: ['**/__fixtures__/custom.*.js'],
    extends: [baseConfig]
  }
]);
