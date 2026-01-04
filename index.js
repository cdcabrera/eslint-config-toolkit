/**
 * ESLint Config Toolkit
 * A collection of ESLint configurations for JavaScript projects
 */

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { base } from './configs/base.js';
import { node } from './configs/node.js';
import { react } from './configs/react.js';
import { json } from './configs/json.js';
import { jest } from './configs/jest.js';

/**
 * ESLint config object type alias.
 *
 * Resolves portability issues between different @eslint/core versions.
 *
 * @typedef {import("eslint").Linter.Config} Config
 */

/**
 * A toolkit object containing configuration utilities and helper functions
 * for ESLint. It includes pre-defined configurations for base projects,
 * `Node.js`, `React`, `JSON`, `Jest`, and `globals`.
 *
 * @module toolkit
 * @type {{ base: base, node: node, react: react, json: json, jest: jest, globals: globals, defineConfig: typeof defineConfig }}
 */
const toolkit = {
  base,
  node,
  react,
  json,
  jest,
  globals,
  defineConfig,
  ...base
};

export { toolkit as default, toolkit, base, node, react, json, jest, globals };
