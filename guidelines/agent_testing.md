# Agent Testing

## Overview

This document provides agent guidance on testing procedures and standards for the ESLint Config Toolkit.

## For Agents

### Processing Priority

High - This document should be processed when working with tests or implementing changes that require testing.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for a complete list of all guidelines.

### Key Concepts

- Test structure and organization
- Test types and their purposes
- Test case properties and requirements
- Snapshot testing methodology
- Test helper functions

## Testing Basics

The ESLint Config Toolkit uses Jest for testing, with a focus on snapshot testing to verify that ESLint configurations work as expected. The testing approach is designed to:

1. **Verify Rule Behavior**: Ensure that ESLint rules correctly identify issues in code
2. **Test Rule Conflicts**: Verify that the configuration resolves conflicts between different ESLint rules
3. **Validate Customizations**: Confirm that custom rule configurations work correctly for specific programming patterns

## Test Structure

The test structure consists of:

- **Test Fixtures**: Located in `tests/__fixtures__/`, these files contain code examples that demonstrate specific ESLint rules or configurations
- **Test Suites**: Defined in `tests/eslint.test.js`, these group related test cases and define their expected behavior
- **Helper Functions**: Located in `jest.setupTests.js`, these provide utilities for running ESLint and processing results
- **Snapshots**: Located in `tests/__snapshots__/`, these capture the expected output for each test case

## Test Types

### ESLint Configurations Tests

Test files named `invalid.[config].[extension]` verify that ESLint configurations correctly identify issues in files with intentional errors.

### Rule Conflicts Tests

Test files named `conflicts.[eslint reference].[extension]` verify that the ESLint configuration correctly resolves known conflicts between different ESLint rules.

### Rule Customizations Tests

Test files named `custom.[eslint reference].[extension]` verify that custom rule configurations work correctly for specific programming patterns.

## Creating Test Cases

### Testing a Single Rule

To test a single ESLint rule:

1. **Create a Test Case**:

```javascript
const testCase = {
  file: 'custom.my-rule.js',
  description: 'should allow specific pattern with my-rule',
  rule: 'my-rule',
  note: 'Configured my-rule to allow specific pattern',
  disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style]
};
```

2. **Create a Test Fixture**:

```javascript
/**
 * Test for my-rule
 * 
 * This file demonstrates code patterns that should be allowed by our custom
 * configuration of my-rule.
 */

// Example of code that should be allowed
const myExample = () => {
  // ...
};

// Example of code that would normally trigger the rule but is allowed by our configuration
const myCustomExample = () => {
  // ...
};
```

### Testing Rule Conflicts

To test a conflict between two ESLint rules:

1. **Create a Test Case**:

```javascript
const conflictTestCase = {
  file: 'conflicts.rule1-rule2.js',
  description: 'should not have conflicts between rule1 and rule2',
  rules: ['rule1', 'rule2'],
  note: 'Added option to rule1 to prevent conflict with rule2',
  disableRules: global.FILTERABLE_RULES.documentation
};
```

2. **Create a Test Fixture**:

```javascript
/**
 * Test for conflict between rule1 and rule2
 * 
 * This file demonstrates code patterns that would normally trigger both rules,
 * but our configuration resolves the conflict.
 */

// Example of code that would normally trigger both rules
const example = () => {
  // ...
};
```

## Test Helper Functions

The toolkit includes several helper functions to simplify testing:

### lintFile

Runs ESLint on a specified file and returns the results.

```javascript
const result = await global.lintFile('custom.my-rule.js');
```

### lintAndProcessFile

Processes ESLint results into a structured format for snapshot testing.

```javascript
const result = await global.lintAndProcessFile('custom.my-rule.js', { 
  disableRules: [...global.FILTERABLE_RULES.documentation], 
  testRule: 'my-rule' 
});
```

## Snapshot Testing

The toolkit uses Jest snapshots to verify that ESLint configurations work as expected. Snapshots capture the output of ESLint for each test case.

### Snapshot Content Verification

Before updating snapshots, it's critical to verify the content of the snapshots to ensure the changes match the expected behavior:

1. **Examine Existing Snapshots**: Before making changes, review the current snapshot content to understand the baseline behavior:
   ```bash
   cat tests/__snapshots__/eslint.test.js.snap | grep -A 10 "custom.my-rule.js"
   ```

