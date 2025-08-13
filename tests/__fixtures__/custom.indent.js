// FIXTURE: This file demonstrates the expanded @stylistic/indent rule configuration
// The rule ensures consistent indentation across different code constructs

// Array expressions with proper indentation
const array = [
  'item1',
  'item2',
  'item3'
];

// Call expressions with proper argument indentation
function exampleFunction(
  param1,
  param2,
  param3
) {
  return param1 + param2 + param3;
}

// Function declarations with proper parameter indentation
function multipleParams(
  param1,
  param2,
  param3
) {
  const result = param1 + param2 + param3;

  return result;
}

// Function expressions with proper parameter indentation
const arrowFunction = (
  param1,
  param2,
  param3
) => {
  return param1 + param2 + param3;
};

// Import declarations with proper indentation
// In a real file, this would be at the top
// import {
//   Component1,
//   Component2,
//   Component3
// } from 'package';

// Object expressions with proper indentation
const object = {
  property1: 'value1',
  property2: 'value2',
  property3: 'value3'
};

// Switch case with proper indentation
function switchExample(value) {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    default:
      return 'other';
  }
}

// Variable declarators with proper indentation
const var1 = 1,
  var2 = 2,
  var3 = 3;

// Nested structures with proper indentation
function complexExample() {
  const result = [
    {
      name: 'item1',
      values: [
        1,
        2,
        3
      ]
    },
    {
      name: 'item2',
      values: [
        4,
        5,
        6
      ]
    }
  ];

  return result;
}

module.exports = {
  array,
  exampleFunction,
  multipleParams,
  arrowFunction,
  object,
  switchExample,
  var1,
  var2,
  var3,
  complexExample
};
