// FIXTURE: This file demonstrates the spacing-related stylistic rules
// These rules ensure consistent spacing in various code constructs

// @stylistic/arrow-spacing - Require space before/after arrow function's arrow
// Correct: () => {}
// Incorrect: ()=>{}
const arrowWithCorrectSpacing = () => {
  return 'correct spacing';
};
// This would be incorrect: const arrowWithIncorrectSpacing = ()=>{return 'incorrect spacing';};

// @stylistic/block-spacing - Require space inside curly braces
// Correct: function foo() { return true; }
// Incorrect: function foo() {return true;}
function blockWithCorrectSpacing() { return true; }
// This would be incorrect: function blockWithIncorrectSpacing(){return true;}

// @stylistic/comma-spacing - Require space after comma, no space before
// Correct: const arr = [1, 2, 3];
// Incorrect: const arr = [1 ,2 , 3];
const arrayWithCorrectCommaSpacing = [1, 2, 3, 4];
// This would be incorrect: const arrayWithIncorrectCommaSpacing = [1 ,2,3 , 4];

// @stylistic/computed-property-spacing - No space inside brackets in computed properties
// Correct: obj[prop]
// Incorrect: obj[ prop ]
const obj = { prop: 'value' };
const computedPropertyCorrect = obj['prop'];
// This would be incorrect: const computedPropertyIncorrect = obj[ 'prop' ];

// @stylistic/key-spacing - Require space after colon in object literals, no space before
// Correct: { key: value }
// Incorrect: { key:value } or { key : value }
const objectWithCorrectKeySpacing = { key: 'value', another: 'value' };
// This would be incorrect: const objectWithIncorrectKeySpacing = { key:'value', another : 'value' };

// @stylistic/keyword-spacing - Require space before/after keywords
// Correct: if (condition) { ... }
// Incorrect: if(condition) { ... }
function keywordSpacingExample() {
  if (true) {
    return 'correct';
  } else {
    return 'also correct';
  }
}
// This would be incorrect: function keywordSpacingIncorrect() {if(true) {return 'incorrect';} else{return 'also incorrect';}}

// @stylistic/no-multi-spaces - No multiple spaces
// Correct: const x = 1;
// Incorrect: const x =  1;
const noMultiSpacesCorrect = 1;
// This would be incorrect: const noMultiSpacesIncorrect =  1;

// @stylistic/object-curly-spacing - Require space inside curly braces in object literals
// Correct: { foo: 'bar' }
// Incorrect: {foo: 'bar'}
const objectCurlySpacingCorrect = { foo: 'bar' };
// This would be incorrect: const objectCurlySpacingIncorrect = {foo: 'bar'};

// @stylistic/rest-spread-spacing - No space between rest/spread operator and expression
// Correct: ...spread
// Incorrect: ... spread
const restSpreadCorrect = (...args) => args;
const spreadCorrect = [...arrayWithCorrectCommaSpacing];
// This would be incorrect: const restSpreadIncorrect = (... args) => args;
// This would be incorrect: const spreadIncorrect = [... arrayWithCorrectCommaSpacing];

// @stylistic/space-before-blocks - Require space before blocks
// Correct: function foo() {}
// Incorrect: function foo(){}
function spaceBeforeBlocksCorrect() {
  // Code here
}
// This would be incorrect: function spaceBeforeBlocksIncorrect(){/* Code here */}

// @stylistic/space-before-function-paren - Require space before function parentheses for anonymous and async arrow functions, no space for named functions
// Correct: function foo() {} and function (arg) {}
// Incorrect: function foo () {} and function(arg) {}
function spaceBeforeFunctionParenCorrect() {
  return 'correct';
}
const anonymousFunctionCorrect = function (arg) {
  return arg;
};
const asyncArrowFunctionCorrect = async (arg) => arg;
// This would be incorrect: function spaceBeforeFunctionParenIncorrect () { return 'incorrect'; }
// This would be incorrect: const anonymousFunctionIncorrect = function(arg) { return arg; };
// This would be incorrect: const asyncArrowFunctionIncorrect = async(arg) => arg;

// @stylistic/space-in-parens - No space inside parentheses
// Correct: foo('bar')
// Incorrect: foo( 'bar' )
function spaceInParensCorrect(arg) {
  return arg;
}
// This would be incorrect: function spaceInParensIncorrect( arg ) { return arg; }

// @stylistic/space-infix-ops - Require space around infix operators
// Correct: a + b
// Incorrect: a+b
const spaceInfixOpsCorrect = 1 + 2;
// This would be incorrect: const spaceInfixOpsIncorrect = 1+2;

// @stylistic/space-unary-ops - Require space after word operators, no space after non-word operators
// Correct: typeof foo, !foo
// Incorrect: typeof!foo, ! foo
const unaryWordCorrect = typeof obj;
const unaryNonWordCorrect = !obj;
// This would be incorrect: const unaryWordIncorrect = typeof(obj); // without space
// This would be incorrect: const unaryNonWordIncorrect = ! obj; // with space

// @stylistic/spaced-comment - Require space after comment marker
// Correct: // Comment
// Incorrect: //Comment
// This is a correct comment

// @stylistic/template-curly-spacing - No space inside curly braces in template literals
// Correct: `${foo}`
// Incorrect: `${ foo }`
const templateCurlySpacingCorrect = `${noMultiSpacesCorrect}`;
// This would be incorrect: const templateCurlySpacingIncorrect = `${ noMultiSpacesCorrect }`;

// @stylistic/template-tag-spacing - No space between template tag and template literal
// Correct: tag`Hello`
// Incorrect: tag `Hello`
function tag(strings) {
  return strings[0];
}
const templateTagSpacingCorrect = tag`Hello`;
// This would be incorrect: const templateTagSpacingIncorrect = tag `Hello`;

module.exports = {
  arrowWithCorrectSpacing,
  blockWithCorrectSpacing,
  arrayWithCorrectCommaSpacing,
  computedPropertyCorrect,
  objectWithCorrectKeySpacing,
  keywordSpacingExample,
  noMultiSpacesCorrect,
  objectCurlySpacingCorrect,
  restSpreadCorrect,
  spreadCorrect,
  spaceBeforeBlocksCorrect,
  spaceBeforeFunctionParenCorrect,
  anonymousFunctionCorrect,
  asyncArrowFunctionCorrect,
  spaceInParensCorrect,
  spaceInfixOpsCorrect,
  unaryWordCorrect,
  unaryNonWordCorrect,
  templateCurlySpacingCorrect,
  templateTagSpacingCorrect
};
