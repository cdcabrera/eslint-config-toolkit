# Agent Rule Management

## Overview

This document provides agent guidelines for identifying, implementing, and testing ESLint rule changes in the ESLint Config Toolkit.

## For Agents

### Processing Priority

High - This document should be processed when working with ESLint rules.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for a complete list of all guidelines.

### Key Concepts

- Rule change process
- Rule conflict resolution
- Testing rule changes
- Documenting rule changes

## Rule Change Process Overview

The process for changing ESLint rules involves these key steps:

1. **Identify** the rule issue or improvement opportunity
2. **Research** the rule options and behavior
3. **Implement** the rule change in the appropriate configuration file
4. **Test** the rule change with appropriate test fixtures
5. **Document** the change in comments and documentation
6. **Submit** the changes with a clear summary

## Identifying Rule Issues

Rule issues typically come from one of these sources:

- **User Feedback**: Users report false positives or negatives
- **Conflict Detection**: Two rules conflict with each other
- **Usability Improvements**: Rules are too strict or too lenient for common patterns
- **New Features**: New language features or coding patterns need rule adjustments

### Questions to Ask When Identifying Rule Issues

1. What specific code pattern is triggering the issue?
2. Is this a false positive (rule flags valid code) or false negative (rule misses invalid code)?
3. Is this a conflict between multiple rules?
4. Is this a common pattern that should be allowed?
5. What are the edge cases to consider?

## Implementing Rule Changes

### Step 1: Research the Rule

Before making changes:

