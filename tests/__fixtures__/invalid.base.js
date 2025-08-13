// FIXTURE: This file contains intentional linting issues to test the base configuration

// Missing semicolon
const foo = "bar"

// Double quotes instead of single quotes
const hello = "world";

// Trailing comma
const comma = {
  hello: 'world',
  foo: 'bar',
};

// Trailing spaces at the end of this line
const trailing = 'spaces'; 

// Incorrect indentation
function badIndent() {
return 'bad';
}

// Line too long - this line should exceed the maximum line length set in the configuration to test if the max-length rule is working properly. This comment has been extended to exceed the current character limit for testing purposes.
const longLine = 'This is a very long line that should exceed the maximum line length set in the configuration to test if the max-length rule is working properly. This string has been extended to exceed the current character limit for testing purposes.';

// Bad import order
const fs = require('fs');
const path = require('path');

// JSDoc issues
function missingJSDoc(param1, param2) {
  return param1 + param2;
}

/**
 * Function with incomplete JSDoc
 */
function incompleteJSDoc(param1, param2) {
  return param1 + param2;
}

// Arrow function with line break after arrow
const arrowWithLineBreak = () =>
  'This arrow function has a line break after the arrow';

// Arrow function without line break after arrow
const arrowWithoutLineBreak = () => 'This arrow function has a line break after the arrow';

// Arrow function with implied return of an object literal
const arrowWithObjectLiteral = () => ({
  foo: 'bar'
});

module.exports = {
  foo,
  hello,
  comma,
  trailing,
  badIndent,
  longLine,
  missingJSDoc,
  incompleteJSDoc,
  arrowWithLineBreak,
  arrowWithoutLineBreak,
  arrowWithObjectLiteral
};
