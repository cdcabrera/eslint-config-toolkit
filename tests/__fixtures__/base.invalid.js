// FIXTURE: This file contains intentional linting issues to test the base configuration

// Missing semicolon
const foo = "bar"

// Double quotes instead of single quotes
const hello = "world";

// Trailing spaces at the end of this line
const trailing = 'spaces';

// Incorrect indentation
function badIndent() {
return 'bad';
}

// Line too long - this line should exceed the maximum line length set in the configuration to test if the max-length rule is working properly
const longLine = 'This is a very long line that should exceed the maximum line length set in the configuration to test if the max-length rule is working properly';

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

module.exports = {
  foo,
  hello,
  trailing,
  badIndent,
  longLine,
  missingJSDoc,
  incompleteJSDoc
};
