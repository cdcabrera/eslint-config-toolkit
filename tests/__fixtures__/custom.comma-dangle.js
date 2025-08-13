// FIXTURE: This file demonstrates the punctuation-related stylistic rules
// These rules ensure consistent use of punctuation in code

// @stylistic/comma-dangle - Disallow trailing commas
// Correct: const obj = { a: 1, b: 2 };
// Incorrect: const obj = { a: 1, b: 2, };
const commaDangleCorrect = {
  prop1: 'value1',
  prop2: 'value2'
};
// This would be incorrect:
// const commaDangleIncorrect = {
//   prop1: 'value1',
//   prop2: 'value2',
// };

const commaDangleArrayCorrect = [
  'item1',
  'item2'
];
// This would be incorrect:
// const commaDangleArrayIncorrect = [
//   'item1',
//   'item2',
// ];

// @stylistic/no-extra-semi - Disallow unnecessary semicolons
// Correct: const x = 5;
// Incorrect: const x = 5;;
const noExtraSemiCorrect = 5;
// This would be incorrect: const noExtraSemiIncorrect = 5;;

// @stylistic/no-floating-decimal - Disallow leading or trailing decimal points in numeric literals
// Correct: const x = 0.5;
// Incorrect: const x = .5; or const x = 5.;
const noFloatingDecimalCorrect = 0.5;
// This would be incorrect:
// const noFloatingDecimalIncorrect1 = .5;
// const noFloatingDecimalIncorrect2 = 5.;

// @stylistic/quote-props - Require quotes around object literal property names only when needed
// Correct: const obj = { a: 1, 'b-c': 2 };
// Incorrect: const obj = { 'a': 1, 'b-c': 2 };
const quotePropsCorrect = {
  simple: 'value',
  'hyphenated-key': 'value',
  'key with spaces': 'value'
};
// This would be incorrect:
// const quotePropsIncorrect = {
//   'simple': 'value',
//   'hyphenated-key': 'value',
//   'key with spaces': 'value'
// };

// @stylistic/quotes - Require single quotes for string literals
// Correct: const str = 'string';
// Incorrect: const str = "string";
const quotesCorrect = 'single quotes are required';
// This would be incorrect: const quotesIncorrect = "double quotes are not allowed";

// Exception for strings containing single quotes
const quotesExceptionCorrect = "I'm allowed to use double quotes when the string contains single quotes";

// @stylistic/semi - Require semicolons
// Correct: const x = 5;
// Incorrect: const x = 5
const semiCorrect = 5;
function semiCorrectFunction() {
  return 'value';
}
// This would be incorrect:
// const semiIncorrect = 5
// function semiIncorrectFunction() {
//   return 'value'
// }

// @stylistic/semi-spacing - Require space after semicolon, no space before
// Correct: for (let i = 0; i < 10; i++) {}
// Incorrect: for (let i = 0 ;i < 10 ; i++) {}
function semiSpacingCorrect() {
  for (let i = 0; i < 10; i++) {
    // Code here
  }
}
// This would be incorrect:
// function semiSpacingIncorrect() {
//   for (let i = 0 ;i < 10 ; i++) {
//     // Code here
//   }
// }

// @stylistic/semi-style - Require semicolons to be at the end of statements
// Correct: const a = 5;
// Incorrect: const a = 5
// ;const b = 6;
const semiStyleCorrect1 = 5;
const semiStyleCorrect2 = 6;
// This would be incorrect:
// const semiStyleIncorrect1 = 5
// ;const semiStyleIncorrect2 = 6;

// @stylistic/wrap-iife - Require parentheses around immediately invoked function expressions (outside)
// Correct: (function () { /* code */ }());
// Incorrect: function () { /* code */ }();
const wrapIifeCorrect = (function () {
  return 'IIFE result';
}());
// This would be incorrect:
// const wrapIifeIncorrect = function () {
//   return 'IIFE result';
// }();

// @stylistic/wrap-regex - No wrapping of regex literals in parentheses (disabled in config)
// This rule is disabled (set to 0) in the configuration
const wrapRegexExample = /pattern/;

// @stylistic/dot-location - Require the dot to be on the same line as the property
// Correct: object.property
// Incorrect: object
//            .property
function dotLocationCorrect(object) {
  return object.property;
}
// This would be incorrect:
// function dotLocationIncorrect(object) {
//   return object
//     .property;
// }

// Multiline is fine as long as the dot is with the property
function dotLocationMultilineCorrect(object) {
  return object
    .property1
    .property2
    .method();
}

// @stylistic/no-mixed-operators - Disallow mixed operators without parentheses
// Correct: (a && b) || c
// Incorrect: a && b || c
function noMixedOperatorsCorrect(a, b, c) {
  return (a && b) || c;
}
// This would be incorrect:
// function noMixedOperatorsIncorrect(a, b, c) {
//   return a && b || c;
// }

module.exports = {
  commaDangleCorrect,
  commaDangleArrayCorrect,
  noExtraSemiCorrect,
  noFloatingDecimalCorrect,
  quotePropsCorrect,
  quotesCorrect,
  quotesExceptionCorrect,
  semiCorrect,
  semiCorrectFunction,
  semiSpacingCorrect,
  semiStyleCorrect1,
  semiStyleCorrect2,
  wrapIifeCorrect,
  wrapRegexExample,
  dotLocationCorrect,
  dotLocationMultilineCorrect,
  noMixedOperatorsCorrect
};
