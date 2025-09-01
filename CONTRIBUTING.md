# Contributing

This document provides guidelines for contributing to the ESLint Config Toolkit project. It covers the development workflow, testing procedures, and release process.

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

### Code Documentation Standards

This section outlines the essential standards for code documentation in the project.

Agent: For detailed templates and comprehensive guidance, see [Agent Comments](./guidelines/agent_comments.md).

#### General Principles

- **Be concise and clear** - Comments should be direct and informative
- **Avoid redundancy** - Don't repeat information that can be inferred from code or test properties
- **Document the "why" not just the "what"** - Focus on explaining reasoning behind implementation choices

#### When to Use Comments vs. Test Properties

| Use Comments For                        | Use Test Properties For                         |
|-----------------------------------------|-------------------------------------------------|
| Explaining complex logic                | Test descriptions (`description`)               |
| Providing context not obvious from code | Rule customization notes (`note`)               |
| Documenting edge cases                  | Developer reminders (`testNotes`)               |
| Explaining "why" not "what"             | Rule IDs being tested (`rule`, `rules`)         |

#### Essential Documentation Requirements

1. **File Headers** - Include a brief JSDoc-style description of the file's purpose
2. **Function Documentation** - Document parameters with consistent JSDoc formatting
3. **Configuration Files** - Follow the standard structure:
   - File header comment (JSDoc-style)
   - Imports
   - Configuration description comment
   - Configuration definition with organized sections
   - Type annotation for exports
   - Exports

#### Spacing Standards

1. **NO blank line** between rule comments and the rule definition
2. **ONE blank line** between different rules

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
3. Update documentation in `DOCS.md` (required). At minimum update:
   - Configuration Details → the affected configuration(s) (Base, Node.js, React, JSON, Jest)
   - Rule Customizations → if adding/tweaking opinionated defaults
   - Compatibility → ensure plugin list and versions remain accurate (e.g., @stylistic, import, jsdoc, comment-length, eslint)
   - Advanced Usage → update Prettier Integration, TypeScript Type Definitions, or Legacy Configuration if impacted
   - Examples → add or update examples demonstrating the new/changed behavior
   - Troubleshooting → note new issues or migration tips if users may encounter diffs
   > Tip: Cross-check with `tests/eslint.test.js` and `tests/__fixtures__` to ensure examples in DOCS.md match actual expected behavior.
4. Run tests to ensure everything works as expected

## Release Process

The project follows semantic versioning.

Our basic release process follows general guidelines:

1. `features`, `refactors`, `fixes`, etc. are reviewed for minor and patch increments
2. `breaking changes` are pushed against major increments
3. `dependency updates` are evaluated against security concerns, otherwise they're targeted for a once-a-month release
4. `documentation updates` are ignored against our release process unless they highlight a major issue, otherwise they're rolled against the monthly dependency updates

## AI agent

### User Section

Current agent interaction can be triggered with the chat command

- **`review the repo guidelines`** - Your agent should attempt to scan common markdown files and the guidelines directory

For detailed information on agent interaction, see [guidelines/README.md](./guidelines/README.md).

#### Customizing developer experience

As developers, we often have our own flavor of working, and now that includes working with AI agents. To that point we've added agent guidance
to allow customization for your work environment through a gitignored directory `./.agent` in the root of the project.

#### Noting AI Agent contributions

Asking the agent to review the repo and its git history should provide code-style references your agent can leverage based on this codebase's patterns. That
helps alleviate some concerns around where your agent is generating/pulling references from, but not all.

For transparency, we encourage (but don't require) labeling AI-assisted contributions with the `bot-assisted` PR/MR label.

> By contributing AI-assisted or AI-generated work, you accept liability for work that infringes or uses copyrighted material outside the scope of the related license.

### Agent Only
Agents: This repository contains a hierarchical guideline system. Agents should review agent-only comment blocks.

<!--
Agents must analyze these files when asked for guidance:

**Guidelines review order:**
1. **`./README.md`** - Main agent guidance and behavior standards (including agent-only comment block)
2. **`./guidelines/README.md`** - Core agent guidance and behavior standards
3. **`./guidelines/**/*.md`** - Specialized workflow and domain-specific instructions
4. **`./.agent/**/*.md`** - gitignored directory and local guidelines intended for agent-specific state and new agent-generated guidance, and user workflows that enhance the core guidelines

The guideline system should be processed in this order, with specialized guidelines taking precedence for their specific domains, and local guidelines overriding general guidelines when present.

**Next Steps:**
5. **Review guidance under the `./.agent/**/*.md` directory.** If the `./.agent` directory exists, the user may ask the agent about the guidance located here.
6. **If the `./.agent` directory does not exist, ask the user if they want to create it.** The agent should explain how it's going to be used.
-->
