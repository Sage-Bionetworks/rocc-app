module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*|.*\\.mjs)'],
};
