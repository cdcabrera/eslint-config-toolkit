# Contributing

For detailed documentation on using this toolkit, including configuration details and advanced usage examples, see [DOCS.md](./DOCS.md).

## Commits
We make use of [Conventional Commits](https://www.conventionalcommits.org) to provide a consistent history and generate [CHANGELOG.md](./CHANGELOG.md) updates.

Commit messaging must follow the format:
```
<type>([optional scope]): <description>
```
Where
- Type = the type of work the commit resolves.
  - Basic types include `feat` (feature), `fix`, `chore`, `build`.
  - See [conventional commit types](https://www.conventionalcommits.org/) for additional types.
- Scope = the area of code affected.
  - Can be a directory or filenames
  - Does not have to encompass all file names affected
  - Optional
- Description = what the commit work encompasses

Additional messaging rules include:
- No more than `65` characters for the commit message first line and excluding MR/PR number

### Messaging pull request failures
Creating a pull request activates the following checks through GitHub actions.
- Commit message linting, see [commit_lint.yml](./.github/workflows/commit_lint.yml)

## Development Workflow

### Build Requirements

To set up your work environment, you'll need to use:
- [NodeJS](https://nodejs.org/) version 20+
- NPM

### Getting Started

To start working on the project:
```bash
$ npm install
$ npm run test:dev
```

### Self-Linting

This project uses its own ESLint configurations to lint.

See the project's [eslint.config.js](./eslint.config.js):

```js
// eslint.config.js
import nodeConfig from './configs/node.js';

export default [
  // Use the Node.js configuration directly
  ...nodeConfig,
  
  // Project-specific overrides
  {
    rules: {
      // Project-specific rule customizations
    }
  }
];
```

To run the linting:

```bash
npm run test:lint
```

For continuous linting during development, you can use the watch mode:

```bash
npm run test:lint-watch
```

This will automatically run the linter whenever files in the `configs` directory, `tests` directory, or `index.js` are modified, providing immediate feedback.

### Testing
Jest is used for the unit test framework. The toolkit includes test files with intentional linting issues to verify that the configurations catch common problems:

- `tests/base.test.js`: Tests the base configuration
- `tests/node.test.js`: Tests the Node.js configuration
- `tests/react.test.jsx`: Tests the React configuration
- `tests/json.test.json`: Tests the JSON configuration
- `tests/jest.test.js`: Tests the Jest configuration

#### Running Tests

To run unit tests:
```bash
$ npm run test:jest
```

To run all tests:
```bash
$ npm test
```

To test specific configurations:
```bash
$ npm run test:configs
```

You can also test individual configurations:
```bash
npx eslint --config ./tests/eslint.config.js ./tests/base.test.js
npx eslint --config ./tests/eslint.config.js ./tests/node.test.js
npx eslint --config ./tests/eslint.config.js ./tests/react.test.jsx
npx eslint --config ./tests/eslint.config.js ./tests/json.test.json
npx eslint --config ./tests/eslint.config.js ./tests/jest.test.js
```

#### Using Jest Snapshots for Testing

The toolkit includes a Jest-based approach for testing ESLint configurations using snapshots.

The Jest snapshot test:

- Runs ESLint programmatically on each test file
- Captures detailed information about each linting issue (rule ID, severity, message, line, column)
- Uses Jest snapshots to compare the current results against stored snapshots
- Automatically detects changes in the ESLint output

To run the Jest snapshot tests:

```bash
npm run test:jest
```

Or with a watch:

```bash
npm run test:jest-watch
```

When the test files or configurations change intentionally, you can update the snapshots:

```bash
npm run test:jest-update
```

This approach provides several benefits:

1. **Detailed Comparison**: Captures and compares detailed information about each linting issue, not just counts
2. **Easy Updates**: Provides a clear way to update the expected results when changes are intentional
3. **Visual Diffs**: Shows exactly what changed when tests fail, making it easier to understand the impact of changes

The Jest snapshot tests are defined in the [tests/eslint.test.js](./tests/eslint.test.js) file, and the snapshots are stored in the [tests/__snapshots__](./tests/__snapshots__) directory.

### Code Coverage
The requirements for code coverage are currently set at the 50% mark and have no checks against changes in coverage.

In the future we may create rules around drops in coverage against the accepted threshold.

Settings for coverage can be found in [jest.config.js](./jest.config.js)

#### To check test coverage
```bash
$ npm test
```

#### Code coverage failing to update?

If you're having trouble getting an accurate code coverage report, or it's failing to provide updated results (i.e., you renamed files), you can try running:
```bash
$ npm run test:jest -- --clearCache
```

## Pull Requests

### Before Submitting a Pull Request
1. Make sure your code follows the style guidelines of the project
2. Run the tests to ensure your changes don't break existing functionality
3. Update documentation if necessary
4. Add tests for new functionality

### Pull Request Process
1. Fork the repository and create your branch from `main`
2. Make your changes and ensure tests pass
3. Update the README.md or DOCS.md with details of changes if applicable
4. Submit a pull request towards `dev`

## Adding New Rules or Configurations

When adding new rules or configurations:

1. Add the rule to the appropriate configuration file in the `configs` directory
2. Add tests for the new rule in the `tests/__fixtures__` directory and related files
3. Update the documentation in `DOCS.md`
4. Run tests to ensure everything works as expected

## Release Process

The project follows semantic versioning. 

Our basic release process follows general guidelines:

1. `features`, `refactors`, `fixes`, etc. are reviewed for minor and patch increments
2. `breaking changes` are pushed against major increments
3. `dependency updates` are evaluated against security concerns, otherwise they're targeted for a once-a-month release
4. `documentation updates` are ignored against our release process unless they highlight a major issue, otherwise they're rolled against the monthly dependency updates

