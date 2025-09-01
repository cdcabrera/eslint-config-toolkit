import path from 'path';
import { fileURLToPath } from 'url';
import { ESLint } from 'eslint';

/**
 * Rule Filtering Policy
 *
 * The following rules may be filtered from test snapshots:
 *
 * 1. Universal noise:
 *    - no-undef: Already disabled in ESLint config for 'module is not defined' errors
 *
 * 2. Documentation rules:
 *    - jsdoc/*: Only when not specifically testing JSDoc functionality
 *
 * 3. Style rules:
 *    - Only when they conflict with the specific rule being tested
 *    - Must be explicitly justified in test case
 *
 * All filtered rules are tracked and reported in snapshots for transparency.
 */

/**
 * Centralized definition of filterable rules.
 *
 * This is used to define and store rules that can be filtered for various test operations.
 *
 * @namespace FILTERABLE_RULES
 * @global
 * @type {{universal: string[], documentation: string[], style: string[], common: string[], all: (function(): string[])}}
 */
global.FILTERABLE_RULES = {
  // Rules that are universally noisy and safe to filter
  universal: ['no-undef'], // Already disabled in ESLint config, listed for tracking

  // Documentation-related rules that may add noise
  documentation: [
    'jsdoc/require-jsdoc',
    'jsdoc/tag-lines',
    'jsdoc/require-param',
    'jsdoc/require-returns'
  ],

  // Style rules that may conflict with test purposes
  style: [
    'arrow-body-style',
    '@stylistic/max-statements-per-line',
    '@stylistic/padding-line-between-statements'
  ],

  // Convenience combinations
  common: ['jsdoc/require-jsdoc', 'arrow-body-style'],

  // Get all filterable rules
  all: () => [
    ...global.FILTERABLE_RULES.universal,
    ...global.FILTERABLE_RULES.documentation,
    ...global.FILTERABLE_RULES.style
  ]
};

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
global.lintFile = async fileName => {
  const filePath = path.join(__dirname, 'tests', '__fixtures__', fileName);
  const eslint = new ESLint({
    overrideConfigFile: path.join(__dirname, 'tests', 'eslint.config.js')
  });

  const results = await eslint.lintFiles([filePath]);

  return results[0] || {};
};

/**
 * Count errors and warnings in ESLint results
 * A global variable that holds the count of issues.
 * This property is used to track the total number of issues globally in the context of the application.
 * It can be updated to reflect changes in the total issue count and accessed wherever global variables are available.
 *
 * @param {Array} messages - ESLint messages array
 * @returns {{errors: *, warnings: *, errorCount, warningCount, totalIssues: *}} - Object containing error and warning counts
 */
global.countIssues = messages => {
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
 * Validate filtered rules against policy
 *
 * @param {string} fileName - File being linted
 * @param {string} [testRule] - The rule being tested (if applicable)
 * @param {string[]} disableRules - Rules to be filtered
 * @returns {string[]} - Validated list of rules to filter
 * @throws {Error} - If filtering policy is violated
 */
global.validateFilterRules = (fileName, testRule, disableRules = []) => {
  if (!disableRules.length) return disableRules;

  const allAllowed = global.FILTERABLE_RULES.all();

  // Check for invalid rules
  const invalid = disableRules.filter(r => !allAllowed.includes(r));

  if (invalid.length > 0) {
    throw new Error(`Invalid filter rules: ${invalid.join(', ')}. Only rules defined in FILTERABLE_RULES can be filtered.`);
  }

  // Don't allow filtering the rule being tested
  if (testRule && disableRules.includes(testRule)) {
    throw new Error(`Cannot filter the rule being tested: ${testRule}`);
  }

  // For JSDoc test files, don't allow filtering JSDoc rules
  if (fileName.includes('jsdoc') && disableRules.some(r => r.startsWith('jsdoc/'))) {
    throw new Error('Cannot filter JSDoc rules in JSDoc test files');
  }

  return disableRules;
};

/**
 * Process ESLint results into a structured format for snapshot testing
 *
 * @param {string} fileName - File to lint
 * @param {Object} options - Options for processing
 * @param {string[]} [options.disableRules] - Array of rule IDs to filter out from results
 * @param {string} [options.testRule] - The rule being tested (for validation)
 * @returns {Promise<Object>} - Processed ESLint results
 */
global.lintAndProcessFile = async (fileName, options = {}) => {
  const result = await global.lintFile(fileName);

  // Apply filtering based on options
  let filteredMessages = result.messages;
  let appliedFilters = [...global.FILTERABLE_RULES.universal]; // Always track universal filters

  if (options?.disableRules?.length > 0) {
    // Validate filters against policy
    const validatedRules = global.validateFilterRules(fileName, options.testRule, options.disableRules);

    // Add custom filters
    appliedFilters = [...appliedFilters, ...validatedRules];

    // Filter messages
    filteredMessages = result.messages.filter(msg => !appliedFilters.includes(msg.ruleId));
  }

  // Count filtered issues
  const filteredIssues = result.messages.filter(msg =>
    !filteredMessages.some(fm => fm.ruleId === msg.ruleId && fm.line === msg.line && fm.column === msg.column));

  // Group filtered issues by rule
  const filteredCounts = {};

  // Count occurrences of each rule
  filteredIssues.forEach(msg => {
    filteredCounts[msg.ruleId] ??= 0;
    filteredCounts[msg.ruleId] += 1;
  });

  const { errorCount, warningCount, totalIssues } = global.countIssues(filteredMessages);
  const projectRoot = path.resolve(__dirname);

  // Log filtered rules if any were applied (for debugging)
  if (filteredIssues.length > 0 && process.env.DEBUG) {
    console.log(`\nFiltered ${filteredIssues.length} issues from ${fileName}:`);
    Object.entries(filteredCounts).forEach(([rule, count]) => {
      console.log(`  ${rule}: ${count} issues`);
    });
  }

  return {
    filePath: path.basename(result.filePath),
    errorCount,
    warningCount,
    totalIssues,
    messages: filteredMessages.map(({ ruleId, severity, message, line, column }) => ({
      ruleId,
      severity: severity === 2 ? 'error' : 'warning',
      message: message?.replace(projectRoot, '<PROJECT_ROOT>'),
      line,
      column
    })),
    // Include filtering information in a snapshot
    filtering: {
      appliedFilters,
      totalFiltered: filteredIssues.length,
      ruleBreakdown: filteredCounts
    }
  };
};
