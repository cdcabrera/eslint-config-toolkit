/**
 * ESLint Configuration Tests
 *
 * This file contains tests for our ESLint configurations.
 * Helper functions and constants are available globally through the Jest setup.
 */

/**
 * Invalid Test Suite
 *
 * This test suite verifies that our ESLint configurations correctly identify
 * issues in files with intentional errors.
 *
 * Invalid tests, generally, don't need disabled rules since we want to see
 * all issues.
 *
 * Each test case includes:
 * - `file`: The test fixture filename
 * - `disableRules`: Rules to filter out from the snapshot to focus on the
 *    conflict
 * - `testNotes`: Optional developer/maintainer reminders
 */
describe('ESLint Configurations', () => {
  it.each([
    {
      file: 'invalid.base.js',
      disableRules: []
    },
    {
      file: 'invalid.jest.js',
      disableRules: []
    },
    {
      file: 'invalid.json.json',
      disableRules: []
    },
    {
      file: 'invalid.node.js',
      disableRules: []
    },
    {
      file: 'invalid.react.jsx',
      disableRules: []
    }
  ])('$file should have the expected linting issues', async ({ file, disableRules }) => {
    const result = await global.lintAndProcessFile(file, { disableRules });

    expect(result).toMatchSnapshot();
  });
});

/**
 * Rule Conflicts Test Suite
 *
 * This test suite verifies that our ESLint configuration correctly resolves
 * known conflicts between different ESLint rules.
 *
 * We disable documentation rules to focus on conflict resolution.
 *
 * Each test case includes:
 * - `file`: The test fixture filename
 * - `description`: What the test is verifying
 * - `rules`: Array of ESLint rule IDs that potentially conflict
 * - `note`: How the conflict was resolved
 * - `disableRules`: Rules to filter out from the snapshot to focus on the conflict
 * - `testNotes`: Optional developer/maintainer reminders
 */
describe('Rule Conflicts', () => {
  it.each([
    {
      file: 'conflicts.rule-conflict.js',
      description: 'should not have conflicts between padded-blocks and lines-around-comment',
      rules: ['@stylistic/padded-blocks', '@stylistic/lines-around-comment'],
      note: 'Added allowBlockStart: true to lines-around-comment rule',
      disableRules: global.FILTERABLE_RULES.documentation
    },
    {
      file: 'conflicts.arrow-parens.js',
      description: 'should not have errors for arrow functions with parentheses',
      rules: ['@stylistic/no-confusing-arrow', '@stylistic/no-extra-parens'],
      note: 'Handled arrow conditionals via ignoredNodes selectors; rule remains at warning',
      disableRules: global.FILTERABLE_RULES.documentation
    },
    {
      file: 'conflicts.cond-assign-parens.js',
      description: 'should not have errors for assignments in conditional expressions with parentheses',
      rules: ['@stylistic/no-extra-parens', 'no-cond-assign'],
      note: 'Added conditionalAssign: false to no-extra-parens rule to allow parentheses around assignments in conditions',
      disableRules: global.FILTERABLE_RULES.documentation
    }
  ])('$file $description (Note: $note)', async ({ file, rules, disableRules }) => {
    const result = await global.lintAndProcessFile(file, { disableRules });
    const conflictErrors = result.messages.filter(msg => rules.includes(msg.ruleId) && msg.severity === 'error');

    expect(conflictErrors).toHaveLength(0);
    expect(result).toMatchSnapshot();
  });
});

/**
 * Rule Customizations Test Suite
 *
 * This test suite verifies that our custom rule configurations work correctly
 * for specific programming patterns that we've explicitly allowed.
 *
 * Each test case includes:
 * - `file`: The test fixture filename
 * - `description`: What the test is verifying
 * - `rule`: The ESLint rule ID being tested
 * - `note`: How the rule was customized to allow specific patterns
 * - `disableRules`: Rules to filter out from the snapshot to focus on the rule being tested
 * - `testNotes`: Optional developer/maintainer reminders
 */
