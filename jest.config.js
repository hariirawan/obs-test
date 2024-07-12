/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
