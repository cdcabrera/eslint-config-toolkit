// FIXTURE: This file demonstrates the @stylistic/function-paren-newline rule with 'consistent' setting
// The rule ensures that function parameters have consistent newline behavior

/**
 * Example function with multiple parameters on a single line
 * This should be allowed with the 'consistent' setting
 *
 * @param {string} param1 - First parameter
 * @param {string} param2 - Second parameter
 * @param {string} param3 - Third parameter
 * @returns {string} Concatenated parameters
 */
function singleLineParams(param1, param2, param3) {
  return param1 + param2 + param3;
}

/**
 * Example function with parameters on multiple lines
 * This should be allowed with the 'consistent' setting
 *
 * @param {string} param1 - First parameter
 * @param {string} param2 - Second parameter
 * @param {string} param3 - Third parameter
 * @returns {string} Concatenated parameters
 */
function multiLineParams(
  param1,
  param2,
  param3
) {
  return param1 + param2 + param3;
}

/**
 * Example function with a mix of single and multi-line parameters
 * This would be disallowed with 'multiline-arguments' but allowed with 'consistent'
 *
 * @param {string} param1 - First parameter
 * @param {Object} options - Options object
 * @returns {string} Formatted result
 */
function mixedParams(param1, {
  option1,
  option2,
  option3
}) {
  return param1 + option1 + option2 + option3;
}

/**
 * Example arrow function with parameters on a single line
 *
 * @param {string} param1 - First parameter
 * @param {string} param2 - Second parameter
 * @returns {string} Concatenated parameters
 */
const arrowSingleLine = (param1, param2) => param1 + param2;

/**
 * Example arrow function with parameters on multiple lines
 *
 * @param {string} param1 - First parameter
 * @param {string} param2 - Second parameter
 * @param {string} param3 - Third parameter
 * @returns {string} Concatenated parameters
 */
const arrowMultiLine = (
  param1,
  param2,
  param3
) => param1 + param2 + param3;

module.exports = {
  singleLineParams,
  multiLineParams,
  mixedParams,
  arrowSingleLine,
  arrowMultiLine
};
