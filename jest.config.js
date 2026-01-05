module.exports = {
  preset: "jest-expo",

  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/jest.setup.js"
  ],

 transformIgnorePatterns: [
  "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|@expo|expo-modules-core|@react-native-picker/picker)"
  ],

  testMatch: [
    "**/__tests__/**/*.test.(ts|tsx)",
    "**/?(*.)+(spec|test).(ts|tsx)"
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};

