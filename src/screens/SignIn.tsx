import { useState } from "react";
import { View, Text, StyleSheet, Platform,  TouchableOpacity } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useErrors } from "../context/ErrorContext";
import { useTranslation } from "react-i18next";
import {i18n} from "../i18n";
import {ReusableButton,ReusableTextInput} from "@components";
import { useAppTheme } from "../context/ThemeContext";
import { useTheme } from "react-native-paper";
import { useDevice } from "../hooks";
import { AccessibilityRole } from "../types/task";


export default function SignIn() {
  const { isAndroid } = useDevice();
  const { isDark, toggleTheme } = useAppTheme();
  const { colors } = useTheme();

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text 
        accessible ={true}
        accessibilityRole={AccessibilityRole.TEXT} 
        accessibilityLabel="Sign In" 
        style={styles.title}
      >
        Sign In
      </Text>

      {error ? <Text 
        accessible = {true}
        accessibilityRole={AccessibilityRole.TEXT} 
        accessibilityLabel={error} 
        style={styles.error}
      >
        {error}
      </Text> : null}

      <ReusableTextInput
        placeholder={t("auth.username")}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <ReusableTextInput
        placeholder={t("auth.password")}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />

      {isAndroid ? 
      <ReusableButton title={t("common.login")} onPress={handleLogin} />
      : 
      <TouchableOpacity onPress={handleLogin}>
          <Text>{t("common.login")}</Text>
        </TouchableOpacity>
        }
      <Text>{'Please select your preferred language'}</Text>
      <View style={styles.langButton}>
        
        <ReusableButton
          title="தமிழ்"
          onPress={() => i18n.changeLanguage("ta")}
        />
      
        <ReusableButton
          title="English"
          onPress={() => i18n.changeLanguage("en")}
        />
      </View>
      <ReusableButton  title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      onPress={toggleTheme}
      />
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
