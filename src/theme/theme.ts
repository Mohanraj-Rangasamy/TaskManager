import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1976D2",
    secondary: "#03DAC6",
    error: "#B00020",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    inputBackground: "#ccc",
  },
  fonts: {
    ...MD3LightTheme.fonts,
    displayLarge: {
      fontFamily: "System",
      fontWeight: "700",
      fontSize: 32,
      lineHeight: 40,
    },
    titleMedium: {
      fontFamily: "System",
      fontWeight: "600",
      fontSize: 18,
    },
    bodyMedium: {
      fontFamily: "System",
      fontSize: 14,
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
};
