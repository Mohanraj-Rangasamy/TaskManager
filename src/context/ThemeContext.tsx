import { createContext, useContext, useState, ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "../theme/theme";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  
  const [isDark, setIsDark] = useState(false);

  
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}


export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }
  return ctx;
}
