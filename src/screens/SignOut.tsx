import { Button, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function SignOutScreen() {
  const { signOut } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
