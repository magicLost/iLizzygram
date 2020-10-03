module.exports = {
  //testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/node_modules/identity-obj-proxy",
    "^.+\\.module\\.(css|sass|scss)$":
      "<rootDir>/node_modules/identity-obj-proxy",
  },

  roots: ["<rootDir>/src"],

  //testMatch: ["<rootDir>/src/**/*.test.js"],
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],

  transform: {
    //"^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.[t|j]sx?$": `<rootDir>/jest-preprocess.js`,
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
    `node_modules/(?!(gatsby)/)`,
  ],
};
