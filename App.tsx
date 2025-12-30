import "./src/i18n";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { TaskProvider } from "./src/context/TaskContext";
import { AuthProvider } from "./src/hooks/useAuth";
import { ErrorProvider } from "./src/context/ErrorContext";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./src/i18n";
import { ThemeProvider } from "./src/context/ThemeContext";
import { 
  BatchSize,
  DatadogProvider, 
  UploadFrequency
} from '@datadog/mobile-react-native';
import { DdSdkReactNative, DdSdkReactNativeConfiguration, SdkVerbosity } from 'expo-datadog';  

export default function App() {
  const navigationRef = useNavigationContainerRef();
const config = new DdSdkReactNativeConfiguration(
    "pub5ae31d2cff6d60e32e733e97d6243683",
    "dev",
    "6dbf326a-202f-4a83-b88a-b97f473fca38",
    true, // trackUserInteractions
    true, // trackResources
    true  // trackErrors
);

config.site = "US5";
config.longTaskThresholdMs = 100;
config.nativeCrashReportEnabled = true;
config.sessionSamplingRate = 100;
config.resourceTracingSamplingRate = 80;
config.verbosity = SdkVerbosity.WARN;

if (__DEV__) {
    config.uploadFrequency = UploadFrequency.FREQUENT;
    config.batchSize = BatchSize.SMALL;
    config.verbosity = SdkVerbosity.DEBUG;
}

 

  useEffect(() => {
  AsyncStorage.getItem("lang").then((lng) => {
    if (lng) {
      i18n.changeLanguage(lng);
    }
  });
  DdSdkReactNative.initialize(config)
}, []);

  return (
    <DatadogProvider configuration={config}
    ref={navigationRef}
    onReady={() => {
      DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
    }}
    >
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
    </DatadogProvider>
  );
}
