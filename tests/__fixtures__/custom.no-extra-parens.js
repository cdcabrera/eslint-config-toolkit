// FIXTURE: This file demonstrates the use of logical expressions in spread elements
// to test the behavior of the @stylistic/no-extra-parens rule configured via ignoredNodes selectors.

const someBool = true;
const anotherValue = { key: 'value' };
const someArray = [1, 2, 3];
const someCondition = true;
const someObject = { a: 1 };
const fallbackObject = { b: 2 };
const asyncFunc = async () => ({ c: 3 });
const value = { value: 'test' };

// --- Spread Elements ---

// Example 1: Object spread with logical AND (without parentheses)
const objectWithoutParensAnd = {
  ...someBool && anotherValue
};

// Example 2: Object spread with logical AND (with parentheses)
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

// Example 11: Spread with await (with parentheses)
const spreadWithAwait = async () => ({
  ...(await asyncFunc())
});

// Example 12: Specific pattern requested by user
const specificPattern = {
  ...(value && { value })
};

// --- Arrow Function Bodies ---

// Example 13: Arrow function with conditional body (with parentheses)
const arrowWithConditional = condition => (condition ? 'yes' : 'no');

// Example 14: Arrow function with logical body (with parentheses)
const arrowWithLogical = () => (someBool && anotherValue);

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
  complexWithoutParens,
  spreadWithAwait,
  specificPattern,
  arrowWithConditional,
  arrowWithLogical
};
