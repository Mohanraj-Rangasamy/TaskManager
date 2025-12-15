
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from "../screens/Tasks";
import SignIn from '../screens/SignIn';
import { useAuth } from '../hooks/useAuth';
import SignOutScreen from '../screens/SignOut';
import ErrorsScreen from '../screens/ErrorsScreen';


const Tab = createBottomTabNavigator();

export default function Tabs() {
  const {user} = useAuth()
  return (
    <Tab.Navigator>
      {user ? (
      <>
        <Tab.Screen name="Tasks" component={Tasks} />

        {/* Admin-only tab */}
        {user.role === "ROLE_ADMIN" && (
          <Tab.Screen name="Errors" component={ErrorsScreen} />
        )}

        <Tab.Screen name="Sign Out" component={SignOutScreen} />
      </>
    ) : (
      <Tab.Screen name="Sign In" component={SignIn} />
    )}
    </Tab.Navigator>
  );
}
