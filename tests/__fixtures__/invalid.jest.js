// FIXTURE: This file contains intentional linting issues to test the Jest configuration

// Jest test with no expect (should trigger jest/expect-expect)
test('this test has no expectations', () => {
  const value = 1 + 1;
  // Missing expect statement
});

// Jest test with focused test (should trigger jest/no-focused-tests)
test.only('this is a focused test', () => {
  expect(1 + 1).toBe(2);
});

// Jest test with disabled test (should trigger jest/no-disabled-tests)
test.skip('this is a disabled test', () => {
  expect(true).toBe(true);
});

// Jest test with identical title (should trigger jest/no-identical-title)
test('duplicate test title', () => {
  expect(1).toBe(1);
});

test('duplicate test title', () => {
  expect(2).toBe(2);
});

// Jest test with invalid expect usage (should trigger jest/valid-expect)
test('invalid expect usage', () => {
  expect();
});

// Jest test with multiple expects but no assertions (should trigger jest/expect-expect)
describe('test group', () => {
  it('should do something', () => {
    const mockFn = jest.fn();
    mockFn();
    // Missing expect statement
  });
});

// Export something to avoid unused file warnings
module.exports = {
  dummyFunction: () => 'This is a dummy function'
};
