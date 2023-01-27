module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
