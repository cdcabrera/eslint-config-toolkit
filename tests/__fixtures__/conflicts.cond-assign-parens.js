// FIXTURE: This file demonstrates the conflict between '@stylistic/no-extra-parens' and 'no-cond-assign'
// when assignments are used in conditional expressions.

/**
 * Example functions that demonstrate the conflict:
 * - 'no-cond-assign' with 'except-parens' requires parentheses around assignments in conditions
 * - '@stylistic/no-extra-parens' would normally flag these parentheses as unnecessary
 *
 * Our solution adds 'conditionalAssign: false' to '@stylistic/no-extra-parens' to allow
 * parentheses around assignments in conditions.
 */

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

  // This pattern requires parentheses for 'no-cond-assign' with 'except-parens'
  // But '@stylistic/no-extra-parens' would normally flag these as unnecessary
  // Our solution allows these parentheses by setting 'conditionalAssign: false'
  while ((item = getNextItem())) {
    results.push(item);
  }

  return results;
}

/**
 * Find the first item that matches a condition.
 * This demonstrates using assignment in an if condition.
 *
 * @param {Function} getNextItem - Function that returns the next item or null/undefined when done
 * @param {Function} predicate - Function that tests if an item matches a condition
 * @returns {*} The first matching item or null
 */
function findFirst(getNextItem, predicate) {
  let item;

  // This is another example where parentheses are required by 'no-cond-assign'
  // but would be flagged by '@stylistic/no-extra-parens' without our solution
  if ((item = getNextItem()) && predicate(item)) {
    return item;
  }

  return null;
}

/**
 * Process items with a for loop using assignment in the condition.
 *
 * @param {Array} items - Array of items to process
 * @returns {Array} Processed items
 */
function processWithFor(items) {
  const results = [];
  let i = 0;
  let item;

  // This demonstrates the conflict in a for loop condition
  for (; (item = items[i]); i++) {
    results.push(item);
  }

  return results;
}

module.exports = {
  processItems,
  findFirst,
  processWithFor
};
