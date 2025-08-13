// FIXTURE: This file demonstrates the conflict between @stylistic/no-confusing-arrow and @stylistic/no-extra-parens
// when an arrow function could be confused with a comparison operator.

/**
 * Example function that demonstrates the conflict:
 * - @stylistic/no-confusing-arrow wants parentheses around the arrow function to avoid confusion
 * - @stylistic/no-extra-parens considers these parentheses unnecessary
 */

// This should trigger a conflict
const getResult = condition => (condition ? 'yes' : 'no');

// This might also trigger a conflict
const getValue = a => (a + 1);

// This should be fine (multiline)
const getMultilineValue = a => {
  return a + 1;
};

// This should be fine (clearly not a comparison)
const getObject = () => ({ key: 'value' });

module.exports = {
  getResult,
  getValue,
  getMultilineValue,
  getObject
};
