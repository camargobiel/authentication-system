/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  passWithNoTests: true,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/data/'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src/',
    '<rootDir>/test/'
  ]
}

export default config
