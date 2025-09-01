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
  - [Prettier Integration](#prettier-integration)
  - [Legacy Configuration](#legacy-configuration)
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
- **Import Management**: Enforces proper module import order and prevents circular dependencies
- **Documentation**: Requires JSDoc for public APIs with proper parameter and return type documentation

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

### JSON Configuration

The JSON configuration includes:

- JSON validation rules
- Syntax error detection
- Formatting consistency checks
- Compatibility with the GitIgnore integration

Key features:

- **Validation**: Catches syntax errors and formatting issues in JSON files
- **Performance**: Automatically ignores `package-lock.json` and files in `node_modules`
- **Integration**: Works seamlessly with existing ESLint configurations
- **Simplicity**: Provides reliable JSON validation without complex setup

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

Key features:

- **Component Best Practices**: Enforces React patterns and prevents common React anti-patterns
- **Hooks Validation**: Ensures React Hooks follow the rules of hooks and have proper dependencies
- **Accessibility**: Includes JSX-a11y rules to make your React applications more accessible
- **Babel Integration**: Uses Babel parser for improved JSX syntax support without requiring a Babel config file

Usage example:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.react,
  {
    rules: {
      // Custom overrides for your React project
      'react/jsx-no-bind': [1, { allowArrowFunctions: true }],
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }]
    }
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
      'react/prop-types': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
```

This configuration:
- Uses the React configuration as the base for all files
- Applies Jest-specific rules only to test files
- Applies JSON-specific rules only to JSON files
- Adds custom rule overrides for the entire project

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

| ESLint Config Toolkit | ESLint  | Node.js  |
|-----------------------|---------|----------|
| 0.1.x                 | ≥ 9.0.0 | ≥ 20.0.0 |

### Configuration Format Compatibility

| Configuration Format             | Supported | Notes                                                                           |
|----------------------------------|-----------|---------------------------------------------------------------------------------|
| Flat Config (eslint.config.js)   | ✅        | Recommended format, full support                                                |
| Legacy Config (.eslintrc.*)      | ✅        | Supported via @eslint/compat, see [Legacy Configuration](#legacy-configuration) |

### Plugin Compatibility

The toolkit includes and is compatible with the following plugins:

| Plugin                       | Version   | Purpose                    |
|------------------------------|-----------|----------------------------|
| @stylistic/eslint-plugin     | ≥ 5.2.2   | Code style rules           |
| eslint-plugin-import         | ≥ 2.32.0  | Import/export rules        |
| eslint-plugin-comment-length | ≥ 2.2.2   | Comment formatting         |
| eslint-plugin-jsdoc          | ≥ 51.4.1  | Documentation rules        |
| eslint-plugin-n              | ≥ 17.21.0 | Node.js rules              |
| eslint-plugin-react          | ≥ 7.37.5  | React rules                |
| eslint-plugin-react-hooks    | ≥ 5.2.0   | React Hooks rules          |
| eslint-plugin-jsx-a11y       | ≥ 6.10.2  | Accessibility rules        |
| eslint-plugin-jest           | ≥ 29.0.1  | Jest testing rules         |
| eslint-plugin-json           | ≥ 4.0.1   | JSON linting               |
| eslint-plugin-unicorn        | ≥ 60.0.0  | Modern best-practice rules |

## Contributing

For information on contributing to this project, including development setup, testing procedures, and release process, see [CONTRIBUTING.md](./CONTRIBUTING.md).
