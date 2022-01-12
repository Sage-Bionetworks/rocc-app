module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*|.*\\.mjs)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
};
