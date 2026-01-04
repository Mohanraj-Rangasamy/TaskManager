import "./src/i18n";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { TaskProvider } from "./src/context/TaskContext";
import { AuthProvider } from "./src/hooks/useAuth";
import { ErrorProvider } from "./src/context/ErrorContext";
import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./src/i18n";
import { ThemeProvider } from "./src/context/ThemeContext"; 
import { SHOW_STORYBOOK } from './.rnstorybook/storybook.config';

const StorybookUI = SHOW_STORYBOOK ? require('./.rnstorybook').default : null;

export default function App() {


  useEffect(() => {
    AsyncStorage.getItem("lang").then((lng) => {
      if (lng) {
        i18n.changeLanguage(lng);
      }
    });
  }, []);

  if (SHOW_STORYBOOK && StorybookUI) {
    return <StorybookUI />;
  }

  return (
      <NavigationContainer>
        <ThemeProvider>
          <AuthProvider>
            <TaskProvider>
              <ErrorProvider>
                <AppNavigator />
              </ErrorProvider>
            </TaskProvider>
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
  );
}