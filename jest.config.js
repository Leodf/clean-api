module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverage: true,
  // collectCoverageFrom: ['!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
