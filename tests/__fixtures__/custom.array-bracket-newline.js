// FIXTURE: This file demonstrates the array and object formatting stylistic rules
// These rules ensure consistent formatting of arrays and objects

// @stylistic/array-bracket-newline - Require consistent line breaks inside array brackets
// Configuration: [2, 'consistent']
// This means that either all elements are on the same line, or there should be line breaks after opening bracket and before closing bracket

// Example 1: All elements on the same line
const arrayBracketNewlineSameLine = [1, 2, 3, 4];

// Example 2: Line breaks after opening bracket and before closing bracket
const arrayBracketNewlineMultiLine = [
  'first item',
  'second item',
  'third item'
];

// This would be incorrect (inconsistent):
// const arrayBracketNewlineInconsistent = [1, 2,
//   3, 4];

// @stylistic/array-bracket-spacing - Disallow spaces inside array brackets
// Correct: [1, 2, 3]
// Incorrect: [ 1, 2, 3 ]
const arrayBracketSpacingCorrect = [1, 2, 3];
// This would be incorrect: const arrayBracketSpacingIncorrect = [ 1, 2, 3 ];

// @stylistic/array-element-newline - Require consistent line breaks between array elements
// Configuration: [2, 'consistent']
// This means that either all elements are on the same line, or each element is on its own line

// Example 1: All elements on the same line
const arrayElementNewlineSameLine = [1, 2, 3, 4];

// Example 2: Each element on its own line
const arrayElementNewlineMultiLine = [
  'first item',
  'second item',
  'third item'
];

// This would be incorrect (inconsistent):
// const arrayElementNewlineInconsistent = [1, 2,
//   3, 4];

// @stylistic/object-curly-newline - Require consistent line breaks inside object braces
// Configuration: [2, { multiline: true, consistent: true }]
// This means that if any property in an object literal spans multiple lines,
// there should be a line break after the opening brace and before the closing brace,
// and the breaks should be consistent

// Example 1: All properties on the same line
const objectCurlyNewlineSameLine = { a: 1, b: 2, c: 3 };

// Example 2: Line breaks after opening brace and before closing brace
const objectCurlyNewlineMultiLine = {
  a: 1,
  b: 2,
  c: 3
};

// Example 3: Line breaks required because a property spans multiple lines
const objectCurlyNewlineWithMultilineProperty = {
  a: 1,
  b: function() {
    return 'multiline property';
  },
  c: 3
};

// This would be incorrect (inconsistent):
// const objectCurlyNewlineInconsistent = { a: 1,
//   b: 2, c: 3 };

// @stylistic/object-property-newline - Require consistent line breaks between object properties
// Configuration: [2, { allowAllPropertiesOnSameLine: true }]
// This means that either all properties are on the same line, or each property is on its own line

// Example 1: All properties on the same line
const objectPropertyNewlineSameLine = { a: 1, b: 2, c: 3 };

// Example 2: Each property on its own line
const objectPropertyNewlineMultiLine = {
  a: 1,
  b: 2,
  c: 3
};

// This would be incorrect (inconsistent):
// const objectPropertyNewlineInconsistent = { a: 1,
//   b: 2, c: 3 };

// @stylistic/indent-binary-ops - Ensure consistent indentation for binary operators
// Configuration: [2, 2]
// This means that binary operations that span multiple lines should have consistent indentation

// Example of correctly indented binary operations
const indentBinaryOpsCorrect = 1 +
  2 +
  3 +
  4;

// This would be incorrect:
// const indentBinaryOpsIncorrect = 1 +
// 2 +
//   3 +
//     4;

// @stylistic/function-call-spacing - Disallow space between function name and parentheses
// Correct: foo()
// Incorrect: foo ()
function functionCallSpacingExample() {
  return 'example';
}

const functionCallSpacingCorrect = functionCallSpacingExample();
// This would be incorrect: const functionCallSpacingIncorrect = functionCallSpacingExample ();

// @stylistic/generator-star-spacing - Require space after * in generator functions
// Correct: function* generator() {}
// Incorrect: function *generator() {}
function* generatorStarSpacingCorrect() {
  yield 'value';
}
// This would be incorrect: function *generatorStarSpacingIncorrect() { yield 'value'; }

// @stylistic/yield-star-spacing - Require space after * in yield* expressions
// Correct: yield* generator()
// Incorrect: yield *generator()
function* yieldStarSpacingExample() {
  yield* generatorStarSpacingCorrect();
}
// This would be incorrect: function* yieldStarSpacingIncorrect() { yield *generatorStarSpacingCorrect(); }

// @stylistic/switch-colon-spacing - Require space after colon in switch case statements
// Correct: case 1: break;
// Incorrect: case 1:break;
function switchColonSpacingCorrect(value) {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    default:
      return 'other';
  }
}
// This would be incorrect:
// function switchColonSpacingIncorrect(value) {
//   switch (value) {
//     case 1:return 'one';
//     case 2:return 'two';
//     default:return 'other';
//   }
// }

// @stylistic/no-mixed-spaces-and-tabs - Disallow mixed spaces and tabs for indentation
// This file uses spaces for indentation, not tabs

// @stylistic/no-tabs - Disallow tabs
// This file doesn't use tabs for indentation

module.exports = {
  arrayBracketNewlineSameLine,
  arrayBracketNewlineMultiLine,
  arrayBracketSpacingCorrect,
  arrayElementNewlineSameLine,
  arrayElementNewlineMultiLine,
  objectCurlyNewlineSameLine,
  objectCurlyNewlineMultiLine,
  objectCurlyNewlineWithMultilineProperty,
  objectPropertyNewlineSameLine,
  objectPropertyNewlineMultiLine,
  indentBinaryOpsCorrect,
  functionCallSpacingCorrect,
  generatorStarSpacingCorrect,
  yieldStarSpacingExample,
  switchColonSpacingCorrect
};
