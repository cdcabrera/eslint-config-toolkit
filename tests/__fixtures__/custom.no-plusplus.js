/**
 * FIXTURE: Validate no-plusplus configuration
 *
 * - 'no-plusplus': [1, { allowForLoopAfterthoughts: true }]
 * - Intent:
 *   - Allow ++/-- only in for-loop afterthoughts
 *   - Disallow standalone increments/decrements elsewhere
 */

// Valid: Allowed in for-loop afterthought
export function validForLoop() {
  for (let i = 0; i < 3; i++) {
    // noop
  }
}

// Invalid: Standalone increment (should be flagged)
export function invalidIncrement() {
  let count = 0;
  count++; // expect warning
  return count;
}

// Valid: Using += 1 instead of ++
export function validIncrement() {
  let count = 0;
  count += 1;
  return count;
}

// Invalid: Pre-decrement outside for-loop (should be flagged)
export function invalidDecrement() {
  let n = 2;
  --n; // expect warning
  return n;
}