1. Check the [Problematic Rules Manifest](./agent_manifest.md) for any known issues, mandatory logic, or conflicts associated with the rule.
2. Check the [ESLint documentation](https://eslint.org/docs/latest/rules/) for the rule
3. For plugin rules, use upstream plugin docs (for example, Unicorn: https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main/docs/rules)
4. Review the rule options and their effects
5. Look for known conflicts with other rules
6. Consider the impact on existing code

### Step 2: Make the Change

When implementing the rule change:

1. Locate the appropriate configuration file (usually in `configs/`)
2. Find the existing rule configuration or add a new one
3. Update the rule options based on your research
4. Add comments explaining the change and its purpose

Example:
```javascript
// Allow assignments in conditional expressions if they're in parentheses
// This is a common pattern for iteration, especially in while loops
// Example: while (someValue = getNextValue()) { ... }
'no-cond-assign': [2, 'except-parens'],
```

### Step 3: Consider Related Rules

Some rules interact with each other. When changing a rule, consider:

1. Are there related rules that might conflict?
2. Do other rules need to be adjusted to maintain consistency?
3. Are there plugin rules that overlap with this rule?

## Testing Rule Changes

### Step 1: Create or Update Test Fixtures

For each rule change, ensure there's a test fixture that:

1. Demonstrates the pattern that should be allowed or disallowed
2. Includes edge cases to verify the rule's behavior
3. Is well-documented with comments explaining the expected behavior

Test fixtures should be placed in `tests/__fixtures__/` with a descriptive name.

Example test fixture for `no-cond-assign` rule:
```javascript
// FIXTURE: This file demonstrates the allowed pattern for assignments in while loops
// with the 'no-cond-assign': ['error', 'except-parens'] rule configuration.

function processItems(getNextItem) {
  const results = [];
  let item;

  // This pattern is allowed with 'no-cond-assign': ['error', 'except-parens']
  // The assignment happens inside parentheses in the while condition
  while ((item = getNextItem())) {
    results.push(item);
  }

  return results;
}

// This would trigger an error even with 'except-parens' because the assignment
// is not wrapped in parentheses
// BAD: while (item = getNextItem()) { ... }
```

### Step 2: Add or Update Tests

Depending on the type of rule change, add or update tests in one of these test suites:

1. **Rule Customizations**: For changes to standard rules
2. **Rule Conflicts**: For resolving conflicts between rules
3. **ESLint Configurations**: For general rule behavior

See the [Guidelines Index](./README.md#guidelines-index) for detailed information on testing procedures.

### Step 3: Run Tests and Update Snapshots

After implementing the changes:

1. Run the tests to verify the rule behaves as expected:
   ```bash
   npm run test:jest
   ```

2. If the changes are intentional, update the snapshots:
   ```bash
   npm run test:jest -- -u
   ```

3. Run the full test suite to ensure no regressions:
   ```bash
   npm test
   ```

## Documenting Rule Changes

### In-Code Documentation

When changing a rule, add comments that explain:

1. What the rule does
2. Why the change was made
3. Examples of allowed and disallowed patterns
4. Any known conflicts or edge cases

Example:
```javascript
// Allow assignments in conditional expressions if they're in parentheses
// This is a common pattern for iteration, especially in while loops
// Example: while (someValue = getNextValue()) { ... }
'no-cond-assign': [2, 'except-parens'],
```

See the [Guidelines Index](./README.md#guidelines-index) for detailed information on comment formatting and standards.

### Commit Messages

Write clear commit messages that explain:

1. Which rule was changed
2. What the change was
3. Why the change was made

Example:
```
feat(rules): relax no-cond-assign to allow parenthesized assignments

Changed no-cond-assign from 'always' to 'except-parens' to allow common
iteration patterns like:
while ((item = getNextItem())) { ... }

Added test fixture and updated tests to verify the behavior.
```

## Rule Conflict Resolution

When resolving conflicts between rules:

1. **Identify the conflict**: Determine which rules are conflicting and under what circumstances
2. **Research options**: Look for configuration options that can resolve the conflict
3. **Choose a strategy**:
   - Disable one rule in favor of the other
   - Configure one or both rules to avoid the conflict
   - Use inline comments to disable rules in specific cases
4. **Document the resolution**: Explain the conflict and how it was resolved
5. **Test the resolution**: Create test fixtures that verify the conflict is resolved

Example of resolving a conflict between `no-extra-parens` and `no-cond-assign`:
```javascript
// Set to warning level and configure to avoid conflict with no-cond-assign
// The conflict occurs when assignments are used in conditional expressions:
// - no-cond-assign with 'except-parens' requires parentheses around assignments
// - no-extra-parens would normally consider these parentheses unnecessary
'@stylistic/no-extra-parens': [1, 'all', {
  conditionalAssign: false,
  // other options...
}],
```

## Examples

### Example 1: Relaxing the max-length Rule

**Issue**: The max-length rule is too strict at 120 characters, causing unnecessary line breaks.

**Research**:
- The rule has options for code and comment length
- It can be configured to ignore certain patterns
- Common values range from 80 to 120 characters

**Implementation**:
```javascript
'@stylistic/max-len': [2, { 
  code: 180, 
  comments: 180, 
  ignoreComments: false, 
  ignoreStrings: true, 
  ignoreTemplateLiterals: true, 
  ignoreUrls: true 
}],
```

**Testing**:
1. Update the base.invalid.js test fixture to include lines that exceed 180 characters
2. Run tests and update snapshots
3. Verify that lines under 180 characters don't trigger errors

**Documentation**:
```javascript
// Increased from 120 to 180 characters to reduce unnecessary line breaks
// while still maintaining reasonable readability
'@stylistic/max-len': [2, { code: 180, comments: 180, ... }],
```

### Example 2: Resolving a Rule Conflict

**Issue**: The no-extra-parens rule conflicts with no-cond-assign when using assignments in conditionals.

**Research**:
- no-cond-assign with 'except-parens' requires parentheses around assignments
- no-extra-parens flags these parentheses as unnecessary
- no-extra-parens has a conditionalAssign option to allow parentheses in assignments

**Implementation**:
```javascript
'@stylistic/no-extra-parens': [1, 'all', {
  conditionalAssign: false,
  // other options...
}],
```

**Testing**:
1. Create a test fixture demonstrating the conflict
2. Add a test case to the Rule Conflicts test suite
3. Run tests and verify no errors are reported

**Documentation**:
```javascript
// Set to warning level and configure to avoid conflict with no-cond-assign
// The conflict occurs when assignments are used in conditional expressions:
// - no-cond-assign with 'except-parens' requires parentheses around assignments
// - no-extra-parens would normally consider these parentheses unnecessary
'@stylistic/no-extra-parens': [1, 'all', {
  conditionalAssign: false,
  // other options...
}],
```


## References

- See the [Guidelines Index](./README.md#guidelines-index) for all related guidelines
- [ESLint Rules Documentation](https://eslint.org/docs/latest/rules/) for official ESLint rule documentation

Last updated: August 22, 2025
