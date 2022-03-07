// const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig');
module.exports = {
  preset: 'jest-preset-angular',
  roots: [
    '<rootDir>/src/app/shared/cards/challenge-card',
    '<rootDir>/src/app/pages/search/challenge-search',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@angular/(.*)$': '<rootDir>/node_modules/@angular/$1',
    '^@sage-bionetworks/sage-angular/(.*)$':
      '<rootDir>/sage-angular/dist/sage-angular/$1',
    '^@sage-bionetworks/rocc-client-angular/(.*)$':
      '<rootDir>/sage-angular/dist/sage-angular/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*|.*\\.mjs)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  moduleDirectories: ['node_modules'],
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
  // // coveragePathIgnorePatterns: ,
  // // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: ['src/**/*.spec.ts', '!**/node_modules/**'],
  // coverageReporters: ['text'],
};
