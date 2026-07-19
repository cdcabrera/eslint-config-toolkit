/**
 * Examples of valid and invalid identifier lengths.
 */

// Valid identifiers (length >= 2)
const myVar = 1;
const count = 10;

// Valid exceptions (length < 2 but allowed)
const i = 0;
const j = 0;
const _ = 'underscore';

// Invalid identifiers (length < 2 and not allowed)
// These should trigger id-length errors
const x = 1;
const y = 2;

function test(z) {
  return z;
}

// Properties are exempt based on configuration
const obj = {
  p: 1
};

module.exports = {
  myVar,
  count,
  i,
  j,
  _,
  x,
  y,
  test,
  obj
};
