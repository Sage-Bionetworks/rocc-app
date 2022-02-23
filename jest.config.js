module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@angular/(.*)$': '<rootDir>/node_modules/@angular/$1',
    '^@sage-bionetworks/(.*)$': '<rootDir>/node_modules/@sage-bionetworks/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*|.*\\.mjs)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
};
// moduleNameMapper: {
//   '^lodash-es$': 'lodash'
// },
