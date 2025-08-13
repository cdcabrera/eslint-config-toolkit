// FIXTURE: This file demonstrates the conflict between @stylistic/padded-blocks and @stylistic/lines-around-comment
// when a JSDoc comment is placed immediately above a constructor or class method.

/**
 * Class with JSDoc comments above methods to test the conflict between
 * @stylistic/padded-blocks and @stylistic/lines-around-comment rules.
 *
 * The conflict occurs because:
 * - @stylistic/padded-blocks (with 'never' option) disallows blank lines at the beginning of blocks
 * - @stylistic/lines-around-comment (without 'allowBlockStart: true') requires a blank line before block comments
 *
 * Our solution adds 'allowBlockStart: true' to @stylistic/lines-around-comment to resolve this conflict.
 */
class TestClass {
  /**
   * Constructor for TestClass
   * This should NOT trigger a conflict with our solution
   * @param {string} name - The name parameter
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Example method with JSDoc comment
   * This should NOT trigger a conflict with our solution
   * @returns {string} The name value
   */
  getName() {
    return this.name;
  }
}

// Another example with a different formatting to test
class AnotherClass {
  /**
   * Constructor without a blank line above the JSDoc comment
   * This demonstrates the correct formatting that avoids conflicts
   * @param {number} value - The value parameter
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * Method without a blank line above the JSDoc comment
   * This would trigger a conflict without our solution
   * @returns {number} The value
   */
  getValue() {
    return this.value;
  }
}

module.exports = {
  TestClass,
  AnotherClass
};
