import { View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import ReusableButton from "../components/Reusable_Button";

export default function SignOutScreen() {
  const { signOut } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <ReusableButton title="Sign Out" onPress={signOut} />
    </View>
  );
}
