// FIXTURE: This file contains intentional linting issues to test the TypeScript configuration
import { type BaseConfig } from '../..'; // Should trigger @typescript-eslint/consistent-type-imports if not using 'import type' or inline

// Should trigger @typescript-eslint/no-explicit-any (warning)
const data: any = {
  foo: 'bar'
};

// Should trigger @typescript-eslint/no-unused-vars (error)
const unusedVar = 'I am not used';


// Should NOT trigger no-undef or no-unused-vars (JS versions)
// as they should be disabled for TS files.

/**
 * @returns {string} - Should trigger jsdoc/require-returns-type if not disabled, 
 * but it is disabled in configs/typescript.js
 */
function testJsDoc(param) {
  return param;
}

export { data, testJsDoc };
