import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useErrors } from "../context/ErrorContext";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function SignIn() {

  const { t } = useTranslation();

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
        placeholder={t("auth.username")}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder={t("auth.password")}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title={t("common.login")} onPress={handleLogin} />

      <Text>{'Please select your preferred language'}</Text>
      <View style={styles.langButton}>
        
        <Button
          title="தமிழ்"
          onPress={() => i18n.changeLanguage("ta")}
        />
      
        <Button
          title="English"
          onPress={() => i18n.changeLanguage("en")}
        />
      </View>
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
  langButton:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:10
  }
});
