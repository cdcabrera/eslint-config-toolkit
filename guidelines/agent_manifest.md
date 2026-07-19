# Problematic Rules Manifest

This manifest serves as a central registry for rules and APIs that have historically caused configuration issues, conflicts, or required significant research to implement correctly.

## Manifest Maintenance Principles

- **Canonical Focus**: Only document rules and APIs that are actively configured within the toolkit.
- **Instance Independence**: Do not reference local, gitignored directories (e.g., `.agent/`) or instance-specific research notes. All mandatory logic must be self-contained or reference public documentation.

## @stylistic/no-extra-parens

- **Issues**: Prone to key-name confusion (`ignoredNodes` vs `ignoreNodes`) and fails to handle nested expressions with simple child selectors.
- **Mandatory Logic/Configuration**:
  - **Correct Key**: Always use `ignoredNodes` (with a 'd'). Do not use `ignoreNodes` even if suggested by upstream deprecation warnings.
  - **Selector Strategy**: Use attribute-based parent selectors (e.g., `SpreadElement[argument.type="LogicalExpression"]`) rather than child combinators (`>`). Parent selectors trigger a "subtree ignore," which is necessary to prevent warnings on nested expressions within the target node.

## n/no-unsupported-features/es-syntax

- **Mandatory Logic**: The `version` field must always be synchronized with the `engines.node` field in the root `package.json`.

## toolkit/jsx-uses-vars

- **Issues**: Standard JS parsers (`espree`, `@babel/eslint-parser`) do not generate scope references for `JSXOpeningElement`, causing false-positive `no-unused-vars` diagnostics on declared components and silent misses on undeclared tags (`no-undef`).
- **Mandatory Logic/Configuration**:
  - **Registration & Severity**: Must remain enabled with severity `2` (`error`) under the `toolkit` namespace in `configs/react.js`. Consolidates `react/jsx-uses-vars`, `react/jsx-uses-react` (automatic runtime assumed), and `react/jsx-no-undef` without re-introducing `eslint-plugin-react`.
  - **AST Traversal**: Inspect `JSXOpeningElement` and resolve nested member expressions to root identifiers (`<UI.Button />` -> `UI`).
  - **Exclusions**: Skip intrinsic lowercase elements (`/^[a-z]/`), `<this.Component>`, and `JSXNamespacedName` (`<svg:rect>`), but retain lowercase member expressions (`<components.button />`).
  - **Scope Resolution**: Use modern `sourceCode.getScope()` and `sourceCode.markVariableAsUsed()` (avoid deprecated `context` APIs); traverse `scope.upper` against `scope.set` to check globals before emitting undeclared diagnostics.
  - **TypeScript Interoperability**: Safe to disable (`0`) under `@typescript-eslint/parser` as TypeScript handles JSX scopes natively.

Last updated: November 22, 2026
