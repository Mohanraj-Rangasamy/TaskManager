
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Tasks from "../screens/Tasks";


const Tab = createBottomTabNavigator();

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{label}</Text>
    </View>
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="SignInTab">
        {() => <PlaceholderScreen label="Sign In Screen" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
