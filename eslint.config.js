/**
 * ESLint configuration for the ESLint Config Toolkit project
 *
 * This configuration uses the toolkit's own Node.js configuration to lint
 * the project's source code, demonstrating how to use the toolkit in a real project.
 */

import nodeConfig from './configs/node.js';
import jestConfig from './configs/jest.js';

export default [
  // Use the Node.js configuration directly to avoid circular dependencies
  ...nodeConfig,
  ...jestConfig,
  // Project-specific overrides
  {
    rules: {
      // Disable rules that cause circular dependencies
      'import/no-unresolved': 0,

      // Disable some rules for development convenience
      'prettier/prettier': 1
    }
  }
];
