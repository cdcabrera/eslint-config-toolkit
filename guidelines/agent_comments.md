# Agent Comments

## Overview

This document provides agent templates and standards for comments in configuration files for the ESLint Config Toolkit.

## For Agents

### Processing Priority

Medium - This document should be processed when working with configuration files or generating comments.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for a complete list of all guidelines.

### Key Concepts

- Comment templates for different purposes
- Spacing and formatting standards
- Documentation best practices
- JSDoc conventions

## Comment Templates

### File Header

Use this template for file headers in configuration files:

```js
/**
 * [Configuration Name] ESLint configuration
 * 
 * Provides linting rules for [technology/framework] code.
 * 
 * @module configs/[filename]
 */
```

Example:
```js
/**
 * React ESLint configuration
 * 
 * Provides linting rules for React and JSX code.
 * 
 * @module configs/react
 */
```

### Configuration Description

Use this template for describing configurations:

```js
/**
 * Configuration for linting [technology/framework].
 * 
 * Key features:
 * - **[Feature 1]**: [Description of what this does and why it matters]
 * - **[Feature 2]**: [Description with examples if helpful]
 * - **[Feature 3]**: [Description of another key feature]
 */
```

Example:
```js
/**
 * Configuration for linting React.
 * 
 * Key features:
 * - **JSX formatting**: Enforces consistent JSX indentation and spacing
 * - **React Hooks**: Ensures proper usage of React hooks
 * - **Accessibility**: Includes a11y rules for creating accessible components
 */
```

### Rule Section Comments

Use this template for section headers in configuration files:

```js
// -------------------------------------------------------------------------
// [Section Name] rules
// -------------------------------------------------------------------------
```

Example:
```js
// -------------------------------------------------------------------------
// React core rules
// -------------------------------------------------------------------------
```

### Rule Explanation Comments

Use this template for explaining individual rules:

```js
// [rule name]: [what we've set it at and why]
// [example if necessary]
'rule-name': [severity, options];
```

Example:
```js
// react/function-component-definition: Set to allow both arrow functions and function declarations for named components
// Example: const Component = () => <div />; function Component() { return <div />; }
'react/function-component-definition': [
  2,
  {
    namedComponents: ['arrow-function', 'function-declaration'],
    unnamedComponents: ['arrow-function']
  }
];
```

### Type Annotation for Exports

Use this template for type annotations on exports:

```js
/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
```

## Complete Example

Here's a complete example of a well-documented configuration file:

```js
/**
 * React ESLint configuration
 * 
 * Provides linting rules for React and JSX code.
 * 
 * @module configs/react
 */

import { defineConfig } from 'eslint/config';
// imports...

/**
 * Configuration for linting React.
 * 
 * Key features:
 * - **JSX formatting**: Enforces consistent JSX indentation and spacing
 * - **React Hooks**: Ensures proper usage of React hooks
 * - **Accessibility**: Includes a11y rules for creating accessible components
 */
const config = [
  // Base configuration extension
  
  // -------------------------------------------------------------------------
  // React core rules
  // -------------------------------------------------------------------------
  {
    // react/function-component-definition: Set to allow both arrow functions and function declarations for named components
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: ['arrow-function']
      }
    ],

    // react/jsx-boolean-value: Set to never to use shorthand syntax for boolean props
    // Example: <Component isActive /> instead of <Component isActive={true} />
    'react/jsx-boolean-value': [2, 'never'],
    
    // Additional rules...
  }
];

/** @type {import("eslint").Linter.Config<config>[]} Processed config. */
export default config;
```

## Spacing Rules

To maintain consistent formatting across all configuration files, follow these spacing rules:

