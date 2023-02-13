module.exports = {
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
