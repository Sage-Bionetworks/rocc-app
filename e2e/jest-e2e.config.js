module.exports = {
  preset: 'jest-preset-angular',
  rootDir: '../',
  roots: ['<rootDir>/e2e/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ['**/*.spec.ts'],
  moduleDirectories: ['node_modules'],
};
