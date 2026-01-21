// FIXTURE: This file demonstrates the interaction between @stylistic/no-confusing-arrow and @stylistic/no-extra-parens
// when an arrow function could be confused with a comparison operator.

const getResult = condition => (condition ? 'yes' : 'no');

const getValue = a => (a + 1);

const getMultilineValue = a => {
  return a + 1;
};

const getObject = () => ({ key: 'value' });

module.exports = {
  getResult,
  getValue,
  getMultilineValue,
  getObject
};
