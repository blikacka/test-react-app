module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,jsx}',
    ],
    coverageDirectory: 'log',
    coverageReporters: ['lcov', 'text', 'cobertura'],
    testMatch: [
        '<rootDir>/tests/**/*.{js,jsx}',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/tests/reduxUtils.js',
        '<rootDir>/tests/mocks/reacti18nextMock.js',
    ],
    moduleNameMapper: {
        '@i18n()': '<rootDir>/tests/mocks/reacti18nextMock.js',
    },
    maxConcurrency: 1,
    transform: {
        '\\.(gql|graphql)$': 'jest-transform-graphql',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['jest-canvas-mock'],
}
