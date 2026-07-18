// FIXTURE: This file contains intentional linting issues to test the Vitest configuration

// Vitest test with no expect (should trigger vitest/expect-expect)
test('this test has no expectations', () => {
  const value = 1 + 1;
  // Missing expect statement
});

// Vitest test with focused test (should trigger vitest/no-focused-tests)
test.only('this is a focused test', () => {
  expect(1 + 1).toBe(2);
});

// Vitest test with disabled test (should trigger vitest/no-disabled-tests)
test.skip('this is a disabled test', () => {
  expect(true).toBe(true);
});

// Vitest test with identical title (should trigger vitest/no-identical-title)
test('duplicate test title', () => {
  expect(1).toBe(1);
});

test('duplicate test title', () => {
  expect(2).toBe(2);
});

// Vitest test with invalid expect usage (should trigger vitest/valid-expect)
test('invalid expect usage', () => {
  expect();
});

// Vitest test with multiple expects but no assertions (should trigger vitest/expect-expect)
describe('test group', () => {
  it('should do something', () => {
    const mockFn = vi.fn();
    mockFn();
    // Missing expect statement
  });
});

// Export something to avoid unused file warnings
export default {
  dummyFunction: () => 'This is a dummy function'
};
