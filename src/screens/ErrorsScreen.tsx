import { View, Text, FlatList, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text 
        style={styles.errorText}
        accessible={true}
        accessibilityRole={'text'}
        accessibilityLabel="Logged Errors"
      >
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
              style={styles.listItem}>
              <Text 
                style={styles.listTextOne}
                accessible={true}
                accessibilityRole={'text'}
                accessibilityLabel={item.message}
                >
                  {item.message}
                </Text>
              <Text 
                style={styles.listTextTwo}
                accessible={true}
                accessibilityRole={'text'}
                accessibilityLabel={item.time}
              >
                {item.time}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles =  StyleSheet.create({
  container:{ 
    padding: 20, 
    flex: 1 
  },
  errorText:{ 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  listItem:{
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
listTextOne:{ 
  fontWeight: "bold" 
},
listTextTwo:{ 
  color: "gray" 
}
})