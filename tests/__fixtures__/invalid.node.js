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

// Using require inside a function (triggers import/no-dynamic-require)
function dynamicRequire(moduleName) {
  const module = require(moduleName);
  return module;
}

// Node.js 22 Features
// This will trigger for 'n/no-unsupported-features/es-syntax' when version is >=22.0.0 but not >=22.11.0
const { promise, resolve, reject } = Promise.withResolvers();

// These should NOT trigger 'n/no-unsupported-features/es-syntax' when version is >=22.0.0
const asyncArray = async () => await Array.fromAsync([1, 2, 3]);

// Import/Export Declarations in CJS (should be flagged if treated as CJS)
import { readFile } from 'fs';
export const someData = 1;

// Top-Level Await in CJS (should be flagged)
await Promise.resolve();

// Import Attributes (Node 22)
// These should be supported in Node 22
import dataJson from './data.json' with { type: 'json' };

module.exports = {
  oldMethod,
  exitProcess,
  filePath,
  dynamicRequire,
  promise,
  resolve,
  reject,
  asyncArray,
  readFile,
  someData,
  dataJson
};
