module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
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
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/app/**/*.spec.ts'],
  coverageReporters: ['text'],
};
