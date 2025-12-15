import AppNavigator from "./src/navigation/AppNavigator";
import { TaskProvider } from "./src/context/TaskContext";
import { AuthProvider } from "./src/hooks/useAuth";
import { ErrorProvider } from "./src/context/ErrorContext";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <TaskProvider>
          <ErrorProvider>
            <AppNavigator />
          </ErrorProvider>
        </TaskProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
