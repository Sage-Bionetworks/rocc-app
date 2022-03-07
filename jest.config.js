module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: [
    // only test these two components for now
    '<rootDir>/src/app/shared/cards/challenge-card/*.spec.ts',
    '<rootDir>/src/app/pages/search/challenge-search/*.spec.ts',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@angular/(.*)$': '<rootDir>/node_modules/@angular/$1',
    '^@sage-bionetworks/sage-angular/(.*)$':
      '<rootDir>/sage-angular/dist/sage-angular/$1',
    '^@sage-bionetworks/rocc-client-angular/(.*)$':
      '<rootDir>/rocc-client-angular/dist/rocc-client-angular/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*|.*\\.mjs)'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
    // only test these two components for now
    '<rootDir>/src/app/shared/cards/challenge-card/*.ts',
    '<rootDir>/src/app/pages/search/challenge-search/*.ts',
  ],
};