1. **NO blank line** between rule comments and the rule definition
2. **ONE blank line** between different rules (after one rule ends and before the next rule's comments)

- **Basic rule:**
  ```
  // First rule comment
  // More explanation and no blank line between comment and rule.
  'first-rule': 2;
  
  // Second rule comment and blank line between the previous rule.
  // More explanation and no blank line between comment and rule.
  'second-rule': 2;
  ```

- **Expanded rule:**
  ```
  // First rule comment
  // More explanation and no blank line between comment and rule.
  'first-rule': [2, 'always'];
  
  // Second rule comment and blank line between the previous rule.
  // More explanation and no blank line between comment and rule.
  'second-rule': [2, 'never'];
  
  // Third rule comment and blank line between the previous rule.
  // More explanation and no blank line between comment and rule.
  'third-rule': [
    2,
    'never'
  ];
  ```

- **Extensive rule:**
  ```
  // First rule comment
  // More explanation and no blank line between comment and rule.
  'first-rule': [2, 'always', { aRuleOption: 'loremIpsum' }];
  
  // Second rule comment and blank line between the previous rule.
  // More explanation and no blank line between comment and rule.
  'second-rule': [2, 'never', { aRuleOption: 'dolorSit' }];
  
  // Third rule comment and blank line between the previous rule.
  // More explanation and no blank line between comment and rule.
  'second-rule': [
    2,
    'never',
    {
      aRuleOption: 'dolorSit'
    }
  ];
  ```

## Agent Implementation Guidelines

When implementing or modifying configuration files as an agent, follow these guidelines:

1. **Use Consistent Templates**: Always use the templates provided in this document for comments.
2. **Explain the Why**: Don't just describe what a rule does, explain why it's configured a certain way.
3. **Include Examples**: When helpful, include code examples to illustrate rule behavior.
4. **Follow Spacing Rules**: Maintain consistent spacing between rules and comments.
5. **Group Related Rules**: Organize rules into logical sections with clear section headers.
6. **Document All Customizations**: Ensure any non-default rule configurations are explained.
7. **Use JSDoc Correctly**: Follow JSDoc conventions for file headers and type annotations.
8. **Keep Comments Concise**: Write clear, focused comments that convey necessary information without unnecessary verbosity. Aim for brevity while maintaining clarity.

### Comment Conciseness Guidelines

When writing comments, follow these principles to keep them concise:

- Limit rule explanations to 1-3 lines when possible (examples can exceed this limit if necessary)
- Focus exclusively on what the rule is set to and the factual reason why
- Avoid restating what the rule name already implies
- Avoid subjective opinions about the rule's benefits (e.g., "This allows flexibility while maintaining consistency...")
- Include examples only when they clarify non-obvious configurations
- Use the least amount of comment lines needed to convey the essential information

#### Examples of Concise vs. Verbose Comments

**Too Verbose:**
```js
// no-unused-vars: This rule reports on variables that are declared but never used in the code. It helps keep the codebase clean by ensuring that we don't have variables that are declared but not used anywhere. This can happen when refactoring code and forgetting to remove variables that are no longer needed. The rule is configured to warn rather than error because sometimes during development you might temporarily have unused variables.
'no-unused-vars': [1, { vars: 'all', args: 'after-used', ignoreRestSiblings: true }];
```

**Appropriately Concise:**
```js
// no-unused-vars: Reports variables declared but never used
// Set to warning level to avoid disrupting development workflow while still flagging potential issues
'no-unused-vars': [1, { vars: 'all', args: 'after-used', ignoreRestSiblings: true }];
```

**Even More Concise:**
```js
// no-unused-vars: Set to warning with ignoreRestSiblings to allow object destructuring patterns
'no-unused-vars': [1, { vars: 'all', args: 'after-used', ignoreRestSiblings: true }];
```

## Common Comment Patterns

### For Rule Conflicts

When documenting rule conflicts and their resolutions:

```
// [rule-1] and [rule-2]: Configured to resolve conflict with [specific option]
// Example: [code example if necessary]
'rule-1': [2, { conflictingOption: false }];
```

### For Custom Rule Configurations

When documenting custom rule configurations:

```
// [rule-name]: Set with [specific options] for [specific use case]
// Example: [code example if necessary]
'rule-name': [2, { customOption: true }];
```

### For Basic Rules with Simple Configuration

When documenting straightforward rules:

```
// [rule-name]: Set to [severity level] because [factual reason]
'rule-name': [severity];
```

## Before and After Examples

This section demonstrates how to transform comments from the old style to the new style.

### Example 1: Simple Rule

**Before:**
```js
// @stylistic/quotes: Controls the use of quotes in string literals
// Set to 'single' with escape and template literal options for flexibility
// This accommodates complex strings containing both quote types without compromising consistency
'@stylistic/quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }];
```

**After:**
```js
// @stylistic/quotes: Set to single quotes with avoidEscape and allowTemplateLiterals for mixed quote handling
'@stylistic/quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }];
```

### Example 2: Complex Rule with Options

**Before:**
```js
// no-param-reassign: Prevents reassigning function parameters
// Set to error level but with exceptions for common callback parameters and event objects
// This promotes immutability while allowing common patterns in middleware and reducers
'no-param-reassign': [
  2,
  {
    props: true,
    ignorePropertyModificationsFor: [
      'acc',
      'accumulator',
      'ctx',
      'req',
      'res'
    ]
  }
];
```

**After:**
```js
// no-param-reassign: Set to error with props:true but exceptions for middleware/reducer parameters
'no-param-reassign': [
  2,
  {
    props: true,
    ignorePropertyModificationsFor: [
      'acc',
      'accumulator',
      'ctx',
      'req',
      'res'
    ]
  }
];
```

### Example 3: Rule with Example

**Before:**
```js
// @stylistic/implicit-arrow-linebreak: Controls line breaks in arrow function expressions
// Disabled (0) to allow flexibility in arrow function formatting
// This allows breaking arrow functions across lines when needed for readability or max line length
// Example: const foo = (bar) =>
//   bar + 1; // This is allowed with the current configuration
'@stylistic/implicit-arrow-linebreak': 0;
```

**After:**
```js
// @stylistic/implicit-arrow-linebreak: Disabled to allow breaking arrow functions across lines
// Example: const foo = (bar) =>
//   bar + 1;
'@stylistic/implicit-arrow-linebreak': 0;
```

## References

- See the [Guidelines Index](./README.md#guidelines-index) for all related guidelines
- [ESLint Documentation](https://eslint.org/docs/latest/) for official ESLint documentation
- [Technical Writing Best Practices](https://developers.google.com/tech-writing) for guidance on clear, concise documentation

Last updated: August 22, 2025
