# ESLint Config Toolkit Documentation

Comprehensive usage and in-depth explanations for each configuration.

> **Note:** For installation and basic setup, please refer to the [README.md](./README.md) file.

## Table of Contents

- [Configuration Details](#configuration-details)
  - [Base Configuration](#base-configuration)
  - [Node.js Configuration](#nodejs-configuration)
  - [React Configuration](#react-configuration)
    - [Built-in JSX Scope Tracking (toolkit/jsx-uses-vars)](#built-in-jsx-scope-tracking-toolkitjsx-uses-vars)
    - [Migration and Legacy Interoperability](#migration-and-legacy-interoperability)
  - [JSON Configuration](#json-configuration)
  - [Jest Configuration](#jest-configuration)
  - [Vitest Configuration](#vitest-configuration)
  - [TypeScript Configuration](#typescript-configuration)
- [Advanced Usage](#advanced-usage)
  - [Using Globals](#using-globals)
  - [TypeScript Type Definitions](#typescript-type-definitions)
  - [Prettier Integration](#prettier-integration)
  - [Legacy Configuration](#legacy-configuration)
- [Testing Guide](#testing-guide)
- [Troubleshooting](#troubleshooting)
- [Compatibility](#compatibility)

## Configuration Details

### Base Configuration

The base configuration includes:

- GitIgnore integration (automatically respects your project's .gitignore file)
- ESLint recommended rules
- Unicorn rules for modern JavaScript best practices
- @stylistic plugin rules for consistent code formatting
- Import rules for proper module imports
- Comment length rules for readable comments
- JSDoc rules for documentation

Key features:

- **Stylistic Rules**: A set of 60+ rules from `@stylistic/eslint-plugin` for consistent code formatting
- **GitIgnore Integration**: Automatically excludes files in your `.gitignore`, improving performance and simplifying configuration
- **Control Flow**: Enforces the use of curly braces for all control statements to prevent logic errors and improve readability
- **Import Management**: Enforces proper module import order and prevents circular dependencies
- **Naming Standards**: Enforces a minimum identifier length of 2 characters (with common exceptions like `i`, `j`, `_`) for clarity
- **Documentation**: Requires JSDoc for public APIs with proper parameter and return type documentation

### Node.js Configuration

The Node.js configuration extends the base configuration and adds:

- Node.js specific rules
- Error handling rules
- Code style rules
- Common Node.js globals

Key features:

- **API Safety**: Prevents usage of deprecated Node.js APIs and ensures proper module imports
- **Error Handling**: Configured for CLI tools with appropriate warnings for debugger statements
- **Code Style**: Adjusted for Node.js conventions with appropriate rules for server-side code
- **ES Syntax Validation**: Warns about ES syntax that might not be supported in your Node.js version

Usage example:

```js
// eslint.config.js for a CLI tool
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.node,
  {
    rules: {
      'n/no-process-exit': 0, // Allow process.exit in CLI tools
      'max-len': [2, { code: 240, ignoreUrls: true }], // Longer line length for CLI tools
    }
  }
];
```

### React Configuration

The React configuration extends the base configuration and adds:

- React specific rules
- React Hooks rules
- JSX Accessibility rules
- Common browser globals
- Babel parser for better JSX support
- Built-in JSX component scope tracking (`toolkit/jsx-uses-vars`)

Key features:

- **Component Best Practices**: Enforces React patterns and prevents common React anti-patterns
- **Hooks Validation**: Ensures React Hooks follow the rules of hooks and have proper dependencies
- **Accessibility**: Includes JSX-a11y rules to make your React applications more accessible
- **Babel Integration**: Uses Babel parser for improved JSX syntax support without requiring a Babel config file
- **JSX Scope Tracking**: Automatically marks JSX component identifiers as used and flags undeclared components via built-in `toolkit/jsx-uses-vars`

Usage example:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.react,
  {
    rules: {
      // Custom overrides for your React project
      '@eslint-react/dom-no-dangerously-set-innerhtml': 0,
      '@eslint-react/jsx-no-useless-fragment': 2
    }
  }
];
```

> **Note:** React rules are powered by `@eslint-react/eslint-plugin` under the unified `@eslint-react/*` namespace (replacing legacy `react/*` and `react-hooks/*` plugins). For migration details and legacy plugin coexistence, see [Migration and Legacy Interoperability](#migration-and-legacy-interoperability).

#### Built-in JSX Scope Tracking (toolkit/jsx-uses-vars)

Standard JavaScript and Babel parsers do not track variable references in JSX opening tags. Without tracking, rendered components trigger false-positive `no-unused-vars` errors, and undeclared components bypass `no-undef`.

Instead of requiring the `eslint-plugin-react` package solely for scope tracking, `toolkit.react` embeds a single lightweight rule (`toolkit/jsx-uses-vars`) that replaces three legacy rules:

| Replaced Legacy Rule | Built-in Rule | What It Does |
| :--- | :--- | :--- |
| `react/jsx-uses-vars` | `toolkit/jsx-uses-vars` | Marks JSX components as used (prevents false `no-unused-vars`) |
| `react/jsx-uses-react` | `toolkit/jsx-uses-vars` | Marks `React` as used when referenced in JSX (e.g., `<React.Fragment>`) |
| `react/jsx-no-undef` | `toolkit/jsx-uses-vars` | Flags undeclared JSX components as errors |

##### Why and How to Turn It Off

The rule is enabled as an error (`2`) by default. If your project uses TypeScript with `@typescript-eslint/parser`, TypeScript handles JSX scope tracking natively. You can turn it off in your `eslint.config.js`:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.react,
  {
    rules: {
      'toolkit/jsx-uses-vars': 0 // Turn off when using TypeScript
    }
  }
];
```

#### Migration and Legacy Interoperability

The React configuration uses an explicit allowlist of `@eslint-react/*` rules rather than spreading `@eslint-react/recommended`, avoiding premature React 19 or Compiler constraints.

- **Dropped Rules**: Obsolete rules without an `@eslint-react` or `@stylistic` equivalent are no longer enforced: `react/prop-types`, `react/no-unused-prop-types`, `react/jsx-no-duplicate-props`, `react/no-string-refs`, `react/no-unescaped-entities`, and `react/jsx-fragments` (`element` mode).
- **Stylistic JSX Shorthand Rules**: Boolean prop shorthand (`@stylistic/jsx-shorthand-boolean`) is enforced via `@stylistic/eslint-plugin` v6, while `@stylistic/jsx-shorthand-fragment` is disabled (`0`) to allow explicit `<React.Fragment>`.

##### Enforcing Explicit `<React.Fragment>`
To restore the legacy `react/jsx-fragments` (`element` mode) warning without installing `eslint-plugin-react`, you can configure ESLint's built-in `no-restricted-syntax` rule in your `eslint.config.js`:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';
export default [
  ...toolkit.react,
  {
    rules: {
      // no-restricted-syntax: Set to warning on JSXFragment to prefer <React.Fragment> over <> (replaces react/jsx-fragments 'element')
      'no-restricted-syntax': [
        1,
        {
          selector: 'JSXFragment',
          message: 'Prefer React.Fragment over fragment shorthand.'
        }
      ]
    }
  }
];
```

##### Running Alongside Legacy Plugins

To retain specific legacy `react/*` or `react-hooks/*` rules during an incremental migration, install `eslint-plugin-react` directly in your project and register it:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';
import legacyReact from 'eslint-plugin-react';

export default [
  ...toolkit.react,
  {
    plugins: {
      react: legacyReact
    },
    rules: {
      'react/no-unescaped-entities': 2 // Retain legacy rule during transition
    }
  }
];
```

### JSON Configuration

The JSON configuration includes:

- JSON validation rules
- Syntax error detection
- AST-based syntax error detection and formatting checks
- Built-in support for JSON with Comments and JSON5
- Support for trailing commas in JSONC files and key sorting rules

Key features:

- **Validation**: Catches syntax errors and formatting issues in JSON files
- **Integration**: Works seamlessly with existing ESLint configurations
- **Extensible Rules**: Supports AST-based rules like `json/no-duplicate-keys` and `json/sort-keys`
- **JSONC Support**: Correctly handles comments and trailing commas in `.jsonc` files

### Jest Configuration

The Jest configuration includes:

- Jest-specific rules for test files
- Rules to prevent common testing pitfalls
- Rules to enforce best practices in tests
- Jest globals for test files

Key features:

- **Test Quality**: Prevents disabled or focused tests from being committed
- **Assertion Validation**: Ensures tests contain proper assertions and expectations
- **Naming Consistency**: Enforces unique test titles for better reporting
- **Integration**: Designed to work alongside your main configuration

Usage example:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.base,
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/tests/**/*.js'],
    ...toolkit.jest
  }
];
```

### Vitest Configuration

The Vitest configuration provides specialized linting for Vitest testing code, similar to our Jest configuration but tailored for the Vitest ecosystem.

Key features:

- **Test Quality**: Prevents disabled or focused tests from being committed
- **Assertion Validation**: Ensures tests contain proper assertions and expectations
- **Naming Consistency**: Enforces unique test titles for better reporting
- **Environment**: Provides Vitest-specific globals (`vi`, `describe`, `it`, `expect`, etc.)

Usage example:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.base,
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    ...toolkit.vitest
  }
];
```

### TypeScript Configuration

Provides specialized linting for TypeScript projects using `typescript-eslint`.

Key features:
- **Parser Integration**: Uses `@typescript-eslint/parser` for full type awareness.
- **Smart Resets**: Disables JavaScript rules (like `no-undef`) that TypeScript handles natively.
- **Type Safety**: Enforces consistent type imports and restricts unsafe patterns.

Usage example:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.base,
  ...toolkit.typescript
];
```

## Advanced Usage

### Using Globals

The toolkit exports the `globals` package for easy access to common global variables:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.react,
  {
    languageOptions: {
      globals: {
        ...toolkit.globals.browser,
        ...toolkit.globals.node,
        // Custom globals
        myCustomGlobal: 'readonly'
      }
    }
  }
];
```

You can also import the globals directly:

```js
// eslint.config.js
import { globals } from '@cdcabrera/eslint-config-toolkit';

// Use globals in your configuration
const customGlobals = {
  ...globals.browser,
  ...globals.jest,
  myCustomGlobal: 'readonly'
};
```

Available globals include:
- `globals.browser`: Browser globals (window, document, etc.)
- `globals.node`: Node.js globals (process, __dirname, etc.)
- `globals.jest`: Jest testing globals
- `globals.vitest`: Vitest testing globals
- `globals.jquery`: jQuery globals
- And many more

### TypeScript Type Definitions

In addition to linting TypeScript files via `toolkit.typescript` (see [TypeScript Configuration](#typescript-configuration)), the toolkit includes TypeScript type definitions for consuming the library itself:

- **Better IDE Integration**: Get autocompletion and type checking when using the toolkit
- **Error Prevention**: Catch configuration errors before running ESLint
- **Self-Documenting API**: Understand the toolkit's API through type information

TypeScript types are automatically available when you import the toolkit in a TypeScript project:

```ts
// eslint.config.ts
import toolkit, { base, node, react, globals } from '@cdcabrera/eslint-config-toolkit';

// Type-safe configuration
export default [
  ...toolkit.react,
  {
    rules: {
      'no-console': 'warn',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        myCustomGlobal: 'readonly'
      }
    }
  }
];
```

The type definitions cover all exports from the toolkit, including configuration arrays, utility functions, and the globals object.

To lint TypeScript source files (`.ts`, `.tsx`, `.mts`, `.cts`), include `...toolkit.typescript` in your ESLint configuration as shown in [TypeScript Configuration](#typescript-configuration).

### Prettier Integration

The toolkit provides comprehensive `@stylistic` rules that can serve as an alternative to Prettier, but you may still prefer to use it. Here's how to integrate it:

#### Step 1: Install Prettier and related packages

```bash
# Using npm
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier

# Using yarn
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier

# Using pnpm
pnpm add --save-dev prettier eslint-plugin-prettier eslint-config-prettier
```

#### Step 2: Update your ESLint configuration

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...toolkit.base,  // Or any other toolkit configuration

  // Add Prettier plugin
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': [2, {
        // Your Prettier options
        arrowParens: 'avoid',      // Don't add parentheses around single arrow function parameters
        printWidth: 180,           // Line length where Prettier will try to wrap
        singleQuote: true,         // Use single quotes instead of double quotes
        trailingComma: 'none'      // No trailing commas
      }]
    }
  },

  // Add Prettier config to disable conflicting rules
  ...prettierConfig
];
```

#### Notes on Prettier Integration

1. **Rule Conflicts**: The `eslint-config-prettier` package disables ESLint rules that might conflict with Prettier's formatting.
2. **Stylistic Rules**: When using Prettier, many of the toolkit's stylistic rules will be disabled by `eslint-config-prettier`.
3. **Order Matters**: Make sure to add the Prettier configuration after the toolkit configuration to properly override conflicting rules.
4. **Configuration Options**: You can customize Prettier's behavior by modifying the options in the `'prettier/prettier'` rule.

### Legacy Configuration

If you're using the legacy ESLint configuration format, create an `.eslintrc.js` file:

> **Note:** ESLint supports multiple configuration file formats for both flat config (`.js`, `.mjs`, `.cjs`, `.ts`, etc.) and legacy config (`.eslintrc.js`, `.eslintrc.json`, etc.). See [ESLint documentation](https://eslint.org/docs/latest/use/configure/configuration-files) for details.

```js
// .eslintrc.js
const { FlatCompat } = require('@eslint/compat');
const toolkit = require('@cdcabrera/eslint-config-toolkit');

const compat = new FlatCompat();

// For base JavaScript configuration
module.exports = compat.config(toolkit.base);

// For Node.js projects
module.exports = compat.config(toolkit.node);

// For React projects
module.exports = compat.config(toolkit.react);

// For JSON files
module.exports = compat.config(toolkit.json);

// For Jest testing
module.exports = compat.config(toolkit.jest);

// For Vitest testing
module.exports = compat.config(toolkit.vitest);

// For TypeScript projects
module.exports = compat.config(toolkit.typescript);
```

### Complete Project Examples

Here are comprehensive examples showing how to combine multiple configurations for different project types:

#### React Project with Jest and JSON Support

This example demonstrates a complete configuration for a React project with Jest testing and JSON linting:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  // Base React configuration
  ...toolkit.react,

  // Jest configuration for test files only
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/tests/**/*.js'],
    ...toolkit.jest
  },

  // JSON configuration for JSON files only
  {
    files: ['**/*.json'],
    ...toolkit.json
  },

  // Custom overrides for your project
  {
    rules: {
      // Customize rules for your project needs
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      '@eslint-react/no-missing-key': 'error',
      '@eslint-react/exhaustive-deps': 'warn'
    }
  }
];
```

This configuration:
- Uses the React configuration as the base for all files
- Applies Jest-specific rules only to test files
- Applies JSON-specific rules only to JSON files
- Adds custom rule overrides for the entire project

## Testing Guide

The ESLint Config Toolkit uses Jest for testing, with a focus on snapshot testing to verify that ESLint configurations work as expected.

Agent: For comprehensive testing procedures and detailed guidance, see [Agent Testing](./guidelines/agent_testing.md).

### Test Structure

- **Test Fixtures**: Located in `tests/__fixtures__/`, these files contain code examples that demonstrate specific ESLint rules
- **Test Suites**: Defined in `tests/eslint.test.js`, these group related test cases
- **Snapshots**: Located in `tests/__snapshots__/`, these capture the expected output for each test case

### Running Tests

```bash
# Run unit tests
npm run test:jest

# Run all tests
npm test

# Test specific configurations
npm run test:configs

# Update snapshots when changes are intentional
npm run test:jest-update
```

### Test Types

1. **ESLint Configurations Tests**: Verify that ESLint configurations correctly identify issues
2. **Rule Conflicts Tests**: Verify that configurations resolve conflicts between rules
3. **Rule Customizations Tests**: Verify that custom rule configurations work correctly

## Troubleshooting

This section covers common issues you might encounter when using ESLint Config Toolkit and how to resolve them.

### ESLint Not Finding Configuration

**Issue**: ESLint reports "Cannot find module '@cdcabrera/eslint-config-toolkit'" or similar errors.

**Solution**:
1. Ensure the package is installed correctly: `npm ls @cdcabrera/eslint-config-toolkit`
2. Check that you're using the correct import syntax for your environment:
   - For ESM: `import toolkit from '@cdcabrera/eslint-config-toolkit';`
   - For CommonJS: `const toolkit = require('@cdcabrera/eslint-config-toolkit');`
3. Verify your Node.js version as required by the toolkit [package.json engine](./package.json)

### Rules Not Working as Expected

**Issue**: Some ESLint rules don't seem to be working or are reporting unexpected errors.

**Solution**:
1. Check for rule conflicts by running: `eslint --print-config path/to/your/file.js`
2. Ensure you're not overriding rules unintentionally in your configuration
3. Verify that the correct configuration is being applied to your files
4. Ensure your `eslint.config.js` includes the appropriate file patterns for your project


### Performance Issues

**Issue**: ESLint is running slowly on your project.

**Solution**:
1. Use the `--cache` flag to speed up subsequent runs: `eslint --cache .`
2. Add large generated directories to your `.gitignore` file (they'll be automatically ignored by the toolkit)
3. Consider using more specific glob patterns to lint only the necessary files
4. For large projects, consider using ESLint's `--max-warnings` flag to focus on critical issues first

### TypeScript-Related Issues

**Issue**: Confusion about TypeScript linting support.

**Solution**:
1. This toolkit provides built-in TypeScript support via `toolkit.typescript`.
2. To use it, simply extend your configuration:
   ```js
   // eslint.config.js
   import toolkit from '@cdcabrera/eslint-config-toolkit';

   export default [
     ...toolkit.base,
     ...toolkit.typescript
   ];
   ```
3. Type definitions for the toolkit itself are also provided.

## Compatibility

This section provides information about compatibility with different ESLint versions and related tools.

### ESLint Version Compatibility

| ESLint Config Toolkit | ESLint  | Node.js  |
|-----------------------|---------|----------|
| 0.1.x                 | ≥ 9.0.0 | ≥ 20.0.0 |
| 1.x.x                 | ≥ 9.0.0 | ≥ 22.0.0 |

### Configuration Format Compatibility

| Configuration Format             | Supported | Notes                                                                           |
|----------------------------------|-----------|---------------------------------------------------------------------------------|
| Flat Config (eslint.config.js)   | ✅        | Recommended format, full support                                                |
| Legacy Config (.eslintrc.*)      | ✅        | Supported via @eslint/compat, see [Legacy Configuration](#legacy-configuration) |

### Plugin Compatibility

The toolkit includes and is compatible with the following plugins:

| Plugin                       | Purpose                      |
|------------------------------|------------------------------|
| @stylistic/eslint-plugin     | Code style rules             |
| eslint-plugin-import         | Import/export rules          |
| eslint-plugin-comment-length | Comment formatting           |
| eslint-plugin-jsdoc          | Documentation rules          |
| eslint-plugin-n              | Node.js rules                |
| @eslint-react/eslint-plugin  | Modern React rules           |
| toolkit (built-in)           | JSX scope tracking rules     |
| eslint-plugin-jsx-a11y       | Accessibility rules          |
| eslint-plugin-jest           | Jest testing rules           |
| @vitest/eslint-plugin        | Vitest testing rules         |
| typescript-eslint            | TypeScript support           |
| @eslint/json                 | JSON, JSONC, & JSON5 support |
| eslint-plugin-unicorn        | Modern best-practice rules   |

## Contributing

For information on contributing to this project, including development setup, testing procedures, and release process, see [CONTRIBUTING.md](./CONTRIBUTING.md).
