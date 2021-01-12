module.exports = {
  //testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/node_modules/identity-obj-proxy",
    "^.+\\.module\\.(css|sass|scss)$":
      "<rootDir>/node_modules/identity-obj-proxy",
  },

  roots: ["<rootDir>/src", "<rootDir>/server"],

  testMatch: ["<rootDir>/src/**/*.test.js", "<rootDir>/server/**/*.test.js"],

  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    //"^.+\\.[t|j]sx?$": "ts-jest",
    //"^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
