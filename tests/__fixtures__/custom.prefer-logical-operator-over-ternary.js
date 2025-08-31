/**
 * FIXTURE: Prefer logical operator over ternary in simple fallbacks
 *
 * Rule under test:
 * - 'unicorn/prefer-logical-operator-over-ternary': 2
 *
 * Intent:
 * - Prefer logical operators (|| or ??) over simple fallback ternaries
 * - Show valid examples using both || and ?? where appropriate
 */

// Invalid (should be transformed to a logical operator): simple fallback ternary
export function fallbackWithTernary(value) {
  // val ? val : 'x' -> val || 'x' (or val ?? 'x' depending on intent)
  const label = value ? value : 'Unknown'; // expect replacement suggestion
  return label;
}

// Valid: use || when any falsy should fall back ('' and 0 should fall back)
export function preferOr(value) {
  const label = value || 'Unknown';
  return label;
}

// Valid: use ?? when only null/undefined should fall back ('' and 0 should be kept)
export function preferNullish(count) {
  const safeCount = count ?? 10; // 0 remains 0; only null/undefined fall back to 10
  return safeCount;
}

// Another invalid ternary to exercise the rule again
export function fallbackNumberTernary(n) {
  // n ? n : 42 -> n || 42 (or n ?? 42 depending on intent)
  return n ? n : 42; // expect replacement suggestion
}
