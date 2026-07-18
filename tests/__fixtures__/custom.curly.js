// FIXTURE: This file demonstrates the 'curly': [2, 'all'] rule configuration.
// It ensures that all control statements use curly braces.

/**
 * Example function demonstrating correct use of curly braces.
 * @param {boolean} condition - The condition to check.
 */
function curlyCorrect(condition) {
  if (condition) {
    return 'correct';
  }

  while (condition) {
    return 'looping';
  }

  for (let i = 0; i < 10; i++) {
    process(i);
  }
}

/**
 * Examples of incorrect usage (would be caught by ESLint).
 * @param {boolean} condition - The condition to check.
 */
function curlyIncorrect(condition) {
  if (condition) return 'incorrect';

  while (condition) return 'incorrect-loop';

  for (let i = 0; i < 10; i++) return 'incorrect-for';
}

module.exports = {
  curlyCorrect,
  curlyIncorrect
};
