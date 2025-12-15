import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useErrors } from "../context/ErrorContext";

export default function SignIn() {
  const { signIn } = useAuth();
  const {logError} = useErrors()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    // FE validation
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }
    try {
      setError("");
      await signIn(username, password); // will call mock API
    } catch (e: any) {
      logError(e.message)
      setError(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
