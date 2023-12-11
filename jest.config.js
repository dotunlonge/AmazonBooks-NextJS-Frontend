module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
   "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
 },
  moduleNameMapper: {
    // Handle module aliases (if you have them set in your tsconfig)
    "^@components/(.*)$": "<rootDir>/components/$1",
    "\\.(scss|css|sass)$": "identity-obj-proxy",

  },
};
