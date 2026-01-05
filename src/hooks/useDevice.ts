import { Platform } from "react-native";

export const useDevice = () => {
  return {
    isAndroid: Platform.OS === "android",
    isIOS: Platform.OS === "ios",
    isWeb: Platform.OS === "web",
    isDesktop: Platform.OS === "macos" || Platform.OS === "windows",
    platform: Platform.OS,
  };
};