describe('Rule Customizations', () => {
  it.each([
    {
      file: 'custom.cond-assign.js',
      description: 'should allow assignments in while loop conditions with parentheses',
      rule: 'no-cond-assign',
      note: 'Changed from "always" to "except-parens" to allow assignments in parenthesized expressions',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.function-paren-newline.js',
      description: 'should allow consistent function parameter formatting',
      rule: '@stylistic/function-paren-newline',
      note: 'Changed from "multiline-arguments" to "consistent" to allow more flexible function parameter formatting',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.jsdoc-undefined-types.js',
      description: 'should allow undefined types in JSDoc comments',
      rule: 'jsdoc/no-undefined-types',
      note: 'Changed from error (2) to off (0) to allow undefined types in JSDoc comments',
      disableRules: global.FILTERABLE_RULES.style,
      testNotes: 'This test is specific to JSDoc functionality, so we need to keep JSDoc rules enabled.'
    },
    {
      file: 'custom.indent.js',
      description: 'should properly indent various code constructs',
      rule: '@stylistic/indent',
      note: 'Expanded configuration to provide consistent indentation for arrays, function calls, function declarations, imports, and objects',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.newline-per-chained-call.js',
      description: 'should allow up to 4 method calls in a chain without line breaks',
      rule: '@stylistic/newline-per-chained-call',
      note: 'Increased ignoreChainWithDepth from 3 to 4 to allow more method chaining on a single line',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.space-before-function-paren.js',
      description: 'should enforce consistent spacing in various code constructs',
      rule: '@stylistic/space-before-function-paren',
      note: 'Configured to require space before function parentheses for anonymous and async arrow functions, no space for named functions',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.brace-style.js',
      description: 'should enforce consistent line breaking and formatting',
      rule: '@stylistic/brace-style',
      note: 'Configured as 1tbs with allowSingleLine: true to allow consistent brace style with flexibility for single-line blocks',
      disableRules: [...global.FILTERABLE_RULES.documentation]
    },
    {
      file: 'custom.comma-dangle.js',
      description: 'should enforce consistent punctuation usage',
      rule: '@stylistic/comma-dangle',
      note: 'Set to "never" to disallow trailing commas in objects and arrays',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.array-bracket-newline.js',
      description: 'should enforce consistent array and object formatting',
      rule: '@stylistic/array-bracket-newline',
      note: 'Set to "consistent" to require consistent line breaks inside array brackets',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.no-extra-parens.js',
      description: 'should allow parentheses around logical expressions in spread elements',
      rule: '@stylistic/no-extra-parens',
      note: 'Configured via ignoredNodes selectors to allow parentheses around logical/conditional/await in spread elements',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
    },
    {
      file: 'custom.no-plusplus.js',
      description: 'should disallow ++/-- except in for-loop afterthought',
      rule: 'no-plusplus',
      note: 'Enabled as warning with allowForLoopAfterthoughts: true',
      disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style],
      testNotes: [
        'Expect warnings for count++ and --n outside for-loop afterthoughts',
        'Expect no warnings for i++ in for-loop afterthought',
        'Expect no issues for the "+= 1" example'
      ]
    },
    {
      file: 'custom.prefer-logical-operator-over-ternary.js',
      description: 'should prefer a logical operator over simple ternary fallbacks',
      rule: 'unicorn/prefer-logical-operator-over-ternary',
      note: 'Rule enabled without options; the plugin suggests either || or ??',
      disableRules: [
        ...global.FILTERABLE_RULES.documentation,
        ...global.FILTERABLE_RULES.style
      ],
      testNotes: [
        'Ternary fallbacks should be flagged by unicorn/prefer-logical-operator-over-ternary',
        'The rule provides suggestions for both || and ?? in this version'
      ]
    }
  ])('$file $description (Note: $note)', async ({ file, rule, disableRules }) => {
    const result = await global.lintAndProcessFile(file, { disableRules, testRule: rule });

    expect(result).toMatchSnapshot();
  });
});
