# ESLint Config Toolkit

[![License](https://img.shields.io/github/license/cdcabrera/eslint-config-toolkit.svg)](https://github.com/cdcabrera/eslint-config-toolkit/blob/main/LICENSE)

An ESLint multipurpose config collection.

## Features

Includes...
- **Modern JavaScript Support**: Configured for ES6+ syntax
- **Stylistic Rules**: Comprehensive code formatting with @stylistic plugin
- **Accessibility**: Includes JSX accessibility rules
- **Best Practices**: Enforces coding standards and best practices
- **GitIgnore Integration**: Automatically respects your project's .gitignore file
- **TypeScript Type Definitions**: Type definitions for consuming the toolkit (not for linting TypeScript files)

And configuration for...
- **Base Configuration**: Core JavaScript rules for any project
- **Node.js Configuration**: Specific rules for Node.js projects
- **React Configuration**: Specific rules for React projects
- **JSON Configuration**: Specific rules for JSON files
- **Jest Configuration**: Specific rules for Jest testing

## Requirements
The basic requirements:
- [NodeJS version 20+](https://nodejs.org/)

## Installation

Toolkit has **one required peer dependency**:
- **eslint**: The core ESLint package (>=9)

```bash
# Using npm
npm install --save-dev @cdcabrera/eslint-config-toolkit eslint

# Using yarn
yarn add --dev @cdcabrera/eslint-config-toolkit eslint

# Using pnpm
pnpm add --save-dev @cdcabrera/eslint-config-toolkit eslint
```

## Getting Started

This section will guide you through setting up ESLint with this toolkit in your project.

### Step 1: Create a configuration file

Create an `eslint.config.js` file in your project root:

> **Note:** ESLint supports multiple configuration file formats including `.js`, `.mjs`, `.cjs`, and TypeScript variants. See [ESLint documentation](https://eslint.org/docs/latest/use/configure/configuration-files) for details.

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

// Choose the configuration that best fits your project
export default toolkit.base;  // For basic JavaScript projects
// OR
export default toolkit.node;  // For Node.js projects
// OR
export default toolkit.react; // For React projects
```

### Step 2: Add NPM scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Step 3: Run ESLint

Run ESLint to check your code:

```bash
npm run lint
```

Or automatically fix issues where possible:

```bash
npm run lint:fix
```

## More Examples

### Combining Configurations

You can combine multiple configurations for more complex projects:

```js
// eslint.config.js
import toolkit from '@cdcabrera/eslint-config-toolkit';

export default [
  ...toolkit.base,
  ...toolkit.jest,  // Add Jest configuration for test files
  {
    // Add your custom overrides
    rules: {
      'no-console': 'warn',
    }
  }
];
```

### Complete Project Example

Here's a complete example for a React project with Jest testing:

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

For more configuration options, detailed examples, and advanced usage, see the [Configuration Details](./DOCS.md#configuration-details) and [Advanced Usage](./DOCS.md#advanced-usage) sections in DOCS.md.

### Legacy Configuration

If you're using the legacy ESLint configuration format, see the [Legacy Configuration section in DOCS.md](./DOCS.md#legacy-configuration) for detailed examples.

## Documentation

For detailed documentation, including configuration details, advanced usage examples, and development information, see [DOCS.md](./DOCS.md).

## Contributing

Contributing? Guidelines can be found here [CONTRIBUTING.md](./CONTRIBUTING.md).
