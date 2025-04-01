module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/src/**/*.test.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};