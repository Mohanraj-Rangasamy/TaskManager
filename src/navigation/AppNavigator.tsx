import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import type { RootStackParamList } from './types';
import EditTask from '../screens/EditScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Tabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen  name="EditTask" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
