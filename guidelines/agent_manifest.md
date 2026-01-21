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
