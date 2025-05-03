const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@mui|@babel/runtime|@testing-library|your-other-dependencies)',
  ],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/*.(test|spec).{js,jsx,ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);
