import path from 'path';
import { fileURLToPath } from 'url';
import { ESLint } from 'eslint';

/**
 * Test files to check.
 *
 * Use snapshots to verify that the ESLint configurations
 * correctly identify expected issues.
 *
 * @type {string[]}
 */
const testFiles = ['base.invalid.js', 'jest.invalid.js', 'json.invalid.json', 'node.invalid.js', 'react.invalid.jsx'];

/**
 * Directory name of the current module.
 *
 * @type {string}
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Run ESLint on a file and return the results
 *
 * @param {string} fileName - File to lint
 * @returns {Promise<Object>} - ESLint results
 */
const lintFile = async fileName => {
  const filePath = path.join(__dirname, '__fixtures__', fileName);
  const eslint = new ESLint({
    overrideConfigFile: path.join(__dirname, 'eslint.config.js')
  });

  const results = await eslint.lintFiles([filePath]);
  return results[0] || {};
};

/**
 * Count errors and warnings in ESLint results
 *
 * @param {Array} messages - ESLint messages array
 * @returns {Object} - Object containing error and warning counts
 */
const countIssues = messages => {
  const errors = messages.filter(msg => msg.severity === 2);
  const warnings = messages.filter(msg => msg.severity === 1);

  return {
    errors,
    warnings,
    errorCount: errors.length,
    warningCount: warnings.length,
    totalIssues: errors.length + warnings.length
  };
};

/**
 * Process ESLint results into a structured format for snapshot testing
 *
 * @param {string} fileName - File to lint
 * @returns {Promise<Object>} - Processed ESLint results
 */
const lintAndProcessFile = async fileName => {
  const result = await lintFile(fileName);
  const { errorCount, warningCount, totalIssues } = countIssues(result.messages);
  const projectRoot = path.resolve(__dirname, '..');

  return {
    filePath: path.basename(result.filePath),
    errorCount,
    warningCount,
    totalIssues,
    messages: result.messages.map(msg => ({
      ruleId: msg.ruleId,
      severity: msg.severity === 2 ? 'error' : 'warning',
      message: msg.message?.replace(projectRoot, '<PROJECT_ROOT>'),
      line: msg.line,
      column: msg.column
    }))
  };
};

describe('ESLint Configurations', () => {
  it.each(testFiles)('%s should have the expected linting issues', async fileName => {
    const result = await lintAndProcessFile(fileName);
    expect(result).toMatchSnapshot();
  });
});