2. **Run Tests Without Updating**: Run tests to see what would change without updating snapshots:
   ```bash
   npm run test:jest
   ```

3. **Review Snapshot Differences**: Carefully examine the differences between the existing and new snapshots:
   - Look for expected rule violations that should be present
   - Check for unexpected rule violations that shouldn't be there
   - Verify that rule messages match the expected behavior
   - Ensure line and column numbers correctly identify the issue locations

4. **Understand the Changes**: For each difference:
   - Identify which rule caused the change
   - Determine if the change aligns with the expected behavior
   - Verify that no unintended side effects are introduced

5. **Document Your Verification**: Add a `testNotes` property to your test case object explaining what you verified:
   ```javascript
   const testCase = {
     file: 'custom.my-rule.js',
     description: 'should allow specific pattern with my-rule',
     rule: 'my-rule',
     note: 'Configured my-rule to allow specific pattern',
     disableRules: [...global.FILTERABLE_RULES.documentation, ...global.FILTERABLE_RULES.style],
     testNotes: [
       'Verified that the rule correctly identifies missing parentheses around line 10',
       'Verified that the rule ignores valid usage around line 15'
     ]
   };
   ```

### Updating Snapshots

Only after verifying the snapshot content and confirming that all changes are intentional should you update the snapshots:

```bash
npm run test:jest-update
```

## Trigger: "Test rule [rule-name]"

When a user requests testing a rule with this trigger phrase, follow this workflow:

1. **Preparation Phase**
   - Identify the rule to be tested
   - Determine what aspects of the rule need testing
   - Plan the test approach

2. **Test Case Creation**
   - Create a test case with appropriate properties
   - Create a test fixture demonstrating the rule behavior
   - Include examples of both valid and invalid code

3. **Test Execution**
   - Run the tests using the appropriate helper functions
   - Analyze the results to verify the rule behaves as expected
   - Follow the Snapshot Content Verification process to examine snapshot differences
   - Document your verification using the `testNotes` property on the test case object
   - Verify that the changes in snapshots accurately reflect the expected rule behavior
   - Only update snapshots after confirming the content changes are correct

4. **Reporting Phase**
   - Summarize the test results
   - Highlight any issues or unexpected behavior
   - Provide recommendations for rule configuration

## Trigger: "Verify rule conflict resolution"

When a user requests verification of rule conflict resolution with this trigger phrase, follow this workflow:

1. **Conflict Identification**
   - Identify the conflicting rules
   - Determine the specific code patterns that trigger the conflict
   - Verify the current configuration's approach to resolving the conflict

2. **Test Case Creation**
   - Create a test case specifically for the conflict
   - Create a test fixture demonstrating the conflict
   - Include examples that would normally trigger both rules

3. **Test Execution**
   - Run the tests using the appropriate helper functions
   - Verify that the conflict is properly resolved
   - Follow the Snapshot Content Verification process to examine snapshot differences
   - Document your verification using the `testNotes` property on the test case object
   - Verify that the changes in snapshots accurately reflect the expected conflict resolution
   - Only update snapshots after confirming the content changes are correct

4. **Reporting Phase**
   - Summarize the conflict and its resolution
   - Explain how the configuration resolves the conflict
   - Provide recommendations for any improvements

## Implementation Guidelines

When implementing or modifying tests, follow these guidelines:

1. **Understand the Test Type**: Determine whether you're testing a single rule, rule conflicts, or general configuration behavior.
2. **Use the Correct Properties**: Ensure your test case includes all required properties for its type.
3. **Create Clear Fixtures**: Write test fixtures that clearly demonstrate the behavior being tested.
4. **Include Both Valid and Invalid Examples**: Show both what should and shouldn't be allowed.
5. **Document Test Purpose**: Add clear comments in test fixtures explaining the purpose of the test and what code patterns are being tested.
6. **Document Verification with testNotes**: Always examine snapshot content before and after changes, document your verification using the `testNotes` property on the test case object, and only update snapshots after confirming changes are correct.
7. **Verify Test Coverage**: Ensure your tests cover all aspects of the change.

## References

- See the [Guidelines Index](./README.md#guidelines-index) for all related guidelines
- [Jest Documentation](https://jestjs.io/docs/getting-started) for more information on Jest testing

Last updated: August 22, 2025
