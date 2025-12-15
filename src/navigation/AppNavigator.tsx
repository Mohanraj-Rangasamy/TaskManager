import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import type { RootStackParamList } from './types';
import EditTask from '../screens/EditScreen';
import ErrorsScreen from '../screens/ErrorsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Tabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen  name="EditTask" component={EditTask} />
        <Stack.Screen  name="ErrorScreen" component={ErrorsScreen} />
      </Stack.Navigator>
  );
}
