// FIXTURE: This file demonstrates the line breaking and formatting stylistic rules
// These rules ensure consistent line breaks and code formatting

// @stylistic/brace-style - Enforce 1tbs brace style with allowSingleLine: true
// Correct: if (foo) { bar(); } or if (foo) {\n  bar();\n}
// Incorrect: if (foo)\n{\n  bar();\n}
function braceStyleCorrect() {
  // 1tbs style with blocks on same line as control statement
  if (true) {
    return 'correct';
  } else {
    return 'also correct';
  }

  // Single-line form is also allowed
  if (true) { return 'single line is allowed'; }
}
// This would be incorrect:
// function braceStyleIncorrect() {
//   if (true)
//   {
//     return 'incorrect';
//   }
//   else
//   {
//     return 'also incorrect';
//   }
// }

// @stylistic/comma-style - Require commas at the end of the line
// Correct: const obj = {\n  foo: 'foo',\n  bar: 'bar'\n};
// Incorrect: const obj = {\n  foo: 'foo'\n  , bar: 'bar'\n};
const commaStyleCorrect = {
  first: 'item',
  second: 'item',
  third: 'item'
};
// This would be incorrect:
// const commaStyleIncorrect = {
//   first: 'item'
//   , second: 'item'
//   , third: 'item'
// };

// @stylistic/eol-last - Require newline at the end of files
// This file has a newline at the end

// @stylistic/function-call-argument-newline - Require consistent line breaks between function arguments
// Correct: foo('bar', 'baz') or foo(\n  'bar',\n  'baz'\n)
// Incorrect: foo('bar',\n  'baz')
function functionCallArgumentNewlineExample(arg1, arg2) {
  // All arguments on same line
  return functionCallArgumentNewlineExample('value1', 'value2');

  // Or all arguments on separate lines (would be used for longer arguments)
  // return functionCallArgumentNewlineExample(
  //   'longer value 1',
  //   'longer value 2'
  // );
}
// This would be incorrect:
// return functionCallArgumentNewlineExample('value1',
//   'value2');

// @stylistic/linebreak-style - Enforce Unix linebreak style
// This file uses Unix linebreaks (LF)

// @stylistic/lines-between-class-members - Require empty line between class members except after single-line members
class LinesBetweenClassMembersExample {
  // Single-line members don't need empty line between them
  singleLineMethod1() { return 1; }
  singleLineMethod2() { return 2; }

  // Multi-line methods need empty line between them
  multiLineMethod1() {
    const x = 1;
    return x + 1;
  }

  multiLineMethod2() {
    const y = 2;
    return y + 2;
  }
}

// @stylistic/max-statements-per-line - Maximum one statement per line
// Correct: foo(); bar();
// Incorrect: foo(); bar();
function maxStatementsPerLineCorrect() {
  const x = 1;
  return x;
}
// This would be incorrect: function maxStatementsPerLineIncorrect() { const x = 1; return x; }

// @stylistic/multiline-ternary - Require newlines for multiline ternary expressions
// Correct for single line: const foo = bar ? 'baz' : 'qux';
// Correct for multiline:
// const foo = bar ?
//   'baz' :
//   'qux';
const singleLineTernary = true ? 'yes' : 'no';
const multilineTernary = someVeryLongConditionThatRequiresMultipleLines ?
  'result when condition is true' :
  'result when condition is false';

function someVeryLongConditionThatRequiresMultipleLines() {
  return true;
}

// @stylistic/new-parens - Require parentheses when invoking a constructor
// Correct: const foo = new Bar();
// Incorrect: const foo = new Bar;
class ExampleClass {}
const newParensCorrect = new ExampleClass();
// This would be incorrect: const newParensIncorrect = new ExampleClass;

// @stylistic/no-multiple-empty-lines - Limit consecutive empty lines
// Correct: One empty line maximum
function noMultipleEmptyLinesExample() {
  const x = 1;

  return x;
}
// This would be incorrect:
// function noMultipleEmptyLinesIncorrect() {
//   const x = 1;
//
//
//   return x;
// }

// @stylistic/nonblock-statement-body-position - Require single-line statements to be on the same line as their headers
// Correct: if (foo) bar();
// Incorrect: if (foo)\n  bar();
function nonblockStatementBodyPositionCorrect() {
  if (true) return 'correct';
  for (let i = 0; i < 5; i++) continue;
  while (false) break;
}
// This would be incorrect:
// function nonblockStatementBodyPositionIncorrect() {
//   if (true)
//     return 'incorrect';
//   for (let i = 0; i < 5; i++)
//     continue;
// }

// @stylistic/padding-line-between-statements - Require blank lines in specific places
function paddingLineBetweenStatementsExample() {
  const x = 1;
  const y = 2;

  // Blank line before return statement
  return x + y;
}

// @stylistic/operator-linebreak - Require linebreaks to be placed after operators except for ternary operators
// Correct: foo = 1 +\n  2;
// Incorrect: foo = 1\n  + 2;
// Exception for ternary operators: condition\n  ? x\n  : y
const operatorLinebreakCorrect = 1 +
  2 +
  3;

const ternaryLinebreakCorrect = someVeryLongConditionThatRequiresMultipleLines
  ? 'yes'
  : 'no';

// This would be incorrect:
// const operatorLinebreakIncorrect = 1
//   + 2
//   + 3;

module.exports = {
  braceStyleCorrect,
  commaStyleCorrect,
  functionCallArgumentNewlineExample,
  LinesBetweenClassMembersExample,
  maxStatementsPerLineCorrect,
  singleLineTernary,
  multilineTernary,
  newParensCorrect,
  noMultipleEmptyLinesExample,
  nonblockStatementBodyPositionCorrect,
  paddingLineBetweenStatementsExample,
  operatorLinebreakCorrect,
  ternaryLinebreakCorrect
};
