// FIXTURE: This file contains intentional linting issues to test the Node.js configuration

// Using deprecated API
const util = require('util');
const oldMethod = util.isArray([]);

// Missing require
const missingModule = require('non-existent-module');

// Using process.exit directly
function exitProcess() {
  process.exit(1);
}

// Using path.join with __dirname incorrectly
const path = require('path');
const filePath = __dirname + '/file.js';

// Using require inside a function (should use global-require)
function dynamicRequire(moduleName) {
  const module = require(moduleName);
  return module;
}

// Jest test with no expect
test('this test has no expectations', () => {
  const value = 1 + 1;
  // Missing expect statement
});

// Jest test with focused test
test.only('this is a focused test', () => {
  expect(1 + 1).toBe(2);
});

// Using unsupported ES syntax for Node.js
const arrowFunction = async () => {
  await Promise.resolve();
  return { ...{ a: 1 }, ...{ b: 2 } };
};

module.exports = {
  oldMethod,
  exitProcess,
  filePath,
  dynamicRequire,
  arrowFunction
};
