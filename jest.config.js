module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverageFrom: [
  //   '<rootDir>/src/**',
  //   '!<rootDir>/src/main/**'
  // ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
