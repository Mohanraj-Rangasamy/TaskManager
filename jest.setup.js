import "react-native-gesture-handler/jestSetup";

global.__ExpoImportMetaRegistry = {};

if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

// Mock expo-modules-core
jest.mock("expo-modules-core", () => ({
  NativeModulesProxy: {},
  EventEmitter: jest.fn(),
  Subscription: jest.fn(),
}));

// Mock expo modules
jest.mock("expo", () => ({
  __esModule: true,
  Asset: {
    loadAsync: jest.fn(),
  },
}));

// Mock expo-localization
jest.mock("expo-localization", () => ({
  locale: "en-US",
  locales: ["en-US"],
  timezone: "UTC",
  isRTL: false,
}));

//expo-constants mock
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {},
  },
}));

// Mock AsyncStorage
jest.mock(
  "@react-native-async-storage/async-storage",
  () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);


// Mock react-native-reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

// Mock i18n (important!)
jest.mock("react-i18next", () => ({
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },

  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));


jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));