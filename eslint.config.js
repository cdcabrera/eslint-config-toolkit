/**
 * ESLint configuration for the ESLint Config Toolkit project
 *
 * This config uses the toolkit's own Node.js configuration to lint
 * the project's source code, demonstrating how to use the toolkit.
 */

import nodeConfig from './configs/node.js';
import jestConfig from './configs/jest.js';

export default [
  ...nodeConfig,
  ...jestConfig,
  {
    rules: {
      'import/no-unresolved': 0
    }
  }
];
