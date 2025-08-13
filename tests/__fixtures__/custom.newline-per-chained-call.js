// FIXTURE: This file demonstrates the @stylistic/newline-per-chained-call rule configuration
// The rule has been configured with ignoreChainWithDepth: 4 to allow up to 4 method calls in a chain
// without requiring line breaks

// Example of a class with methods that can be chained
class ChainableExample {
  constructor(value) {
    this.value = value;
  }

  method1() {
    this.value += 1;
    return this;
  }

  method2() {
    this.value *= 2;
    return this;
  }

  method3() {
    this.value -= 3;
    return this;
  }

  method4() {
    this.value /= 4;
    return this;
  }

  method5() {
    this.value += 5;
    return this;
  }

  getValue() {
    return this.value;
  }
}

// Examples of allowed chained calls (up to 4 methods in a chain)
function allowedChainExamples() {
  const example1 = new ChainableExample(10);

  // 2 methods in chain - allowed
  const result1 = example1.method1().method2();

  // 3 methods in chain - allowed
  const result2 = example1.method1().method2().method3();

  // 4 methods in chain - allowed with ignoreChainWithDepth: 4
  const result3 = example1.method1().method2().method3().method4();

  return { result1, result2, result3 };
}

// Examples that would require line breaks (more than 4 methods in a chain)
// In a real codebase, these would need to be formatted with line breaks
// to comply with the rule, but are shown here as examples of what would
// trigger the rule
function examplesThatRequireLineBreaks() {
  const example2 = new ChainableExample(20);

  // 5 methods in chain - would require line breaks
  // This is shown as an example of what would trigger the rule
  // In a real codebase, this would need to be formatted as:
  // const result4 = example2
  //   .method1()
  //   .method2()
  //   .method3()
  //   .method4()
  //   .method5();
  const result4 = example2.method1().method2().method3().method4().method5();

  return { result4 };
}

// Examples with array and object methods
function arrayAndObjectExamples() {
  // Array methods - 4 in chain is allowed
  const array = [1, 2, 3, 4, 5];
  const arrayResult = array.filter(n => n > 1).map(n => n * 2).reduce((a, b) => a + b, 0).toString();

  // Object methods with 4 in chain is allowed
  const obj = { a: 1, b: 2, c: 3 };
  const objResult = Object.entries(obj).map(([k, v]) => [k, v * 2]).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  return { arrayResult, objResult };
}

module.exports = {
  ChainableExample,
  allowedChainExamples,
  examplesThatRequireLineBreaks,
  arrayAndObjectExamples
};
