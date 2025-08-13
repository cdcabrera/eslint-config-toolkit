// FIXTURE: This file demonstrates the allowed pattern for assignments in while loops
// with the 'no-cond-assign': ['error', 'except-parens'] rule configuration.

/**
 * Process items from a data source until there are no more items.
 * This demonstrates the common pattern of assigning a value in a while loop condition.
 *
 * @param {Function} getNextItem - Function that returns the next item or null/undefined when done
 * @returns {Array} The processed items
 */
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

/**
 * Another example with a more complex condition
 *
 * @param {Function} getNextValue - Function that returns the next value or null/undefined when done
 * @returns {number} The sum of all values
 */
function sumValues(getNextValue) {
  let sum = 0;
  let value;

  // This is also allowed - assignment with additional condition
  while ((value = getNextValue()) && value > 0) {
    sum += value;
  }

  return sum;
}

// This would trigger an error even with 'except-parens' because the assignment
// is not wrapped in parentheses
// BAD: while (item = getNextItem()) { ... }

// This would also trigger an error because it's an assignment in an if condition
// without parentheses
// BAD: if (item = getNextItem()) { ... }

// But this would be allowed because the assignment is in parentheses
// GOOD: if ((item = getNextItem())) { ... }

module.exports = {
  processItems,
  sumValues
};
