import { View, Text, FlatList } from "react-native";
import { useErrors } from "../context/ErrorContext";
import { useAuth } from "../hooks/useAuth";

export default function ErrorsScreen({ navigation }) {
  const { errors } = useErrors();
  const { user } = useAuth();
  
  if (user?.role !== "ROLE_ADMIN") {
    navigation.replace("Tasks");
    return null;
  }

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Logged Errors
      </Text>

      {errors.length === 0 ? (
        <Text>No errors logged yet.</Text>
      ) : (
        <FlatList
          data={errors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.message}</Text>
              <Text style={{ color: "gray" }}>{item.time}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
