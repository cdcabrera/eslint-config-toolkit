export default {
  collectCoverageFrom: ['configs/**/*.js', '!configs/**/.*/**'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  transform: {},
  testEnvironment: 'node',
  testMatch: ['**/tests/*.test.js'],
  roots: ['configs', 'tests'],
  snapshotFormat: {
    printBasicPrototype: false
  },
  verbose: true
};
