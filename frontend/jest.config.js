/* eslint-disable no-undef */
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^@mui/material$': '<rootDir>/node_modules/@mui/material/umd/material-ui.development.js',
    '^@mui/material(.*)$': '<rootDir>/node_modules/@mui/material/umd/material-ui.development.js',
    '^styled-components$': '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  coverageReporters: ["lcov", "text", "html"],
  collectCoverageFrom: ["src/components/**/*.tsx", "src/components/**/*.ts"],
  coverageDirectory: "<rootDir>/coverage",
  setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom'],
};
