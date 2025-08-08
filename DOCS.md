# ESLint Config Toolkit Documentation

Comprehensive usage and in-depth explanations for each configuration.

> **Note:** For installation and basic setup, please refer to the [README.md](./README.md) file.

## Table of Contents

- [Configuration Details](#configuration-details)
  - [Base Configuration](#base-configuration)
  - [Node.js Configuration](#nodejs-configuration)
  - [React Configuration](#react-configuration)
  - [JSON Configuration](#json-configuration)
  - [Jest Configuration](#jest-configuration)
- [Advanced Usage](#advanced-usage)
  - [Using Globals](#using-globals)
  - [TypeScript Type Definitions](#typescript-type-definitions)
  - [Legacy Configuration](#legacy-configuration)
- [Troubleshooting](#troubleshooting)
- [Compatibility](#compatibility)

## Configuration Details

### Base Configuration

The base configuration includes:

- ESLint recommended rules
- Stylistic rules for consistent code formatting
- Import rules for proper module imports
- Comment length rules for readable comments
- JSDoc rules for documentation
- Prettier integration (requires prettier to be installed)
- GitIgnore integration (automatically respects your project's .gitignore file)

#### GitIgnore Integration

The GitIgnore integration is a powerful feature that automatically excludes files and directories specified in your project's `.gitignore` file from being linted. This provides several benefits:

- **Consistency**: Ensures that files ignored by Git are also ignored by ESLint
- **Performance**: Improves linting speed by skipping files that don't need to be linted (like build artifacts, node_modules, etc.)
- **Simplicity**: No need to maintain separate ignore patterns for Git and ESLint

This integration is implemented using the `includeIgnoreFile` function from the `@eslint/compat` package, which is included as a dependency of this toolkit.

### Node.js Configuration

The Node.js configuration extends the base configuration and adds:

- Node.js specific rules
- Error handling rules
- Code style rules
- JSDoc adjustments
- Common Node.js globals

#### Node.js Specific Rules

The Node.js configuration includes rules from `eslint-plugin-n` that help ensure your Node.js code follows best practices:

- **`n/no-deprecated-api`**: Prevents usage of deprecated Node.js APIs
- **`n/no-missing-require`**: Ensures all required modules exist
- **`n/no-unpublished-require`**: Ensures required modules are listed in package.json
- **`n/no-unpublished-bin`**: Allows unpublished bin files (useful for CLI tools)
- **`n/no-unsupported-features/es-syntax`**: Warns about ES syntax that might not be supported in your Node.js version
- **`n/no-process-exit`**: Warns about using process.exit() (can be overridden for CLI tools)
- **`n/no-path-concat`**: Prevents string concatenation with __dirname and __filename
- **`n/global-require`**: Ensures require() calls are at the top level

#### Error Handling and Code Style

The configuration includes additional rules that are particularly useful for Node.js applications and CLI tools:

- **Error Handling**:
  - `no-empty`: Configured to allow empty catch blocks, which is common in CLI tools
  - `no-debugger`: Set as a warning to discourage debugger statements in production code

- **Code Style**:
  - `no-plusplus`: Turned off to allow increment/decrement operators
  - `no-var`: Set to error to enforce using let/const instead of var
  - `consistent-return`: Set as a warning to encourage consistent return statements
  - `padded-blocks`: Turned off to allow padding within blocks

#### Customizing for CLI Tools

For CLI tools, you might want to override certain rules. Here's an example:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.node,
  {
    rules: {
      // Override rules for CLI tools
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

#### Babel Parser Integration

The React configuration uses the Babel parser (`@babel/eslint-parser`) for improved JSX syntax support. This provides several benefits:

- Better parsing of modern JavaScript features
- Improved JSX syntax handling
- Support for experimental syntax with appropriate presets
- Consistent parsing with your Babel build configuration

The parser is configured to work without requiring a Babel configuration file, making it easier to use in projects that don't have a specific Babel setup.

### JSON Configuration

The JSON configuration includes:

- JSON validation rules
- Syntax error detection
- Formatting consistency checks
- Compatibility with the GitIgnore integration
- Prettier integration for consistent formatting

The JSON configuration uses the `eslint-plugin-json` package, which provides a processor-based approach to linting JSON files. This approach is more compatible with existing ESLint configurations and provides reliable JSON validation without complex setup.

The configuration automatically ignores `package-lock.json` and files in `node_modules` to improve performance and focus on the JSON files that matter for your project.

### Jest Configuration

The Jest configuration includes:

- Jest-specific rules for test files
- Rules to prevent common testing pitfalls
- Rules to enforce best practices in tests
- Jest globals for test files

The Jest configuration is designed to be used alongside your main configuration (Base, Node.js, or React) to provide specialized linting for test files. It includes rules that help catch common issues in Jest tests:

- **`jest/no-disabled-tests`**: Warns about disabled tests to prevent them from being forgotten
- **`jest/no-focused-tests`**: Prevents committing focused tests that would skip other tests in CI
- **`jest/no-identical-title`**: Ensures test titles are unique for better test reporting
- **`jest/valid-expect`**: Ensures expect() is used correctly
- **`jest/expect-expect`**: Ensures tests contain at least one assertion

#### Using Jest Configuration

You can use the Jest configuration alongside your main configuration:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.base, // or toolkit.node, or toolkit.react
  ...toolkit.jest,
  // Your custom overrides
];
```

You can also target Jest configuration only to test files:

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
- `globals.jquery`: jQuery globals
- And many more

### TypeScript Type Definitions

The toolkit includes TypeScript type definitions for consuming the library itself. Note that this toolkit does not provide support for linting TypeScript files - it only includes type definitions that provide the following benefits when using the toolkit:

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

If you need to lint TypeScript files in your project, you would need to add additional ESLint plugins such as `@typescript-eslint/eslint-plugin` and configure them alongside this toolkit.

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
```

## Troubleshooting

This section covers common issues you might encounter when using ESLint Config Toolkit and how to resolve them.

### ESLint Not Finding Configuration

**Issue**: ESLint reports "Cannot find module '@cdcabrera/eslint-config-toolkit'" or similar errors.

**Solution**:
1. Ensure the package is installed correctly: `npm ls @cdcabrera/eslint-config-toolkit`
2. Check that you're using the correct import syntax for your environment:
   - For ESM: `import toolkit from '@cdcabrera/eslint-config-toolkit';`
   - For CommonJS: `const toolkit = require('@cdcabrera/eslint-config-toolkit');`
3. Verify your Node.js version is 20+ as required by the toolkit

### Rules Not Working as Expected

**Issue**: Some ESLint rules don't seem to be working or are reporting unexpected errors.

**Solution**:
1. Check for rule conflicts by running: `eslint --print-config path/to/your/file.js`
2. Ensure you're not overriding rules unintentionally in your configuration
3. Verify that the correct configuration is being applied to your files
4. Check if you need to add specific file extensions to your ESLint command: `eslint --ext .js,.jsx,.json .`

### Prettier Integration Issues

**Issue**: Conflicts between ESLint and Prettier formatting rules.

**Solution**:
1. Ensure both eslint and prettier are installed
2. Check that you're not overriding Prettier rules in your custom configuration
3. Run Prettier first, then ESLint: `npx prettier --write . && npx eslint --fix .`
4. If using VS Code, ensure the ESLint and Prettier extensions are configured correctly

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
1. Remember that this toolkit provides TypeScript type definitions for consuming the toolkit itself, but does not lint TypeScript files
2. To lint TypeScript files, install and configure additional packages:
   ```bash
   npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```
3. Then extend your configuration:
   ```js
   // eslint.config.js
   import toolkit from '@cdcabrera/eslint-config-toolkit';
   import tseslint from '@typescript-eslint/eslint-plugin';
   import tsparser from '@typescript-eslint/parser';
   
   export default [
     ...toolkit.base,
     {
       files: ['**/*.ts', '**/*.tsx'],
       plugins: { '@typescript-eslint': tseslint },
       languageOptions: {
         parser: tsparser,
       },
       rules: {
         // TypeScript-specific rules
       }
     }
   ];
   ```

## Compatibility

This section provides information about compatibility with different ESLint versions and related tools.

### ESLint Version Compatibility

| ESLint Config Toolkit | ESLint  | Prettier | Node.js  |
|-----------------------|---------|----------|----------|
| 0.1.x                 | ≥ 9.0.0 | ≥ 3.0.0  | ≥ 20.0.0 |

### Configuration Format Compatibility

| Configuration Format             | Supported | Notes                                                                           |
|----------------------------------|-----------|---------------------------------------------------------------------------------|
| Flat Config (eslint.config.js)   | ✅        | Recommended format, full support                                                |
| Legacy Config (.eslintrc.*)      | ✅        | Supported via @eslint/compat, see [Legacy Configuration](#legacy-configuration) |

### Plugin Compatibility

The toolkit includes and is compatible with the following plugins:

| Plugin                       | Version   | Purpose                                |
|------------------------------|-----------|----------------------------------------|
| @stylistic/eslint-plugin     | ≥ 5.2.2   | Code style rules                       |
| eslint-plugin-import         | ≥ 2.32.0  | Import/export rules                    |
| eslint-plugin-comment-length | ≥ 2.2.2   | Comment formatting                     |
| eslint-plugin-jsdoc          | ≥ 51.4.1  | Documentation rules                    |
| eslint-plugin-prettier       | ≥ 5.5.3   | Prettier integration                   |
| eslint-plugin-n              | ≥ 17.21.0 | Node.js rules                          |
| eslint-plugin-react          | ≥ 7.37.5  | React rules                            |
| eslint-plugin-react-hooks    | ≥ 5.2.0   | React Hooks rules                      |
| eslint-plugin-jsx-a11y       | ≥ 6.10.2  | Accessibility rules                    |
| eslint-plugin-jest           | ≥ 29.0.1  | Jest testing rules                     |
| eslint-plugin-json           | ≥ 4.0.1   | JSON linting                           |

## Contributing

For information on contributing to this project, including development setup, testing procedures, and release process, see [CONTRIBUTING.md](./CONTRIBUTING.md).
