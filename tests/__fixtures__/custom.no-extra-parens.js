// FIXTURE: This file demonstrates the use of logical expressions in spread elements
// to test the behavior of the @stylistic/no-extra-parens rule configured via ignoredNodes selectors.

/**
 * Examples of spread elements with logical expressions, both with and without parentheses.
 * The issue is whether parentheses should be required around logical expressions in spread elements.
 */

// Variables for testing
const someBool = true;
const anotherValue = { key: 'value' };
const someArray = [1, 2, 3];
const someCondition = true;
const someObject = { a: 1 };
const fallbackObject = { b: 2 };

// Example 1: Object spread with logical AND (without parentheses)
// This is the syntax we want to avoid
const objectWithoutParensAnd = {
  ...someBool && anotherValue
};

// Example 2: Object spread with logical AND (with parentheses)
// This is the syntax we want to enforce
const objectWithParensAnd = {
  ...(someBool && anotherValue)
};

// Example 3: Object spread with logical OR (without parentheses)
const objectWithoutParensOr = {
  ...someBool || fallbackObject
};

// Example 4: Object spread with logical OR (with parentheses)
const objectWithParensOr = {
  ...(someBool || fallbackObject)
};

// Example 5: Object spread with nullish coalescing (without parentheses)
const objectWithoutParensNullish = {
  ...someObject ?? fallbackObject
};

// Example 6: Object spread with nullish coalescing (with parentheses)
const objectWithParensNullish = {
  ...(someObject ?? fallbackObject)
};

// Example 7: Array spread with logical AND (without parentheses)
const arrayWithoutParensAnd = [
  ...someBool && someArray
];

// Example 8: Array spread with logical AND (with parentheses)
const arrayWithParensAnd = [
  ...(someBool && someArray)
];

// Example 9: Complex case with conditional expression (without parentheses)
const complexWithoutParens = {
  ...someCondition ? someObject : fallbackObject
};

// Example 10: Complex case with conditional expression (with parentheses)
const complexWithParens = {
  ...(someCondition ? someObject : fallbackObject)
};

// Export all examples for testing
module.exports = {
  objectWithParensAnd,
  objectWithoutParensAnd,
  objectWithParensOr,
  objectWithoutParensOr,
  objectWithParensNullish,
  objectWithoutParensNullish,
  arrayWithParensAnd,
  arrayWithoutParensAnd,
  complexWithParens,
  complexWithoutParens
};
