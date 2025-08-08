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
  // Base configuration for base.invalid.js
  {
    files: ['**/__fixtures__/base.invalid.js'],
    extends: [baseConfig]
  },

  // Node.js configuration for node.invalid.js
  {
    files: ['**/__fixtures__/node.invalid.js'],
    extends: [nodeConfig]
  },

  // React configuration for react.invalid.jsx
  {
    files: ['**/__fixtures__/react.invalid.jsx'],
    extends: [reactConfig]
  },

  // JSON configuration for json.invalid.json
  {
    files: ['**/__fixtures__/json.invalid.json'],
    extends: [jsonConfig]
  },

  // Jest configuration for jest.invalid.js
  {
    files: ['**/__fixtures__/jest.invalid.js'],
    extends: [jestConfig]
  }
]);
